import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingCart, ArrowLeft, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "E-Commerce Solutions | Boost Web Agency",
  description: "Tailored e-commerce websites to enhance your online sales and customer experience.",
}

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">E-Commerce Solutions</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tailored e-commerce websites to enhance your online sales and customer experience. Build a powerful online
              store that converts visitors into loyal customers.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Online Store Setup",
                description:
                  "Complete e-commerce platform setup with product catalogs and shopping cart functionality.",
              },
              {
                title: "Payment Gateway Integration",
                description:
                  "Secure payment processing with support for multiple payment methods including bKash and Binance Pay.",
              },
              {
                title: "Inventory Management",
                description: "Efficient inventory tracking and management system for your digital products.",
              },
              {
                title: "Order Management",
                description: "Streamlined order processing and fulfillment system for smooth operations.",
              },
              {
                title: "Customer Accounts",
                description: "User-friendly customer portal for order history, wishlists, and account management.",
              },
              {
                title: "Analytics Dashboard",
                description: "Comprehensive sales analytics and reporting to track your business performance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Process</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Planning",
                description: "Define your product catalog, pricing strategy, and business goals.",
              },
              {
                step: "02",
                title: "Design",
                description: "Create an attractive storefront that showcases your products effectively.",
              },
              {
                step: "03",
                title: "Development",
                description: "Build a robust e-commerce platform with all necessary features.",
              },
              {
                step: "04",
                title: "Integration",
                description: "Connect payment gateways, shipping, and other third-party services.",
              },
              {
                step: "05",
                title: "Launch & Support",
                description: "Go live and provide ongoing support to ensure smooth operations.",
              },
            ].map((process, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {process.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
