// Route prefetching component for better navigation performance
// This should be added to your layout to prefetch routes before user clicks

"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PREFETCH_ROUTES = [
  '/',
  '/shop',
  '/about',
  '/services',
  '/team',
  '/faq',
  '/chat',
]

export function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Prefetch critical routes with a small delay to avoid blocking initial page load
    const timer = setTimeout(() => {
      try {
        PREFETCH_ROUTES.forEach((route) => {
          // Prefetch the route in the background
          if (router && typeof router.prefetch === 'function') {
            router.prefetch(route)
          }
        })
      } catch (error) {
        console.warn('Route prefetching failed:', error)
      }
    }, 2000) // Wait 2 seconds after page load to prefetch

    return () => clearTimeout(timer)
  }, [router])

  return null
}
