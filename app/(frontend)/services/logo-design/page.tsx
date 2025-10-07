import type { Metadata } from "next"
import Link from "next/link"
import { Palette, ArrowLeft, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Logo Design Services | Boost Web Agency",
  description: "Professional logo creation to establish and strengthen your brand identity.",
}

export default function LogoDesignPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Logo Design</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional logo creation to establish and strengthen your brand identity. Create a memorable visual
              identity that sets your business apart.
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
                title: "Brand Identity",
                description: "Complete brand identity development including logo, colors, and typography.",
              },
              {
                title: "Custom Logo Design",
                description: "Unique, professional logos tailored to your business and industry.",
              },
              {
                title: "Brand Guidelines",
                description: "Comprehensive brand guidelines to ensure consistent use across all platforms.",
              },
              {
                title: "Multiple Concepts",
                description: "Several design concepts to choose from, with unlimited revisions.",
              },
              {
                title: "File Formats",
                description: "All necessary file formats for print, web, and social media use.",
              },
              {
                title: "Trademark Support",
                description: "Guidance on trademark registration to protect your brand identity.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
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
                title: "Discovery",
                description: "Learn about your business, values, and target audience.",
              },
              { step: "02", title: "Research", description: "Analyze your industry, competitors, and design trends." },
              {
                step: "03",
                title: "Concept Development",
                description: "Create multiple logo concepts based on our research.",
              },
              { step: "04", title: "Refinement", description: "Refine your chosen concept with unlimited revisions." },
              {
                step: "05",
                title: "Delivery",
                description: "Provide final files and brand guidelines for your new logo.",
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
