import type { Product } from "@/types/product"

const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Modern E-commerce Website Template",
    description:
      "Fully responsive e-commerce template with admin panel, payment integration, and modern design. Perfect for online stores, digital marketplaces, and business websites.",
    price: 99,
    originalPrice: 149,
    image: "/placeholder.svg?height=300&width=400",
    category: "web-templates",
    rating: 4.8,
    reviews: 124,
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Stripe"],
    featured: true,
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
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "2",
    name: "Digital Marketing Course Bundle",
    description:
      "Complete digital marketing course with certificates, video tutorials, and practical exercises. Learn SEO, social media marketing, and analytics.",
    price: 199,
    originalPrice: 299,
    image: "/placeholder.svg?height=300&width=400",
    category: "courses",
    rating: 4.9,
    reviews: 89,
    tags: ["SEO", "Social Media", "Analytics", "Marketing"],
    featured: true,
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
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "3",
    name: "Mobile App UI Kit",
    description:
      "Premium mobile app UI components and screens for iOS and Android. Includes Figma files, Sketch files, and Adobe XD files.",
    price: 79,
    originalPrice: 120,
    image: "/placeholder.svg?height=300&width=400",
    category: "mobile-apps",
    rating: 4.7,
    reviews: 156,
    tags: ["Figma", "Sketch", "Adobe XD", "iOS", "Android"],
    featured: false,
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
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "4",
    name: "Logo Design Package",
    description:
      "Professional logo design with brand guidelines, business cards, and marketing materials. Perfect for startups and businesses.",
    price: 149,
    originalPrice: 200,
    image: "/placeholder.svg?height=300&width=400",
    category: "graphics",
    rating: 4.6,
    reviews: 78,
    tags: ["Branding", "Logo", "Identity", "Business Cards"],
    featured: false,
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
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "5",
    name: "WordPress SEO Plugin",
    description:
      "Advanced SEO plugin for WordPress websites with keyword optimization, meta tags, and analytics integration.",
    price: 59,
    originalPrice: 89,
    image: "/placeholder.svg?height=300&width=400",
    category: "plugins",
    rating: 4.5,
    reviews: 203,
    tags: ["WordPress", "SEO", "Analytics", "Plugin"],
    featured: false,
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
    gallery: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "6",
    name: "Social Media Graphics Pack",
    description:
      "1000+ social media templates and graphics for Instagram, Facebook, Twitter, and LinkedIn. Includes Canva templates.",
    price: 39,
    originalPrice: 69,
    image: "/placeholder.svg?height=300&width=400",
    category: "graphics",
    rating: 4.4,
    reviews: 167,
    tags: ["Instagram", "Facebook", "Twitter", "Canva"],
    featured: false,
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
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export async function getProducts(): Promise<Product[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return PRODUCTS_DATA
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const products = await getProducts()
    return products.find((product) => product.id === id)
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    throw error
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts()
    return products.filter((product) => product.featured)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    throw error
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProducts()
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  } catch (error) {
    console.error("Error fetching products by category:", error)
    throw error
  }
}
