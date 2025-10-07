"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react"
import Logo from "@/components/Logo"

export default function AdminFooter() {
  const currentYear = new Date().getFullYear()

  const stats = [
    { label: "Uptime", value: "99.9%", icon: Zap, color: "text-green-600" },
    { label: "Active Users", value: "1,234", icon: Users, color: "text-pink-600" },
    { label: "Performance", value: "Excellent", icon: TrendingUp, color: "text-purple-600" },
    { label: "Security", value: "Protected", icon: Shield, color: "text-blue-900" },
  ]

  const quickLinks = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support Center", href: "#" },
    { label: "System Status", href: "#" },
  ]

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Stats Section */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-sm font-medium text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Main Footer Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <Logo className="w-6 h-6" showText={true} textClassName="text-lg" />
              <Badge variant="secondary" className="text-xs ml-2">
                v2.1.0
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4 max-w-md">
              Comprehensive admin dashboard for managing Boost Web Agency with advanced features, real-time analytics,
              and secure user management.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Digital Avenue, Web City, WC 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>admin@boostwebagency.com</span>
              </div>
            </div>
          </div>
          {/* </CHANGE> */}

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Button variant="link" className="h-auto p-0 text-sm text-gray-600 hover:text-pink-600" asChild>
                    <a href={link.href}>{link.label}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* System Status & Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Connect</h4>

            {/* System Status */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-1 mt-1 text-xs text-green-600">
                <Clock className="h-3 w-3" />
                <span>Last updated: 2 min ago</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Button key={index} variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent" asChild>
                  <a href={social.href} title={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>© {currentYear} Boost Web Agency. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Button variant="link" className="h-auto p-0 text-sm" asChild>
              <a href="#">Privacy Policy</a>
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm" asChild>
              <a href="#">Terms of Service</a>
            </Button>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-pink-600 fill-current" />
              <span>by Boost Team</span>
            </div>
          </div>
        </div>
      </div>
      {/* </CHANGE> */}
    </footer>
  )
}
