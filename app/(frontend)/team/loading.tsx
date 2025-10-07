export default function TeamLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="text-center text-white space-y-4 md:space-y-8">
            <div className="w-32 h-8 bg-white/20 rounded-full mx-auto animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 md:h-12 lg:h-16 bg-white/20 rounded-lg animate-pulse"></div>
              <div className="h-8 md:h-12 lg:h-16 bg-white/20 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-6 bg-white/20 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-white/20 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section Skeleton */}
      <div className="py-6 md:py-12 bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          {/* Mobile Filter Skeleton */}
          <div className="md:hidden">
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Desktop Filter Skeleton */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-28 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Grid Skeleton */}
      <div className="py-8 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 md:h-80 bg-gray-200 animate-pulse"></div>
                <div className="p-4 md:p-8 space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 md:h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 md:h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
