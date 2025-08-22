import { type NextRequest, NextResponse } from "next/server"
import { createCustomSupabaseClient } from "@/lib/custom-auth"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createCustomSupabaseClient()

    const { data, error } = await supabase
      .from("screening_results")
      .select(`
        *,
        resumes (
          candidate_name,
          candidate_email,
          file_name,
          extracted_skills
        ),
        job_descriptions (
          title,
          required_skills
        )
      `)
      .order("overall_score", { ascending: false })

    if (error) throw error

    return NextResponse.json({ results: data })
  } catch (error) {
    console.error("Error fetching screening results:", error)
    return NextResponse.json({ error: "Failed to fetch screening results" }, { status: 500 })
  }
}
