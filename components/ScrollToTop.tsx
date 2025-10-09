"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Instant scroll to top without animation for better performance
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}