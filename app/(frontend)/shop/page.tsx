import { Suspense } from "react"
import dynamic from "next/dynamic"

const ShopClient = dynamic(() => import("./ShopClient"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>
  ),
})

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  )
}
