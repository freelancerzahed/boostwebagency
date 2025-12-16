"use client"

import { useState, useEffect, memo, useCallback, useRef } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const GoToTop = memo(function GoToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const scrollListenerRef = useRef<((this: Window, ev: Event) => any) | null>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    // Use throttled scroll listener
    let ticking = false
    const throttledToggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    scrollListenerRef.current = throttledToggleVisibility as any
    window.addEventListener("scroll", throttledToggleVisibility, { passive: true })
    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current)
      }
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg md:bottom-4"
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
})

export default GoToTop
