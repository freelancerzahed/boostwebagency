export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  originalPrice: number | null
  category: string
  rating: number
  reviews: number
  featured: boolean
  tags: string[]
  features?: string[]
  specifications?: Record<string, string>
  gallery?: string[]
}
