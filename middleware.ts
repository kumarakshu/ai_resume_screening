import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function createMiddlewareSupabaseClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

async function getCurrentUserInMiddleware(sessionToken: string) {
  if (!sessionToken) return null

  const supabase = createMiddlewareSupabaseClient()

  const { data: session, error } = await supabase
    .from("user_sessions")
    .select(`
      *,
      custom_users (*)
    `)
    .eq("session_token", sessionToken)
    .gt("expires_at", new Date().toISOString())
    .single()

  if (error || !session) {
    console.log("[v0] Session validation failed:", error?.message || "Session not found")
    return null
  }

  return session.custom_users
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get("session_token")?.value

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  let isAuthenticated = false
  if (sessionToken) {
    try {
      const user = await getCurrentUserInMiddleware(sessionToken)
      isAuthenticated = !!user
      console.log("[v0] Session validation result:", isAuthenticated ? "valid" : "invalid")
    } catch (error) {
      console.log("[v0] Session validation failed:", error)
      isAuthenticated = false
    }
  } else {
    console.log("[v0] No session token found")
  }

  if (isProtectedRoute && !isAuthenticated) {
    console.log("[v0] Redirecting to login - no valid session")
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ["/auth/login", "/auth/signup"]
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isAuthRoute && isAuthenticated) {
    console.log("[v0] Redirecting to dashboard - user already authenticated")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
