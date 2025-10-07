"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, ShoppingCart, Heart, Settings, CreditCard, MapPin, Bell, Shield, HelpCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

const navigation = [
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: ShoppingCart,
  },
  {
    name: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    name: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    name: "Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    name: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    name: "Security",
    href: "/account/security",
    icon: Shield,
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    href: "/account/support",
    icon: HelpCircle,
  },
]

export default function AccountSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-blue-600 text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}
