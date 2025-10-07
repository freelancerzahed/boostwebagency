"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/useWishlist"

export default function WishlistIcon() {
  const { items } = useWishlist()
  const itemCount = items.length

  return (
    <Link href="/shop/wishlist">
      <Button
        variant="ghost"
        size="sm"
        className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <Heart className="w-4 h-4" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
        <span className="sr-only">Wishlist with {itemCount} items</span>
      </Button>
    </Link>
  )
}
