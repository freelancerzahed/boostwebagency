import { Suspense } from "react"
import dynamic from "next/dynamic"

const ChatClientPage = dynamic(() => import("./ChatClientPage"), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
            <div className="p-6 border-b">
              <div className="h-8 bg-gray-300 rounded animate-pulse w-1/3"></div>
            </div>
            <div className="flex-1 p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${i % 2 === 0 ? "bg-gray-300" : "bg-blue-300"} animate-pulse`}
                  >
                    <div className="h-4 bg-gray-400 rounded mb-1"></div>
                    <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t">
              <div className="flex gap-4">
                <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="w-12 h-12 bg-blue-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
})

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 animate-pulse">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
                <div className="p-6 border-b">
                  <div className="h-8 bg-gray-300 rounded animate-pulse w-1/3"></div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${i % 2 === 0 ? "bg-gray-300" : "bg-blue-300"} animate-pulse`}
                      >
                        <div className="h-4 bg-gray-400 rounded mb-1"></div>
                        <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t">
                  <div className="flex gap-4">
                    <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                    <div className="w-12 h-12 bg-blue-300 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ChatClientPage />
    </Suspense>
  )
}
