import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, createCustomSupabaseClient } from "@/lib/custom-auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createCustomSupabaseClient()
    const { data, error } = await supabase
      .from("job_descriptions")
      .select("*")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jobs:", error)
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
    }

    return NextResponse.json({ jobs: data })
  } catch (error) {
    console.error("Error in jobs GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, required_skills, keywords, skill_weights } = body

    const supabase = await createCustomSupabaseClient()
    const { data, error } = await supabase
      .from("job_descriptions")
      .insert({
        title,
        description,
        required_skills,
        keywords,
        skill_weights,
        created_by: user.id,
      })
      .select()

    if (error) {
      console.error("Error creating job:", error)
      return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error in jobs POST:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
