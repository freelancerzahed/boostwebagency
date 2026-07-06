"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Shield, Wallet, Bitcoin, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"

export default function CheckoutClient() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { items, getTotal, getItemCount, clearCart } = useCart()

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const [bkashInfo, setBkashInfo] = useState({
    phoneNumber: "",
  })

  const [binanceInfo, setBinanceInfo] = useState({
    email: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/shop")
    }
  }, [mounted, items.length, router])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      toast.success("Order placed successfully! Check your email for download links.")
      router.push("/account/orders")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  const tax = getTotal() * 0.08
  const finalTotal = getTotal() + tax

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="w-10 h-10 p-0 rounded-full mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout</h1>
        </div>
      </div>

      <form onSubmit={handleCheckout}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Order Items (Desktop: 4 cols, Mobile: full width) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Your Order ({getItemCount()} items)
                </h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Qty: {item.quantity}</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Digital Product Notice */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2 items-start">
                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Digital products will be delivered instantly to your email after payment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Customer & Payment Info (Desktop: 5 cols, Mobile: full width) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Customer Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Information</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">For order confirmation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-300">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                        className="mt-1 h-11 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm text-gray-700 dark:text-gray-300">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                        className="mt-1 h-11 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="mt-1 h-11 rounded-xl"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="mt-1 h-11 rounded-xl"
                      placeholder="+880 1XXX-XXXXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose how to pay</p>
                  </div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                        <div className="flex gap-1">
                          <div className="w-7 h-5 bg-blue-600 rounded text-white text-[10px] flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div className="w-7 h-5 bg-red-600 rounded text-white text-[10px] flex items-center justify-center font-bold">
                            MC
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-pink-500 dark:hover:border-pink-500 transition-colors">
                    <RadioGroupItem value="bkash" id="bkash" />
                    <Label htmlFor="bkash" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-pink-600" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">bKash</span>
                        </div>
                        <div className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                          <span className="text-[10px] font-semibold text-pink-600 dark:text-pink-400">Popular</span>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors">
                    <RadioGroupItem value="binance" id="binance" />
                    <Label htmlFor="binance" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bitcoin className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Binance Pay</span>
                        </div>
                        <div className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                          <span className="text-[10px] font-semibold text-yellow-600 dark:text-yellow-400">Crypto</span>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Card Details</h3>
                    <div>
                      <Label htmlFor="cardName" className="text-xs text-gray-700 dark:text-gray-300">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardName"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        className="mt-1 h-10 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber" className="text-xs text-gray-700 dark:text-gray-300">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="mt-1 h-10 rounded-xl"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry" className="text-xs text-gray-700 dark:text-gray-300">
                          Expiry
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="mt-1 h-10 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-xs text-gray-700 dark:text-gray-300">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="mt-1 h-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "bkash" && (
                  <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/10 rounded-xl space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">bKash Payment</h3>
                    <div>
                      <Label htmlFor="bkashPhone" className="text-xs text-gray-700 dark:text-gray-300">
                        bKash Account Number
                      </Label>
                      <Input
                        id="bkashPhone"
                        type="tel"
                        placeholder="01XXX-XXXXXX"
                        value={bkashInfo.phoneNumber}
                        onChange={(e) => setBkashInfo({ ...bkashInfo, phoneNumber: e.target.value })}
                        className="mt-1 h-10 rounded-xl"
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        You'll receive a payment request on your bKash app
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "binance" && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Binance Pay</h3>
                    <div>
                      <Label htmlFor="binanceEmail" className="text-xs text-gray-700 dark:text-gray-300">
                        Binance Account Email
                      </Label>
                      <Input
                        id="binanceEmail"
                        type="email"
                        placeholder="your@binance.email"
                        value={binanceInfo.email}
                        onChange={(e) => setBinanceInfo({ ...binanceInfo, email: e.target.value })}
                        className="mt-1 h-10 rounded-xl"
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        You'll be redirected to Binance Pay to complete payment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary (Desktop: 3 cols, Mobile: full width, Sticky on Desktop) */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold">${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-600 text-white font-semibold mb-4"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instant delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-4 h-4 text-green-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
