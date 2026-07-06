import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"
import SchemaMarkup from "@/components/SchemaMarkup"

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
  title: "Boost Web Agency - Professional Web Development, Digital Marketing & E-Commerce Solutions",
  description:
    "Boost Web Agency is a leading web development and digital marketing company specializing in custom web applications, e-commerce platforms, SEO optimization, and digital marketing strategies. Founded by Zahedul Islam, a web application developer and digital marketer.",
  keywords: [
    "web development",
    "digital marketing",
    "web design",
    "e-commerce solutions",
    "SEO",
    "web agency",
    "web application development",
    "custom website design",
    "online marketing",
    "digital strategy",
    "Zahedul Islam",
    "Bangladesh web agency"
  ],
  authors: [{ name: "Boost Web Agency", url: "https://boostwebagency.com" }],
  creator: "Boost Web Agency",
  publisher: "Boost Web Agency",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
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
    title: "Boost Web Agency - Web Development & Digital Marketing",
    description: "Professional web development, digital marketing, and e-commerce solutions for businesses",
    siteName: "Boost Web Agency",
    images: [
      {
        url: "https://boostwebagency.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Boost Web Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boost Web Agency - Web Development & Digital Marketing",
    description: "Professional web development, digital marketing, and e-commerce solutions",
    creator: "@boostwebagency",
  },
  alternates: {
    canonical: "https://boostwebagency.com",
  },
  metadataBase: new URL("https://boostwebagency.com"),
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
      </head>
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