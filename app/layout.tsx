import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GoToTop from "@/components/GoToTop"
import MobileBottomNav from "@/components/MobileBottomNav"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Boost Web Agency - Professional Web Development & Digital Marketing",
  description:
    "Boost Web Agency offers professional web development, digital marketing, and e-commerce solutions to help your business grow online.",
  keywords: ["web development", "digital marketing", "web design", "ecommerce", "SEO", "web agency"],
  authors: [{ name: "Boost Web Agency" }],
  creator: "Boost Web Agency",
  publisher: "Boost Web Agency",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boostwebagency.com",
    title: "Boost Web Agency - Professional Web Development & Digital Marketing",
    description: "Professional web development, digital marketing, and e-commerce solutions",
    siteName: "Boost Web Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boost Web Agency - Professional Web Development & Digital Marketing",
    description: "Professional web development, digital marketing, and e-commerce solutions",
  },
  alternates: {
    canonical: "https://boostwebagency.com",
  },
  metadataBase: new URL("https://boostwebagency.com"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <GoToTop />
            <MobileBottomNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}