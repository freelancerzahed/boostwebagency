import type React from "react"
import { requireAuth } from "@/lib/auth"
import AdminLayout from "@/components/admin/AdminLayout"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminLayout user={user}>{children}</AdminLayout>
    </ThemeProvider>
  )
}
