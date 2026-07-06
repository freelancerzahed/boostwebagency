"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Share2,
  Heart,
  ShoppingCart,
  ImageIcon,
  Video,
  Play,
  Monitor,
  MessageCircle,
  Zap,
  CheckCircle,
  Store,
  ArrowLeft,
  ThumbsUp,
  MoreHorizontal,
  FileText,
} from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import type { Product } from "@/types/product"
import { useToast } from "@/hooks/use-toast"
import { ShareDialog } from "@/components/ShareDialog"

// Mock product data - in real app, this would come from API
const products: Product[] = [
  {
    id: "1",
    name: "Modern E-commerce Website Template",
    description:
      "Fully responsive e-commerce template with admin panel, payment integration, and modern design. Perfect for online stores, digital marketplaces, and business websites.",
    price: 99,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "web-templates",
    rating: 4.8,
    reviews: 124,
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Stripe"],
    featured: true,
    inStock: true,
    // Changed 'gallery' to 'images' to match component usage
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    ],
    features: [
      "Fully Responsive Design",
      "Admin Dashboard Included",
      "Payment Gateway Integration",
      "SEO Optimized",
      "Mobile App Ready",
      "24/7 Support Included",
      "Free Updates for 1 Year",
      "Documentation Included",
    ],
    specifications: {
      "File Format": "React/Next.js Project",
      "File Size": "45 MB",
      Version: "2.1.0",
      "Last Updated": "December 2024",
      "Browser Support": "All Modern Browsers",
      "Mobile Support": "iOS & Android",
      Documentation: "Included",
      Support: "6 Months Free",
    },
    whatYouGet: [
      "Complete Source Code",
      "Admin Panel",
      "User Dashboard",
      "Payment Integration",
      "Email Templates",
      "Documentation",
      "Video Tutorials",
      "Figma Design Files",
    ],
    requirements: ["Node.js 18+", "Basic React Knowledge", "Code Editor (VS Code recommended)", "Modern Web Browser"],
    demoUrl: "https://demo.example.com",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    brand: "Example Brand",
  },
]

const reviews = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing template! Easy to customize and great documentation. Saved me weeks of development time.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "1 week ago",
    comment: "Perfect for my e-commerce project. The code is clean and well-organized. Highly recommended!",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    user: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great template with lots of features. Support team is very responsive. Minor customization needed for my use case.",
    helpful: 5,
    verified: false,
  },
]

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
    toast({
      title: "Added to Cart!",
      description: `${product.name} x ${quantity} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
    return match ? match[1] : null
  }

  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState("") // Initialize mainImage safely
  const [activeTab, setActiveTab] = useState("overview")
  const [showFullDescription, setShowFullDescription] = useState(false)

  React.useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId)
    setProduct(foundProduct)
    if (foundProduct) {
      setMainImage(foundProduct.images?.[0] || foundProduct.image)
    }
  }, [productId])

  const videoId = product?.videoUrl ? getYouTubeVideoId(product.videoUrl) : null

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/shop"
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-gray-900 dark:text-white truncate max-w-[60%] text-center">
            Product Details
          </h1>
          <div className="flex items-center space-x-2">
            {/* Corrected: Use ShareDialog component here */}
            <ShareDialog
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={product.name}
              description={product.description}
            >
              <button className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
            </ShareDialog>
            {/* Removed Wishlist button from mobile header */}
          </div>
        </div>
      </div>

      {/* Spacer after Mobile Header */}
      <div className="h-[72px] lg:hidden"></div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-[120px] lg:pb-8">
        {/* Product Gallery & Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Gallery Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setMainImage(product.images?.[0] || product.image)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  mainImage === (product.images?.[0] || product.image)
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Images</span>
              </button>
              {product.videoUrl && (
                <button
                  onClick={() => setMainImage(product.videoUrl)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    mainImage === product.videoUrl
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Tutorial</span>
                </button>
              )}
            </div>

            {/* Gallery Content */}
            {mainImage === product.videoUrl ? (
              /* Video Tutorial */
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title={`${product.name} - Video Tutorial`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Video tutorial coming soon</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Main Image */}
                <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <Image src={mainImage || product.image} alt={product.name} fill className="object-cover" priority />
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${product.originalPrice - product.price}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <Card
                        key={index}
                        className={`w-20 h-20 flex-shrink-0 cursor-pointer ${
                          mainImage === image ? "border-2 border-primary" : ""
                        }`}
                        onClick={() => setMainImage(image)}
                      >
                        <CardContent className="p-0 flex items-center justify-center h-full">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                            className="rounded-md"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Action Buttons - Mobile */}
            <div className="lg:hidden flex space-x-2">
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Monitor className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              )}
              <ShareDialog url={currentUrl} title={product.name} description={product.description}>
                <Button className="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-3 rounded-xl font-semibold text-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </Button>
              </ShareDialog>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <ImageIcon className="w-4 h-4" />
                <span>Instant Download</span>
                <span>•</span>
                <Video className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Key Features</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:block space-y-4">
              <div className="flex space-x-3">
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Monitor className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
                <ShareDialog url={currentUrl} title={product.name} description={product.description}>
                  <Button className="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 py-3 rounded-xl font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </Button>
                </ShareDialog>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleToggleWishlist}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isInWishlist(product.id)
                      ? "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  <span>{isInWishlist(product.id) ? "Saved" : "Save"}</span>
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </Button>
                <Button
                  onClick={() => {
                    handleAddToCart()
                    router.push("/shop/cart")
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Buy Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: FileText },
                { id: "specifications", label: "Specs", icon: Monitor },
                { id: "reviews", label: "Reviews", icon: MessageCircle },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-pink-500 border-b-2 border-pink-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {showFullDescription ? product.description : `${product.description.slice(0, 200)}...`}
                    </p>
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-pink-500 hover:text-pink-600 font-medium mt-2"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </div>

                {/* What You Get */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You Get</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.whatYouGet?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                {product.requirements && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {product.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{key}</span>
                      <span className="text-gray-700 dark:text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Summary */}
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.rating}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{product.reviews} reviews</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">96%</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Recommended</p>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.user}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{review.user}</h4>
                              {review.verified && (
                                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">Helpful ({review.helpful})</span>
                            </button>
                            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[99] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-2 safe-area-bottom">
        <div className="grid grid-cols-3 gap-3 py-3">
          {/* Shop and Chat Buttons combined */}
          <div className="flex gap-3">
            <Link
              href="/shop"
              className="flex-1 py-2 rounded-xl font-semibold text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Store className="w-5 h-5" />
            </Link>
            <Link
              href="/chat"
              className="flex-1 py-2 rounded-xl font-semibold text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-pink-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </Button>
          {/* Buy Now Button */}
          <Button
            onClick={() => {
              handleAddToCart()
              router.push("/shop/cart")
            }}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buy Now</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
