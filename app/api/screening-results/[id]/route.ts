import { type NextRequest, NextResponse } from "next/server"
import { createCustomSupabaseClient } from "@/lib/custom-auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createCustomSupabaseClient()
    const updates = await request.json()

    const { error } = await supabase.from("screening_results").update(updates).eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating screening result:", error)
    return NextResponse.json({ error: "Failed to update screening result" }, { status: 500 })
  }
}
