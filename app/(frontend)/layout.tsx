import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GoToTop from "@/components/GoToTop"
import MobileBottomNav from "@/components/MobileBottomNav"
import LoadingBarClient from "@/components/LoadingBarClient"

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LoadingBarClient />
      <Header />
      <main className="pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+4rem)] lg:pb-0">
        {children}
      </main>
      <Footer />
      <GoToTop />
      <MobileBottomNav />
    </>
  )
}