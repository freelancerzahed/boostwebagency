import { Suspense } from "react"
import dynamic from "next/dynamic"

const FaqClient = dynamic(() => import("./FaqClient"), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-300 rounded flex-1 mr-4"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
})

export default function FaqPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 animate-pulse">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="h-12 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
              </div>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded flex-1 mr-4"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <FaqClient />
    </Suspense>
  )
}
