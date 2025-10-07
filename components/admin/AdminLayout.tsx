"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Mail,
  ImageIcon,
  Bell,
  HelpCircle,
  Plus,
} from "lucide-react"
import AdminHeader from "./AdminHeader"
import QuickAddModal from "./QuickAddModal"
import type { User } from "@/lib/auth"
import Logo from "@/components/Logo"

interface AdminLayoutProps {
  children: React.ReactNode
  user: User
}

const navigationItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: null, mobileTab: true },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3, badge: "New" },
    ],
  },
  {
    title: "Content Management",
    items: [
      { name: "Products", href: "/admin/products", icon: Package, badge: null, mobileTab: true },
      { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, badge: "3" },
      { name: "Blog Posts", href: "/admin/blog", icon: FileText, badge: null },
      { name: "Media Library", href: "/admin/media", icon: ImageIcon, badge: null },
    ],
  },
  {
    title: "User Management",
    items: [
      { name: "Users", href: "/admin/users", icon: Users, badge: null },
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12", mobileTab: true },
      { name: "Subscribers", href: "/admin/subscribers", icon: Mail, badge: null },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings, badge: null, mobileTab: true },
      { name: "Notifications", href: "/admin/notifications", icon: Bell, badge: "5" },
      { name: "Help & Support", href: "/admin/help", icon: HelpCircle, badge: null },
    ],
  },
]

// Mobile tab items - main navigation for bottom bar
const mobileTabItems = navigationItems
  .flatMap((section) => section.items)
  .filter((item) => item.mobileTab)
  .slice(0, 4) // Limit to 4 main tabs

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const pathname = usePathname()

  const getBadgeVariant = (badge: string | null) => {
    if (!badge) return null
    if (badge === "New") return "default"
    if (Number.parseInt(badge) > 0) return "destructive"
    return "secondary"
  }

  const isActiveTab = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <AdminHeader user={user} onMenuToggle={() => setSidebarOpen(true)} />

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1">
        <aside className="w-64 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-900 shadow-lg flex flex-col h-screen sticky top-0">
          {/* Desktop Sidebar Header */}
          <div className="p-6 flex-shrink-0">
            <Logo className="w-10 h-10" showText={true} textClassName="text-lg text-white" />
            <p className="text-sm text-white/80 mt-1">Admin Dashboard</p>
          </div>

          {/* Desktop Navigation */}
          <ScrollArea className="flex-1 px-3 py-6">
            <nav className="space-y-6">
              {navigationItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const isActive =
                        pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                      return (
                        <li key={itemIndex}>
                          <Link href={item.href}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start px-4 py-3 h-12 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? "bg-white/20 text-white shadow-md backdrop-blur-sm hover:bg-white/30"
                                  : "text-white/90 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                              <span className="flex-1 text-left font-medium">{item.name}</span>
                              {item.badge && (
                                <Badge
                                  variant={getBadgeVariant(item.badge)}
                                  className={`ml-auto text-xs ${isActive ? "bg-white/30 text-white" : "bg-white/20 text-white"}`}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </Button>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Desktop Quick Add */}
          <div className="p-4 flex-shrink-0">
            <Button
              onClick={() => setQuickAddOpen(true)}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Quick Add
            </Button>
          </div>
        </aside>

        {/* Desktop Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 flex flex-col">
        {/* Mobile Main Content */}
        <main className="flex-1 p-4 pb-20 overflow-auto">{children}</main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl px-2 py-3 z-50 rounded-t-3xl">
          <div className="flex items-center justify-around">
            {mobileTabItems.map((item, index) => {
              const isActive = isActiveTab(item.href)
              return (
                <Link key={index} href={item.href} className="flex-1">
                  <Button
                    variant="ghost"
                    className={`w-full h-16 flex flex-col items-center justify-center space-y-1 rounded-2xl relative transition-all duration-200 ${
                      isActive
                        ? "text-pink-600 bg-pink-50 shadow-md"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <item.icon
                        className={`w-6 h-6 ${isActive ? "scale-110" : ""} transition-transform duration-200`}
                      />
                      {item.badge && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-3 w-5 h-5 p-0 text-xs flex items-center justify-center rounded-full shadow-md"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>

        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-80 p-0 shadow-2xl bg-gradient-to-br from-pink-600 via-purple-600 to-blue-900"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Sidebar Header */}
              <div className="p-6">
                <Logo className="w-12 h-12" showText={true} textClassName="text-xl text-white" />
                <p className="text-white/80 text-sm mt-2">Admin Dashboard</p>
              </div>

              {/* User Info */}
              <div className="p-4 bg-white/10 backdrop-blur-sm mx-3 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/70 truncate capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                  {navigationItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => {
                          const isActive =
                            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                          return (
                            <li key={itemIndex}>
                              <Link href={item.href} onClick={() => setSidebarOpen(false)}>
                                <Button
                                  variant="ghost"
                                  className={`w-full justify-start px-4 py-3 h-12 text-left rounded-xl transition-all duration-200 ${
                                    isActive
                                      ? "bg-white/20 text-white shadow-md backdrop-blur-sm"
                                      : "text-white/90 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                                  <span className="flex-1 font-medium">{item.name}</span>
                                  {item.badge && (
                                    <Badge
                                      variant={getBadgeVariant(item.badge)}
                                      className={`text-xs ${isActive ? "bg-white/30 text-white" : "bg-white/20 text-white"}`}
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </Button>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </ScrollArea>

              {/* Mobile Quick Actions */}
              <div className="p-4">
                <Button
                  onClick={() => {
                    setQuickAddOpen(true)
                    setSidebarOpen(false)
                  }}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Quick Add
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal open={quickAddOpen} onOpenChange={setQuickAddOpen} />
    </div>
  )
}
