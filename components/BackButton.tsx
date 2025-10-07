"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={() => router.back()}
      aria-label="Go back"
      className="mr-2 lg:mr-4" // Removed lg:hidden from here, will apply in Header.tsx
    >
      <ChevronLeft className="h-7 w-7" />
    </Button>
  )
}
