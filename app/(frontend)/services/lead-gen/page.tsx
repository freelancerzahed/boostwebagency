import type { Metadata } from "next"
import Link from "next/link"
import { Users, ArrowLeft, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Lead Generation Services | Boost Web Agency",
  description: "Effective techniques to attract and convert potential customers into leads.",
}

export default function LeadGenerationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Lead Generation</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Effective techniques to attract and convert potential customers into leads. We help you build a steady
              stream of qualified leads for your business.
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
                title: "Landing Pages",
                description: "High-converting landing pages designed to capture leads and drive action.",
              },
              {
                title: "Lead Magnets",
                description: "Compelling offers and content that attract your ideal customers.",
              },
              {
                title: "Conversion Optimization",
                description: "Data-driven strategies to maximize your conversion rates and ROI.",
              },
              {
                title: "Form Optimization",
                description: "Streamlined forms that make it easy for visitors to become leads.",
              },
              {
                title: "A/B Testing",
                description: "Continuous testing and optimization to improve lead generation performance.",
              },
              {
                title: "Lead Nurturing",
                description: "Automated email sequences to nurture leads and move them through your funnel.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
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
                title: "Audience Research",
                description: "Identify and understand your ideal customer profile.",
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "Create a comprehensive lead generation strategy tailored to your business.",
              },
              {
                step: "03",
                title: "Campaign Creation",
                description: "Design and build landing pages, forms, and lead magnets.",
              },
              {
                step: "04",
                title: "Traffic Generation",
                description: "Drive targeted traffic through SEO, PPC, and social media.",
              },
              {
                step: "05",
                title: "Optimization",
                description: "Continuously test and improve to maximize lead quality and quantity.",
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
