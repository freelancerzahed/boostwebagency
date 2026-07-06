"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import CartIcon from "./CartIcon" // Hidden
// import WishlistIcon from "./WishlistIcon" // Hidden
import ThemeToggle from "./ThemeToggle"
import Logo from "./Logo"
import { useAuth } from "@/hooks/useAuth"

// Define navigation items as a constant to ensure consistency between server and client
const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  // { name: "Shop", href: "/shop" }, // Hidden - to be enabled later
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "FAQ", href: "/faq" },
  { name: "Get Help", href: "/chat" },
] as const

const NavigationLink = memo(({ item, pathname }: { item: { name: string; href: string }; pathname: string }) => (
  <Link
    href={item.href}
    className={`text-sm inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:text-pink-600 dark:hover:text-pink-400 whitespace-nowrap relative px-2 py-1 ${
      pathname === item.href ? "text-pink-600 dark:text-pink-400" : "text-gray-700 dark:text-gray-300"
    }`}
  >
    {item.name}
    {pathname === item.href && (
      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600 dark:bg-pink-400 rounded-full" />
    )}
  </Link>
))

NavigationLink.displayName = "NavigationLink"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        {/* Desktop Header - Two rows */}
        <div className="hidden lg:block">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Navigation Menu - Centered */}
            <div className="flex items-center space-x-4">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationLink key={item.name} item={item} pathname={pathname} />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {/* <WishlistIcon /> */}
              {/* <CartIcon /> */}
              {/* Hidden - Cart and Wishlist pages disabled for now */}

              {/* User Account Dropdown - Hidden for now */}
            </div>
          </div>
        </div>

        {/* Mobile Header - Single row */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <Logo className="w-8 h-8" showText={false} />

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {/* <WishlistIcon /> */}
            {/* <CartIcon /> */}
            {/* Hidden - Cart and Wishlist pages disabled for now */}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 p-0 text-gray-600 dark:text-gray-400 flex items-center justify-center"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg mx-2 ${
                      pathname === item.href
                        ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Section - Hidden for now */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default memo(Header)
