"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { memo } from "react"
import { Home, ShoppingBag, Briefcase, Info, MessageCircle } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag, hiddenOnMobile: true }, // hiddenOnMobile: toggle later
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "About", href: "/about", icon: Info },
  { name: "Chat", href: "/chat", icon: MessageCircle },
]

const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname()

  const visible = navigation.filter((item) => !item.hiddenOnMobile)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden">
      <div
        className="grid h-16"
        style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}
      >
        {/* Render visible items so columns always distribute evenly */}
        {visible.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 relative transition-colors ${
                isActive
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
})

export default MobileBottomNav
