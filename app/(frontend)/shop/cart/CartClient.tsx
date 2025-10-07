"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"

export default function CartClient() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeFromCart, clearCart, getTotal, getItemCount } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center">
            <Link href="/shop">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full mr-3">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h1>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-sm">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <Link href="/shop">
            <Button className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-8 py-3 rounded-2xl">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/shop">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full mr-3">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Shopping Cart ({getItemCount()} {getItemCount() === 1 ? "item" : "items"})
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600">
            Clear All
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex gap-4">
                  <Link href={`/shop/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg?height=120&width=120"}
                      alt={item.name}
                      className="w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-xl"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/product/${item.id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">${item.price}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 p-0 rounded-xl"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 p-0 rounded-xl"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 p-0 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            {/* Recommended Products - Desktop Only */}
            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">You might also like</h2>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl mb-3"></div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">Product {i}</h4>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">$29.99</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({getItemCount()} items)</span>
                  <span className="font-semibold">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-semibold">${(getTotal() * 0.08).toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${(getTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/shop/checkout">
                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-600 text-white font-semibold text-lg mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Continue Shopping */}
              <Link href="/shop">
                <Button variant="outline" className="w-full h-12 rounded-2xl bg-transparent">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <span>Instant digital delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products - Mobile Only */}
        <div className="lg:hidden mt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">You might also like</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 bg-white dark:bg-gray-800 rounded-2xl p-3 border border-gray-100 dark:border-gray-700"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl mb-2"></div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">Product {i}</h4>
                <p className="text-sm font-bold text-gray-900 dark:text-white">$29.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
