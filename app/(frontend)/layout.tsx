import type React from "react"
import LoadingBarClient from "@/components/LoadingBarClient"

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LoadingBarClient />
      <main className="pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+4rem)] lg:pb-0">
        {children}
      </main>
    </>
  )
}