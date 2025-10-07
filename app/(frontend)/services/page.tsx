import { Suspense } from "react"
import dynamic from "next/dynamic"

const ServicesClient = dynamic(() => import("./ServicesClient"), {
  loading: () => (
    <div className="min-h-screen bg-background dark:bg-background animate-pulse">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="h-12 bg-muted rounded-lg mb-4 animate-pulse"></div>
          <div className="h-6 bg-muted rounded animate-pulse w-2/3 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card dark:bg-card p-6 rounded-xl shadow-lg animate-pulse">
              <div className="w-12 h-12 bg-muted rounded-lg mb-4"></div>
              <div className="h-6 bg-muted rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
})

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background dark:bg-background animate-pulse">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <div className="h-12 bg-muted rounded-lg mb-4 animate-pulse"></div>
              <div className="h-6 bg-muted rounded animate-pulse w-2/3 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card dark:bg-card p-6 rounded-xl shadow-lg animate-pulse">
                  <div className="w-12 h-12 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ServicesClient />
    </Suspense>
  )
}
