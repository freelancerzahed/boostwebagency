import type { Metadata } from "next"
import Link from "next/link"
import { TrendingUp, ArrowLeft, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Digital Marketing Services | Boost Web Agency",
  description: "Strategies to boost your brand through targeted SEO and effective online campaigns.",
}

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Digital Marketing</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Strategies to boost your brand through targeted SEO and effective online campaigns. We help you reach your
              target audience and grow your business online.
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
                title: "SEO Strategy",
                description: "Comprehensive search engine optimization to improve your rankings and visibility.",
              },
              {
                title: "Content Marketing",
                description: "Engaging content that attracts, educates, and converts your target audience.",
              },
              {
                title: "Analytics & Reporting",
                description: "Data-driven insights to measure performance and optimize your campaigns.",
              },
              {
                title: "Social Media Marketing",
                description: "Strategic social media campaigns to build your brand and engage customers.",
              },
              {
                title: "Email Marketing",
                description: "Targeted email campaigns that nurture leads and drive conversions.",
              },
              {
                title: "PPC Advertising",
                description: "Pay-per-click campaigns that deliver immediate results and ROI.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
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
              { step: "01", title: "Research", description: "Analyze your market, competitors, and target audience." },
              {
                step: "02",
                title: "Strategy",
                description: "Develop a comprehensive marketing plan tailored to your goals.",
              },
              {
                step: "03",
                title: "Implementation",
                description: "Execute campaigns across multiple channels for maximum impact.",
              },
              {
                step: "04",
                title: "Optimization",
                description: "Continuously test and refine strategies based on performance data.",
              },
              {
                step: "05",
                title: "Reporting",
                description: "Provide detailed analytics and insights on campaign performance.",
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
