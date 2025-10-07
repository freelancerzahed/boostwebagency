import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProductById } from "@/services/productService"
import ProductDetailClient from "./ProductDetailClient"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  )
}
