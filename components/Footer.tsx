"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "./Logo"
import { memo } from "react"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  products: [
    { name: "Shop All", href: "/shop" },
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Best Sellers", href: "/shop?filter=popular" },
    { name: "Sale", href: "/shop?filter=sale" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

const LinkSection = memo(({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))

LinkSection.displayName = "LinkSection"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo className="w-10 h-10" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your premier destination for quality products and exceptional service.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>
                  <a href="tel:+8801603108425">+880 1603-108425</a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>
                  <a href="mailto:boostwebagency.info@gmail.com">boostwebagency.info@gmail.com</a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <LinkSection title="Company" links={footerLinks.company} />
          <LinkSection title="Products" links={footerLinks.products} />
          <LinkSection title="Support" links={footerLinks.support} />
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Boost Web Agency. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}