"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  DollarSign,
  Calendar,
  Package,
  Truck,
} from "lucide-react"

const demoOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "Delivered",
    items: 3,
    date: "2024-01-06",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.5,
    status: "Processing",
    items: 2,
    date: "2024-01-05",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 89.99,
    status: "Shipped",
    items: 1,
    date: "2024-01-04",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 199.99,
    status: "Pending",
    items: 4,
    date: "2024-01-03",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    total: 349.99,
    status: "Cancelled",
    items: 2,
    date: "2024-01-02",
    paymentMethod: "Credit Card",
  },
]

export default function OrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(demoOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof demoOrders)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const stats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      change: "+12%",
      icon: ShoppingCart,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Total Revenue",
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      change: "+18%",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Pending Orders",
      value: orders.filter((o) => o.status === "Pending").length.toString(),
      change: "+3",
      icon: Calendar,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length.toString(),
      change: "+8%",
      icon: Package,
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Delivered</Badge>
      case "shipped":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">Shipped</Badge>
      case "processing":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Processing</Badge>
      case "pending":
        return <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-0">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-0">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-0">{status}</Badge>
    }
  }

  const openViewDialog = (order: (typeof demoOrders)[0]) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleDeleteOrder = async (id: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setOrders(orders.filter((order) => order.id !== id))
    setIsLoading(false)
    toast({
      title: "Success",
      description: "Order deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Orders</h1>
            <p className="text-blue-50 text-sm md:text-base">Manage customer orders and track deliveries</p>
          </div>
          <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-white/90" />
                  <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/90 font-medium">{stat.title}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{order.id}</h3>
                  <p className="text-sm text-gray-500 mb-2">{order.customer}</p>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">{order.email}</Badge>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Items:</span>
                  <span className="font-semibold text-gray-900">{order.items} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment:</span>
                  <span className="text-sm text-gray-700">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end gap-3">
                {getStatusBadge(order.status)}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openViewDialog(order)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => handleDeleteOrder(order.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View complete order information</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedOrder.id}</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.customer}</p>
                  <Badge className="mt-2 bg-gray-100 text-gray-700 border-0">{selectedOrder.email}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Items:</span>
                  <span className="text-sm text-gray-700">{selectedOrder.items} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Payment Method:</span>
                  <span className="text-sm text-gray-700">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-lg font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm text-gray-700">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Truck className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
