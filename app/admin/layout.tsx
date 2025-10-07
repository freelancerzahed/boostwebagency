import type React from "react"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout completely bypasses the main app layout
  // No headers, footers, or other main site components
  return <>{children}</>
}
