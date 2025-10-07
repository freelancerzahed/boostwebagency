import type { Metadata } from "next"
import Link from "next/link"
import { Facebook, ArrowLeft, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Facebook Advertising Services | Boost Web Agency",
  description: "Optimize your social media presence with targeted Facebook advertising campaigns.",
}

export default function FacebookAdsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-700/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6 shadow-lg">
              <Facebook className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Facebook Advertising</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Optimize your social media presence with targeted Facebook advertising campaigns. Reach your ideal
              customers and drive real business results.
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
                title: "Ad Campaign Strategy",
                description: "Comprehensive Facebook advertising strategy aligned with your business goals.",
              },
              {
                title: "Audience Targeting",
                description: "Precise targeting to reach your ideal customers based on demographics and interests.",
              },
              {
                title: "ROI Tracking",
                description: "Detailed analytics and reporting to measure campaign performance and ROI.",
              },
              {
                title: "Creative Design",
                description: "Eye-catching ad creatives that stop the scroll and drive engagement.",
              },
              {
                title: "A/B Testing",
                description: "Continuous testing of ad variations to optimize performance and reduce costs.",
              },
              {
                title: "Campaign Management",
                description: "Ongoing monitoring and optimization to maximize your advertising budget.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4">
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
                title: "Goal Setting",
                description: "Define clear objectives and KPIs for your Facebook campaigns.",
              },
              {
                step: "02",
                title: "Audience Research",
                description: "Identify and analyze your target audience on Facebook.",
              },
              {
                step: "03",
                title: "Campaign Setup",
                description: "Create and configure campaigns with optimal targeting and budgets.",
              },
              {
                step: "04",
                title: "Creative Development",
                description: "Design compelling ad creatives that resonate with your audience.",
              },
              {
                step: "05",
                title: "Monitor & Optimize",
                description: "Continuously track performance and make data-driven optimizations.",
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
