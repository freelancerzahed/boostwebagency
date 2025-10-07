import type React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoadingBar from "@/components/LoadingBar"
import GoToTop from "@/components/GoToTop"
import MobileBottomNav from "@/components/MobileBottomNav"
// Removed import for TopBar

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LoadingBar />
      {/* Removed TopBar component */}
      <Header />
      {/* Adjusted padding-top to account for fixed Header (h-16 = 64px) */}
      {/* Added padding-bottom to main to account for fixed MobileBottomNav (h-16 = 4rem) */}
      <main className="pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+4rem)] lg:pb-0">
        {children}
      </main>
      <Footer />
      <GoToTop />
      <MobileBottomNav />
    </>
  )
}
