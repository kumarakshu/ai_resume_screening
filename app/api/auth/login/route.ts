import { type NextRequest, NextResponse } from "next/server"
import { signInUser } from "@/lib/custom-auth"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login API called")
    const { email, password } = await request.json()
    console.log("[v0] Login attempt for:", email)

    const { user, sessionToken } = await signInUser(email, password)
    console.log("[v0] Login successful for user:", user.id)

    const response = NextResponse.json({
      success: true,
      user,
      sessionToken,
    })

    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid email or password" },
      { status: 401 },
    )
  }
}
