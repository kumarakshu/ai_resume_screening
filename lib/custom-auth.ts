import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import crypto from "crypto"

function simpleHash(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + "salt123")
    .digest("hex")
}

function verifyPassword(password: string, hash: string): boolean {
  return simpleHash(password) === hash
}

export async function createCustomSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for direct DB access
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )
}

export async function signUpUser(email: string, password: string, fullName: string) {
  const supabase = await createCustomSupabaseClient()

  const passwordHash = simpleHash(password)

  const { data: user, error } = await supabase
    .from("custom_users")
    .insert({
      email,
      password_hash: passwordHash,
      full_name: fullName,
      role: "recruiter",
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return user
}

export async function signInUser(email: string, password: string) {
  const supabase = await createCustomSupabaseClient()

  const { data: user, error } = await supabase.from("custom_users").select("*").eq("email", email).single()

  if (error || !user) {
    throw new Error("Invalid email or password")
  }

  const isValidPassword = verifyPassword(password, user.password_hash)
  if (!isValidPassword) {
    throw new Error("Invalid email or password")
  }

  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

  const { error: sessionError } = await supabase.from("user_sessions").insert({
    user_id: user.id,
    session_token: sessionToken,
    expires_at: expiresAt.toISOString(),
  })

  if (sessionError) {
    console.error("[v0] Session creation error:", sessionError)
    throw new Error("Failed to create session")
  }

  return { user, sessionToken }
}

export async function getCurrentUser(sessionToken?: string) {
  if (!sessionToken) return null

  const supabase = await createCustomSupabaseClient()

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
    return null
  }

  return session.custom_users
}

export async function signOutUser(sessionToken: string) {
  const supabase = await createCustomSupabaseClient()

  await supabase.from("user_sessions").delete().eq("session_token", sessionToken)
}
