import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signOutUser } from "@/lib/custom-auth"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session_token")?.value

    if (sessionToken) {
      // Clear session from database
      await signOutUser(sessionToken)
    }

    // Create response and clear the session cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
