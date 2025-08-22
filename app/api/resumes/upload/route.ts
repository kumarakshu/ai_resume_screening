import { type NextRequest, NextResponse } from "next/server"
import { createCustomSupabaseClient, getCurrentUser } from "@/lib/custom-auth"
import { parseResumeText, scoreResume } from "@/lib/resume-parser"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createCustomSupabaseClient()
    const formData = await request.formData()

    const file = formData.get("file") as File
    const candidateName = formData.get("candidateName") as string
    const candidateEmail = formData.get("candidateEmail") as string
    const jobId = formData.get("jobId") as string

    if (!file || !candidateName || !jobId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `resumes/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage.from("resume-files").upload(filePath, file)

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("resume-files").getPublicUrl(filePath)

    // Extract text from file
    let text = ""
    if (file.type === "text/plain") {
      text = await file.text()
    } else if (file.type === "application/pdf") {
      text = `PDF file: ${file.name} - Content extraction would require pdf-parse library`
    } else if (file.type.includes("word") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      text = `Word document: ${file.name} - Content extraction would require mammoth.js library`
    } else {
      try {
        text = await file.text()
      } catch {
        text = `File: ${file.name} - Unable to extract text content`
      }
    }

    // Parse resume
    const parsedResume = parseResumeText(text)

    // Insert resume
    const { data: resumeData, error: resumeError } = await supabase
      .from("resumes")
      .insert({
        candidate_name: candidateName,
        candidate_email: candidateEmail,
        file_name: file.name,
        file_url: publicUrl,
        extracted_text: parsedResume.text,
        extracted_skills: parsedResume.skills,
        uploaded_by: user.id,
      })
      .select()
      .single()

    if (resumeError) {
      console.error("Resume insert error:", resumeError)
      return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
    }

    // Get job details for scoring
    const { data: jobData } = await supabase.from("job_descriptions").select("*").eq("id", jobId).single()

    if (jobData) {
      // Score the resume
      const scoringResult = scoreResume(
        parsedResume.skills,
        parsedResume.text,
        jobData.required_skills,
        jobData.keywords,
        jobData.skill_weights,
      )

      // Insert screening result
      await supabase.from("screening_results").insert({
        resume_id: resumeData.id,
        job_description_id: jobId,
        overall_score: scoringResult.overallScore,
        skill_matches: scoringResult.skillMatches,
        keyword_matches: scoringResult.keywordMatches,
        match_details: scoringResult.matchDetails,
        screened_by: user.id,
      })
    }

    return NextResponse.json({ success: true, resume: resumeData })
  } catch (error) {
    console.error("Error in resume upload API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
