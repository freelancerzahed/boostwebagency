"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  MessageSquare,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
} from "lucide-react"
import QuickAddModal from "@/components/admin/QuickAddModal"
import Link from "next/link"

export default function AdminDashboard() {
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-indigo-500",
      href: "/admin/users",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-teal-500",
      href: "/admin/orders",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-purple-500 to-pink-500",
      href: "/admin/analytics",
    },
    {
      title: "Growth Rate",
      value: "23.4%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-500",
      href: "/admin/analytics",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "New order #1234 received",
      time: "2 minutes ago",
      status: "success",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      id: 2,
      type: "user",
      message: "New user registration: john@example.com",
      time: "5 minutes ago",
      status: "info",
      icon: Users,
      href: "/admin/users",
    },
    {
      id: 3,
      type: "product",
      message: "Product 'Wireless Headphones' updated",
      time: "10 minutes ago",
      status: "warning",
      icon: Package,
      href: "/admin/products",
    },
    {
      id: 4,
      type: "review",
      message: "New testimonial submitted",
      time: "15 minutes ago",
      status: "success",
      icon: MessageSquare,
      href: "/admin/testimonials",
    },
  ]

  const systemStatus = [
    { name: "API Server", status: "operational", uptime: "99.9%", color: "green" },
    { name: "Database", status: "operational", uptime: "99.8%", color: "green" },
    { name: "CDN", status: "operational", uptime: "100%", color: "green" },
    { name: "Email Service", status: "maintenance", uptime: "98.5%", color: "yellow" },
  ]

  const quickActions = [
    { name: "Add Product", icon: Package, href: "/admin/products", gradient: "from-blue-500 to-indigo-500" },
    { name: "New User", icon: Users, href: "/admin/users", gradient: "from-emerald-500 to-teal-500" },
    { name: "View Orders", icon: ShoppingCart, href: "/admin/orders", gradient: "from-purple-500 to-pink-500" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics", gradient: "from-amber-500 to-orange-500" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    }
  }

  const getSystemStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Operational</Badge>
        )
      case "maintenance":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Maintenance</Badge>
      case "down":
        return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-0">Down</Badge>
      default:
        return <Badge className="border-0">{status}</Badge>
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-pink-50 text-sm md:text-base">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button onClick={() => setQuickAddOpen(true)} className="bg-white text-pink-600 hover:bg-pink-50 shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Link key={index} href={stat.href}>
              <div
                className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
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
            </Link>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Link key={index} href={action.href}>
                <div
                  className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <IconComponent className="h-8 w-8 text-white" />
                    <span className="text-sm font-semibold text-white">{action.name}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Performance Metrics</h2>
            <p className="text-sm text-gray-600">Key performance indicators</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Conversion Rate</span>
                <span className="font-bold text-gray-900">3.2%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Customer Satisfaction</span>
                <span className="font-bold text-gray-900">4.8/5</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Order Fulfillment</span>
                <span className="font-bold text-gray-900">98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Return Rate</span>
                <span className="font-bold text-gray-900">2.1%</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Activity</h2>
            <p className="text-sm text-gray-600">Latest system activities and updates</p>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <Link key={activity.id} href={activity.href}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">System Status</h2>
          <p className="text-sm text-gray-600">Current status of all system components</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemStatus.map((system, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{system.name}</p>
                  <p className="text-xs text-gray-500">Uptime: {system.uptime}</p>
                </div>
              </div>
              {getSystemStatusBadge(system.status)}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Comprehensive analytics with charts and detailed metrics.
          </p>
          <Link href="/admin/analytics">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      <QuickAddModal open={quickAddOpen} onOpenChange={setQuickAddOpen} />
    </div>
  )
}
