import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getCurrentUser } from "@/lib/custom-auth"
import DashboardContent from "@/components/dashboard-content"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  const user = await getCurrentUser(sessionToken)

  if (!user) {
    redirect("/auth/login")
  }

  return <DashboardContent user={user} profile={null} />
}
