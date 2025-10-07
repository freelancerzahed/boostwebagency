"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MessageCircle,
  RefreshCw,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface OrderDetail {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "completed" | "failed"
  total: number
  subtotal: number
  tax: number
  items: {
    id: string
    name: string
    description: string
    image: string
    quantity: number
    price: number
    downloadLink?: string
  }[]
  customerEmail: string
  timeline: {
    status: string
    date: string
    description: string
  }[]
}

const mockOrder: OrderDetail = {
  id: "1",
  orderNumber: "ORD-2024-001",
  date: "2024-01-15",
  status: "completed",
  total: 299.99,
  subtotal: 274.99,
  tax: 25.0,
  customerEmail: "customer@example.com",
  items: [
    {
      id: "1",
      name: "Premium Web Design Package",
      description: "Complete website design with responsive layout and modern UI",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      price: 249.99,
      downloadLink: "/downloads/web-design-package",
    },
    {
      id: "2",
      name: "SEO Optimization Guide",
      description: "Comprehensive guide to improve your website's search rankings",
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      price: 25.0,
      downloadLink: "/downloads/seo-guide",
    },
  ],
  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15T10:00:00Z",
      description: "Your order has been placed successfully",
    },
    {
      status: "Processing Payment",
      date: "2024-01-15T10:02:00Z",
      description: "Processing your payment",
    },
    {
      status: "Payment Confirmed",
      date: "2024-01-15T10:05:00Z",
      description: "Payment received and confirmed",
    },
    {
      status: "Completed",
      date: "2024-01-15T10:06:00Z",
      description: "Digital products are ready for download",
    },
  ],
}

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pending" },
  processing: { color: "bg-blue-100 text-blue-800", icon: Package, label: "Processing" },
  completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Completed" },
  failed: { color: "bg-red-100 text-red-800", icon: AlertCircle, label: "Failed" },
}

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrder)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Package className="w-12 h-12 animate-pulse mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Order not found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
            <Link href="/account/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const StatusIcon = statusConfig[order.status].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 to-blue-600 text-white lg:hidden">
        <div className="flex items-center justify-between p-4 pb-6">
          <Link href="/account/orders" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/account/orders"
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{order.orderNumber}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Badge className={`${statusConfig[order.status].color} border-0 px-4 py-2`}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {statusConfig[order.status].label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="lg:max-w-7xl lg:mx-auto lg:px-6 lg:py-8">
        <div className="px-4 pb-20 lg:px-0 lg:pb-0 -mt-2 lg:mt-0">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <Card className="border-0 shadow-lg lg:hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                    <Badge className={`${statusConfig[order.status].color} border-0`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </CardHeader>
              </Card>

              {order.status === "completed" && (
                <Card className="border-0 shadow-lg bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100">
                          Your digital products are ready!
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Download links have been sent to {order.customerEmail}. You can also download them below.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Digital Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Avatar className="w-16 h-16 rounded-lg">
                        <AvatarImage src={item.image || "/placeholder.svg"} alt={item.name} />
                        <AvatarFallback className="rounded-lg bg-gray-200 dark:bg-gray-700">
                          <Package className="w-8 h-8 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">${item.price}</span>
                        </div>
                        {order.status === "completed" && item.downloadLink && (
                          <Button
                            size="sm"
                            className="mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">{event.status}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.date).toLocaleDateString()} at{" "}
                              {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">${order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium">${order.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FileText className="w-4 h-4" />
                      <span>Digital Delivery</span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{order.customerEmail}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Download links sent via email and available on this page
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  {order.status === "completed" && (
                    <Button className="w-full bg-transparent" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reorder Items
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
