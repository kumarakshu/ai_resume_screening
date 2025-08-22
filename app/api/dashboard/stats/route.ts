import { type NextRequest, NextResponse } from "next/server"
import { createCustomSupabaseClient } from "@/lib/custom-auth"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createCustomSupabaseClient()

    // Get job descriptions count
    const { count: jobsCount } = await supabase.from("job_descriptions").select("*", { count: "exact", head: true })

    // Get resumes count
    const { count: resumesCount } = await supabase.from("resumes").select("*", { count: "exact", head: true })

    // Get screening results count and average score
    const { data: screenings, count: screeningsCount } = await supabase
      .from("screening_results")
      .select("overall_score", { count: "exact" })

    const avgScore =
      screenings && screenings.length > 0
        ? screenings.reduce((sum, s) => sum + s.overall_score, 0) / screenings.length
        : 0

    const stats = {
      totalJobs: jobsCount || 0,
      totalResumes: resumesCount || 0,
      totalScreenings: screeningsCount || 0,
      avgScore: Math.round(avgScore * 100) / 100,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error loading dashboard stats:", error)
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 })
  }
}
