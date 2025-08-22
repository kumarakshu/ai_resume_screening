import { type NextRequest, NextResponse } from "next/server"
import { signUpUser, signInUser } from "@/lib/custom-auth"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Signup API called")
    const { email, password, fullName } = await request.json()
    console.log("[v0] Signup data received:", { email, fullName })

    // Create user
    const user = await signUpUser(email, password, fullName)
    console.log("[v0] User created successfully:", user.id)

    // Automatically sign in the user
    const { sessionToken } = await signInUser(email, password)
    console.log("[v0] User signed in, session created")

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
    if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
      console.log("[v0] Signup attempt with existing email:", error.message)
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in instead.",
          code: "EMAIL_EXISTS",
        },
        { status: 409 },
      )
    }

    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Signup failed" }, { status: 400 })
  }
}
