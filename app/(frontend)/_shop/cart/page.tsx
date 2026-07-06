import { Suspense } from "react"
import CartClient from "./CartClient"

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <CartClient />
    </Suspense>
  )
}
