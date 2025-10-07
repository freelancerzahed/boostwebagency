import { Suspense } from "react"
import TeamClientPage from "./TeamClientPage"

export default function TeamPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamClientPage />
    </Suspense>
  )
}
