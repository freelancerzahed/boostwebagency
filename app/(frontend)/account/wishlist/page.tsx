"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Trash2, ArrowLeft, Share2, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  inStock: boolean
  category: string
  addedAt: string
  description: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Premium Web Design Package",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=200&width=200&text=Web+Design",
      inStock: true,
      category: "Web Design",
      addedAt: "2024-01-20",
      description: "Complete web design package with responsive design and modern UI/UX",
    },
    {
      id: "2",
      name: "SEO Optimization Service",
      price: 149.99,
      image: "/placeholder.svg?height=200&width=200&text=SEO+Service",
      inStock: true,
      category: "SEO",
      addedAt: "2024-01-18",
      description: "Comprehensive SEO optimization to boost your website's search rankings",
    },
    {
      id: "3",
      name: "E-commerce Development",
      price: 599.99,
      originalPrice: 799.99,
      image: "/placeholder.svg?height=200&width=200&text=E-commerce",
      inStock: false,
      category: "Development",
      addedAt: "2024-01-15",
      description: "Full e-commerce website development with payment integration",
    },
    {
      id: "4",
      name: "Brand Identity Package",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=200&text=Branding",
      inStock: true,
      category: "Branding",
      addedAt: "2024-01-12",
      description: "Complete brand identity design including logo, colors, and guidelines",
    },
  ])

  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // Add to cart logic here
  }

  const shareWishlist = () => {
    // Share wishlist logic here
    navigator.clipboard.writeText(window.location.href)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const previewItem = (item: WishlistItem) => {
    setSelectedItem(item)
    setIsPreviewOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlistItems.reduce(
    (sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0),
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-gradient-to-r from-pink-500 to-blue-600 text-white p-4 backdrop-blur-lg bg-opacity-90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/account">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 fill-current" />
              <h1 className="text-lg font-semibold">My Wishlist</h1>
              <Badge className="bg-white/20 text-white border-white/30">{wishlistItems.length}</Badge>
            </div>
          </div>
          {wishlistItems.length > 0 && (
            <Button variant="ghost" size="sm" onClick={shareWishlist} className="text-white hover:bg-white/20 p-2">
              <Share2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="container mx-auto p-4 lg:p-6 pt-6 lg:pt-6 relative z-10">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/account">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="p-3 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl shadow-lg">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
          {wishlistItems.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={shareWishlist}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Wishlist
              </Button>
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Wishlist Stats */}
        {wishlistItems.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {wishlistItems.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Items</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ${totalValue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Value</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-600">${totalSavings.toFixed(2)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Potential Savings</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {wishlistItems.filter((item) => item.inStock).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Stock</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mobile Action Buttons */}
        {wishlistItems.length > 0 && (
          <div className="lg:hidden flex gap-2 mb-6">
            <Button
              onClick={clearWishlist}
              variant="outline"
              size="sm"
              className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-900/50 text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gradient-to-br from-pink-500/10 to-blue-600/10 rounded-full mb-4">
                <Heart className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Save items you love to your wishlist and come back to them later.
              </p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white shadow-lg shadow-pink-500/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {item.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white border-0 shadow-lg">
                        Save ${(item.originalPrice - item.price).toFixed(2)}
                      </Badge>
                    )}
                    {!item.inStock && (
                      <Badge className="absolute top-3 right-3 bg-gray-500 text-white">Out of Stock</Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-2 pb-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => previewItem(item)}
                        className="bg-white/90 hover:bg-white backdrop-blur-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-white/90 hover:bg-white backdrop-blur-sm text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 text-gray-700 dark:text-gray-300 border-0"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Added {formatDate(item.addedAt)}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white shadow-lg shadow-pink-500/20 transition-all"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Item Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Item Preview
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Image
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 text-gray-700 dark:text-gray-300 border-0"
                      >
                        {selectedItem.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedItem.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{selectedItem.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                        ${selectedItem.price.toFixed(2)}
                      </span>
                      {selectedItem.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${selectedItem.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${selectedItem.inStock ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedItem.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Added to wishlist on {formatDate(selectedItem.addedAt)}</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => addToCart(selectedItem)}
                    disabled={!selectedItem.inStock}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white shadow-lg shadow-pink-500/20"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      removeFromWishlist(selectedItem.id)
                      setIsPreviewOpen(false)
                    }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
