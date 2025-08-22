import { type NextRequest, NextResponse } from "next/server"
import { createCustomSupabaseClient } from "@/lib/custom-auth"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createCustomSupabaseClient()

    const { data: resumes, error } = await supabase
      .from("resumes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching resumes:", error)
      return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 })
    }

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error("Error in resumes API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
