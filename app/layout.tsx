import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: "Boost Web Agency - Professional Web Development & Digital Marketing",
  description:
    "Boost Web Agency offers professional web development, digital marketing, and e-commerce solutions to help your business grow online.",
  keywords: ["web development", "digital marketing", "web design", "ecommerce", "SEO", "web agency"],
  authors: [{ name: "Boost Web Agency" }],
  creator: "Boost Web Agency",
  publisher: "Boost Web Agency",
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}