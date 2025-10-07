import type { Review } from "@/types/review"

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  try {
    const res = await fetch("/public/data/reviews.json")
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: Review[] = await res.json()
    return data.filter((review) => review.productId === productId)
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error)
    throw error
  }
}
