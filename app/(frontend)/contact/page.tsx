import { Suspense } from "react"
import dynamic from "next/dynamic"

const ContactClient = dynamic(() => import("./ContactClient"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
})

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ContactClient />
    </Suspense>
  )
}
