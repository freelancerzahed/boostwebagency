import { Suspense } from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "About Boost Web Agency - Meet Zahedul Islam, Founder & CEO",
  description: "Learn about Boost Web Agency, founded by Zahedul Islam, a web application developer and digital marketing expert. Discover our mission, team, and commitment to building exceptional digital solutions.",
  keywords: [
    "Zahedul Islam",
    "web developer",
    "digital marketer",
    "Boost Web Agency founder",
    "web development company",
    "digital marketing agency",
    "about us",
    "company culture",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boostwebagency.com/about",
    title: "About Boost Web Agency - Founder Zahedul Islam",
    description: "Learn about Boost Web Agency and founder Zahedul Islam, a web developer and digital marketing expert dedicated to building exceptional digital solutions.",
    siteName: "Boost Web Agency",
    images: [
      {
        url: "https://boostwebagency.com/og-about.png",
        width: 1200,
        height: 630,
        alt: "Boost Web Agency About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Boost Web Agency - Founder Zahedul Islam",
    description: "Learn about our founder Zahedul Islam and the story behind Boost Web Agency.",
    creator: "@boostwebagency",
  },
  alternates: {
    canonical: "https://boostwebagency.com/about",
  },
}

const AboutClient = dynamic(() => import("./AboutClient"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 bg-gray-300 rounded-lg mb-8 animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  ),
})

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="h-12 bg-gray-300 rounded-lg mb-8 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AboutClient />
    </Suspense>
  )
}
