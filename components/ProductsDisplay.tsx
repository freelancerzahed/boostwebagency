"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Grid2x2,
  List,
  Heart,
  ShoppingCart,
  Star,
  Search,
  Filter,
  X,
} from "lucide-react"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductsDisplayProps {
  products?: Product[]
  viewMode: "grid" | "list"
  setViewMode: (m: "grid" | "list") => void
  sortBy: string
  setSortBy: (v: string) => void
  selectedCategory: string
  setSelectedCategory: (id: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  showFilters: boolean
  setShowFilters: (b: boolean) => void
  handleAddToCart: (p: Product) => void
  handleWishlistToggle: (p: Product) => void
  isInWishlist: (id: string) => boolean
}

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price: low → high" },
  { id: "price-high", label: "Price: high → low" },
  { id: "rating", label: "Rating" },
  { id: "newest", label: "Newest" },
]

const categories = [
  { id: "all", name: "All Products" },
  { id: "web-templates", name: "Web Templates" },
  { id: "mobile-apps", name: "Mobile Apps" },
  { id: "graphics", name: "Graphics" },
  { id: "plugins", name: "Plugins" },
  { id: "courses", name: "Courses" },
]

export default function ProductsDisplay({
  products,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  handleAddToCart,
  handleWishlistToggle,
  isInWishlist,
}: ProductsDisplayProps) {
  return (
    <section>
      {/* Top controls: Search, Sort, View Mode */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Sort + View + Mobile Filter Toggle */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`p-2 rounded-lg border ${
              viewMode === "grid"
                ? "border-pink-500 text-pink-500"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <Grid2x2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`p-2 rounded-lg border ${
              viewMode === "list"
                ? "border-pink-500 text-pink-500"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          {/* Mobile filter toggle */}
          <button
            className="md:hidden p-2 rounded-lg border border-gray-300 text-gray-600"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filtering Menu (Desktop) */}
      <div className="hidden md:flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategory === category.id
                ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product grid / list */}
      {!products || products.length === 0 ? (
        <div className="text-center text-gray-600 py-10">
          No products found matching your criteria.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isList={false}
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
              isInWishlist={isInWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isList
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
              isInWishlist={isInWishlist}
            />
          ))}
        </div>
      )}

      {/* Mobile filter sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-10/12 max-w-sm p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Category filter in mobile sheet */}
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        selectedCategory === cat.id
                          ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white font-semibold py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

/* --- small card component --- */
interface CardProps {
  product: Product
  isList: boolean
  handleAddToCart: (p: Product) => void
  handleWishlistToggle: (p: Product) => void
  isInWishlist: (id: string) => boolean
}

function ProductCard({
  product,
  isList,
  handleAddToCart,
  handleWishlistToggle,
  isInWishlist,
}: CardProps) {
  return (
    <article
      className={`relative rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      {/* Wishlist button */}
      <button
        onClick={() => handleWishlistToggle(product)}
        className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur rounded-full shadow"
      >
        <Heart
          className={`w-5 h-5 ${
            isInWishlist(product.id)
              ? "text-pink-600 fill-pink-600"
              : "text-gray-500"
          }`}
        />
      </button>

      {/* Image */}
      <Link
        href={`/shop/product/${product.id}`}
        className={
          isList
            ? "relative w-full sm:w-40 shrink-0 aspect-video sm:aspect-square"
            : "relative w-full aspect-[4/3]"
        }
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105 duration-300"
          sizes={
            isList
              ? "(max-width: 640px) 100vw, 160px"
              : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          }
        />
      </Link>

      {/* Details */}
      <div
        className={`p-4 ${isList ? "flex-1 flex flex-col justify-between" : ""}`}
      >
        <div>
          <Link
            href={`/shop/product/${product.id}`}
            className="font-semibold text-gray-900 hover:text-pink-600"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => handleAddToCart(product)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-blue-600 text-white text-sm font-medium hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}
