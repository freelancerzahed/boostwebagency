"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Search, Bell, Settings, User, LogOut, Plus, X } from "lucide-react"
import QuickAddModal from "./QuickAddModal"
import ThemeToggle from "@/components/ThemeToggle"
import type { User as UserType } from "@/lib/auth"
import Logo from "@/components/Logo"

interface AdminHeaderProps {
  user: UserType
  onMenuToggle: () => void
}

export default function AdminHeader({ user, onMenuToggle }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-001 from John Doe",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Wireless Headphones - 5 items left",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "New User Registration",
      message: "Jane Smith joined the platform",
      time: "3h ago",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        window.location.href = "/admin/login"
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      window.location.href = "/admin/login"
    }
  }

  const markAllNotificationsRead = () => {
    setNotificationsRead(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm dark:bg-gray-900/95 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden h-9 w-9 p-0 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden lg:flex items-center">
              <Logo className="w-8 h-8" showText={true} textClassName="text-base" />
            </div>

            <div className="lg:hidden flex items-center">
              <Logo className="w-7 h-7" showText={false} />
              <span className="ml-2 text-lg font-bold">
                <span className="text-pink-600">Boost</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search admin panel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-700 dark:focus:ring-pink-600"
              />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              onClick={() => setQuickAddOpen(true)}
              className="lg:hidden h-9 w-9 p-0 bg-pink-600 hover:bg-pink-700 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && !notificationsRead && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center animate-pulse"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-xl"
                sideOffset={12}
              >
                <DropdownMenuLabel className="flex items-center justify-between py-3 px-4">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Notifications</span>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && !notificationsRead && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                      >
                        {unreadCount} new
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllNotificationsRead}
                      className="h-6 px-2 text-xs text-pink-600 hover:text-pink-700 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20"
                    >
                      Mark all read
                    </Button>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start space-y-1 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-sm ${notification.read ? "font-normal text-gray-700 dark:text-gray-300" : "font-semibold text-gray-900 dark:text-gray-100"}`}
                        >
                          {notification.title}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{notification.message}</span>
                      {!notification.read && <div className="w-2 h-2 bg-pink-500 rounded-full ml-auto"></div>}
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="text-center text-sm text-pink-600 cursor-pointer hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20 py-3 font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-pink-500 hover:ring-offset-2 transition-all"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-pink-100 text-pink-600 text-sm font-semibold dark:bg-pink-900/30 dark:text-pink-400">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-xl"
                align="end"
                forceMount
                sideOffset={12}
              >
                <DropdownMenuLabel className="font-normal py-3 px-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="text-xs leading-none text-gray-600 dark:text-gray-400">{user.email}</p>
                    <Badge
                      variant="secondary"
                      className="w-fit text-xs mt-1 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                    >
                      {user.role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-2.5 px-4 transition-colors">
                  <User className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-900 dark:text-gray-100">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 py-2.5 px-4 transition-colors">
                  <Settings className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-900 dark:text-gray-100">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 py-2.5 px-4 transition-colors font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar (when search is active) */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search admin panel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Search Sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="h-full dark:bg-gray-900 dark:text-gray-100">
          <SheetHeader>
            <SheetTitle className="dark:text-gray-100">Search Admin Panel</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg h-12 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                autoFocus
              />
            </form>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3 dark:text-gray-400">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start dark:text-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setQuickAddOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Quick Add
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-gray-100 dark:hover:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quick Add Modal */}
      <QuickAddModal open={quickAddOpen} onOpenChange={setQuickAddOpen} />
    </>
  )
}
