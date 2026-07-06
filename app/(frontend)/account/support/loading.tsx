import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SupportLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 to-blue-600 pt-safe">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
            <div>
              <Skeleton className="h-5 w-32 bg-white/20 mb-1" />
              <Skeleton className="h-3 w-24 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="pt-24 px-4 pb-20">
        {/* Tabs Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="rounded-3xl">
            <CardContent className="p-5 text-center">
              <Skeleton className="w-12 h-12 rounded-2xl mx-auto mb-3" />
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-3 w-24 mx-auto" />
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardContent className="p-5 text-center">
              <Skeleton className="w-12 h-12 rounded-2xl mx-auto mb-3" />
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-3 w-24 mx-auto" />
            </CardContent>
          </Card>
        </div>

        {/* Search and FAQ Skeleton */}
        <Card className="rounded-3xl mb-6">
          <CardContent className="p-6">
            <Skeleton className="h-14 w-full rounded-2xl mb-6" />
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-2xl p-4">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
