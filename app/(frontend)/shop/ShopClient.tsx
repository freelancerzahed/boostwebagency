"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, ArrowRight, Eye } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import type { Product } from "@/types/product"

const categories = [
  { id: "all", name: "All Products" },
  { id: "web-templates", name: "Web Templates" },
  { id: "mobile-apps", name: "Mobile Apps" },
  { id: "graphics", name: "Graphics" },
  { id: "plugins", name: "Plugins" },
  { id: "courses", name: "Courses" },
]

const products: Product[] = [
  {
    id: "1",
    name: "Modern E-commerce Website Template",
    description:
      "Fully responsive e-commerce template with admin panel, payment integration, and modern design. Perfect for online stores, digital marketplaces, and business websites.",
    price: 99,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    category: "web-templates",
    rating: 4.8,
    reviews: 124,
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Stripe"],
    featured: true,
    inStock: true,
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    ],
    features: [
      "Fully Responsive Design",
      "Admin Dashboard Included",
      "Payment Gateway Integration",
      "SEO Optimized",
      "Mobile App Ready",
      "24/7 Support Included",
    ],
    specifications: {
      "File Format": "React/Next.js Project",
      "File Size": "45 MB",
      Version: "2.1.0",
      "Last Updated": "December 2024",
    },
    whatYouGet: [
      "Complete Source Code",
      "Admin Panel",
      "User Dashboard",
      "Payment Integration",
      "Email Templates",
      "Documentation",
    ],
    demoUrl: "https://demo.example.com",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    name: "Digital Marketing Course Bundle",
    description:
      "Complete digital marketing course with certificates, video tutorials, and practical exercises. Learn SEO, social media marketing, and analytics.",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "courses",
    rating: 4.9,
    reviews: 89,
    tags: ["SEO", "Social Media", "Analytics", "Marketing"],
    featured: true,
    inStock: true,
    features: [
      "20+ Hours of Video Content",
      "Practical Exercises",
      "Certificate of Completion",
      "Lifetime Access",
      "Community Support",
      "Regular Updates",
    ],
    specifications: {
      Format: "Video Course + PDFs",
      Duration: "20+ Hours",
      Language: "English",
      Level: "Beginner to Advanced",
    },
    whatYouGet: [
      "Video Tutorials",
      "Course Materials",
      "Templates & Tools",
      "Certificate",
      "Community Access",
      "Lifetime Updates",
    ],
  },
  {
    id: "3",
    name: "Mobile App UI Kit",
    description:
      "Premium mobile app UI components and screens for iOS and Android. Includes Figma files, Sketch files, and Adobe XD files.",
    price: 79,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    category: "mobile-apps",
    rating: 4.7,
    reviews: 156,
    tags: ["Figma", "Sketch", "Adobe XD", "iOS", "Android"],
    featured: false,
    inStock: true,
    features: [
      "100+ UI Components",
      "50+ App Screens",
      "Dark & Light Themes",
      "Figma Components",
      "Sketch Symbols",
      "Adobe XD Assets",
    ],
    specifications: {
      "File Format": "Figma, Sketch, Adobe XD",
      Components: "100+",
      Screens: "50+",
      Themes: "Light & Dark",
    },
    whatYouGet: ["Figma File", "Sketch File", "Adobe XD File", "Design System", "Icon Pack", "Documentation"],
  },
  {
    id: "4",
    name: "Logo Design Package",
    description:
      "Professional logo design with brand guidelines, business cards, and marketing materials. Perfect for startups and businesses.",
    price: 149,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    category: "graphics",
    rating: 4.6,
    reviews: 78,
    tags: ["Branding", "Logo", "Identity", "Business Cards"],
    featured: false,
    inStock: true,
    features: [
      "Custom Logo Design",
      "Brand Guidelines",
      "Business Card Design",
      "Letterhead Design",
      "Social Media Kit",
      "Vector Files Included",
    ],
    specifications: {
      "File Format": "AI, EPS, PNG, JPG, PDF",
      Revisions: "Unlimited",
      Delivery: "3-5 Business Days",
      "Commercial Use": "Included",
    },
    whatYouGet: ["Logo Design", "Brand Guidelines", "Business Cards", "Letterhead", "Social Media Kit", "Vector Files"],
  },
  {
    id: "5",
    name: "WordPress SEO Plugin",
    description:
      "Advanced SEO plugin for WordPress websites with keyword optimization, meta tags, and analytics integration.",
    price: 59,
    originalPrice: 89,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
    category: "plugins",
    rating: 4.5,
    reviews: 203,
    tags: ["WordPress", "SEO", "Analytics", "Plugin"],
    featured: false,
    inStock: true,
    features: [
      "Keyword Optimization",
      "Meta Tag Management",
      "XML Sitemap Generation",
      "Analytics Integration",
      "Schema Markup",
      "Performance Monitoring",
    ],
    specifications: {
      "WordPress Version": "5.0+",
      "PHP Version": "7.4+",
      License: "GPL v2",
      Support: "1 Year",
    },
    whatYouGet: ["Plugin Files", "Installation Guide", "User Manual", "Video Tutorials", "Email Support", "Updates"],
  },
  {
    id: "6",
    name: "Social Media Graphics Pack",
    description:
      "1000+ social media templates and graphics for Instagram, Facebook, Twitter, and LinkedIn. Includes Canva templates.",
    price: 39,
    originalPrice: 69,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    category: "graphics",
    rating: 4.4,
    reviews: 167,
    tags: ["Instagram", "Facebook", "Twitter", "Canva"],
    featured: false,
    inStock: true,
    features: [
      "1000+ Templates",
      "Instagram Stories",
      "Facebook Posts",
      "Twitter Headers",
      "LinkedIn Banners",
      "Canva Templates",
    ],
    specifications: {
      "File Format": "PSD, PNG, JPG, Canva",
      Templates: "1000+",
      Platforms: "All Major Social Media",
      Resolution: "High Resolution",
    },
    whatYouGet: ["PSD Files", "PNG Files", "JPG Files", "Canva Templates", "Font List", "Usage Guide"],
  },
  {
    id: "7",
    name: "SaaS Landing Page Template",
    description:
      "Modern SaaS landing page template with pricing tables, testimonials, and feature sections. Built with React and Tailwind CSS.",
    price: 89,
    originalPrice: 129,
    image: "/products/saas-landing-page.jpg",
    category: "web-templates",
    rating: 4.9,
    reviews: 142,
    tags: ["React", "Tailwind", "SaaS", "Landing Page"],
    featured: true,
    inStock: true,
    features: [
      "Responsive Design",
      "Pricing Tables",
      "Testimonial Section",
      "Feature Showcase",
      "CTA Sections",
      "Newsletter Integration",
    ],
    specifications: {
      "File Format": "React/Next.js",
      "File Size": "32 MB",
      Version: "1.5.0",
      "Last Updated": "January 2025",
    },
    whatYouGet: ["Source Code", "Design Files", "Documentation", "Email Support"],
  },
  {
    id: "8",
    name: "Fitness App UI Design",
    description:
      "Complete fitness and workout tracking app UI with 40+ screens. Includes workout plans, progress tracking, and nutrition features.",
    price: 119,
    originalPrice: 179,
    image: "/products/fitness-app-ui.jpg",
    category: "mobile-apps",
    rating: 4.8,
    reviews: 98,
    tags: ["Fitness", "Mobile", "UI/UX", "Health"],
    featured: false,
    inStock: true,
    features: [
      "40+ App Screens",
      "Workout Tracking",
      "Nutrition Plans",
      "Progress Charts",
      "Dark Mode Support",
      "Figma & Sketch Files",
    ],
    specifications: {
      "File Format": "Figma, Sketch",
      Screens: "40+",
      Platforms: "iOS & Android",
      Resolution: "375x812 & 360x800",
    },
    whatYouGet: ["Figma File", "Sketch File", "Icon Set", "Style Guide", "Documentation"],
  },
  {
    id: "9",
    name: "Premium Icon Pack - 500+ Icons",
    description:
      "Professional icon pack with 500+ vector icons in multiple styles. Perfect for web and mobile applications.",
    price: 49,
    originalPrice: 79,
    image: "/products/icon-pack.jpg",
    category: "graphics",
    rating: 4.7,
    reviews: 234,
    tags: ["Icons", "Vector", "SVG", "Design"],
    featured: false,
    inStock: true,
    features: [
      "500+ Unique Icons",
      "Multiple Styles",
      "Vector Format",
      "Fully Editable",
      "Web & Mobile Ready",
      "Regular Updates",
    ],
    specifications: {
      "File Format": "SVG, PNG, AI",
      Icons: "500+",
      Styles: "3 Styles",
      License: "Commercial Use",
    },
    whatYouGet: ["SVG Files", "PNG Files", "AI Files", "Icon Font", "Documentation"],
  },
  {
    id: "10",
    name: "Web Development Masterclass",
    description:
      "Complete web development course covering HTML, CSS, JavaScript, React, and Node.js. Build 10+ real-world projects.",
    price: 249,
    originalPrice: 399,
    image: "/products/web-dev-course.jpg",
    category: "courses",
    rating: 4.9,
    reviews: 312,
    tags: ["Web Development", "React", "Node.js", "JavaScript"],
    featured: true,
    inStock: true,
    features: [
      "50+ Hours Content",
      "10+ Real Projects",
      "Certificate Included",
      "Lifetime Access",
      "Q&A Support",
      "Code Resources",
    ],
    specifications: {
      Format: "Video + Code",
      Duration: "50+ Hours",
      Language: "English",
      Level: "Beginner to Pro",
    },
    whatYouGet: ["Video Lessons", "Project Files", "Code Templates", "Certificate", "Community Access"],
  },
  {
    id: "11",
    name: "Analytics Dashboard Plugin",
    description:
      "Powerful analytics dashboard plugin for WordPress with real-time data, custom reports, and beautiful visualizations.",
    price: 79,
    originalPrice: 119,
    image: "/products/analytics-plugin.jpg",
    category: "plugins",
    rating: 4.6,
    reviews: 187,
    tags: ["WordPress", "Analytics", "Dashboard", "Reports"],
    featured: false,
    inStock: true,
    features: [
      "Real-time Analytics",
      "Custom Reports",
      "Data Visualization",
      "Export Options",
      "Multi-site Support",
      "API Integration",
    ],
    specifications: {
      "WordPress Version": "5.5+",
      "PHP Version": "7.4+",
      License: "Extended",
      Support: "1 Year",
    },
    whatYouGet: ["Plugin Files", "Setup Guide", "Documentation", "Video Tutorials", "Priority Support"],
  },
  {
    id: "12",
    name: "Illustration Bundle - 100+ Graphics",
    description:
      "Beautiful hand-drawn illustration bundle with 100+ graphics perfect for websites, presentations, and marketing materials.",
    price: 69,
    originalPrice: 99,
    image: "/products/illustration-bundle.jpg",
    category: "graphics",
    rating: 4.8,
    reviews: 156,
    tags: ["Illustrations", "Graphics", "Vector", "Design"],
    featured: false,
    inStock: true,
    features: [
      "100+ Illustrations",
      "Hand-drawn Style",
      "Vector Format",
      "Fully Customizable",
      "Multiple Categories",
      "Commercial License",
    ],
    specifications: {
      "File Format": "AI, SVG, PNG",
      Graphics: "100+",
      Categories: "10+",
      Resolution: "Scalable Vector",
    },
    whatYouGet: ["AI Files", "SVG Files", "PNG Files", "Color Palette", "Usage Guide"],
  },
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      default:
        return b.featured ? 1 : -1
    }
  })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Digital Shop</h1>
          <p className="text-gray-600 dark:text-gray-400">Premium digital products and services for your business</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300"
              />
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-pink-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 shadow-sm text-pink-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-pink-500 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className={`mt-6 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"} overflow-hidden`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isInWishlist(product.id)
                      ? "bg-pink-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>

                {/* Quick View Button */}
                <Link
                  href={`/shop/product/${product.id}`}
                  className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-full font-medium flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                      Save ${product.originalPrice - product.price}
                    </div>
                  )}
                </div>

                <Link href={`/shop/product/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium flex items-center space-x-1"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-blue-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Custom Development?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? We offer custom development services tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
          >
            <span>Get Custom Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
