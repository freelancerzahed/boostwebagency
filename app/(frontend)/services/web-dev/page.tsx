import type { Metadata } from "next"
import Link from "next/link"
import { Globe, ArrowLeft, Check, ArrowRight, TrendingUp, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Web Development Services | Boost Web Agency",
  description: "Custom website design and development to create a strong online presence for your business.",
}

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="max-w-4xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Web Development</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Custom website design and development to create a strong online presence for your business. We build
              responsive, fast, and SEO-optimized websites that convert visitors into customers.
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
                title: "Responsive Design",
                description:
                  "Mobile-first approach ensuring your website looks perfect on all devices and screen sizes.",
              },
              {
                title: "Fast Loading",
                description: "Optimized performance with lightning-fast load times to keep your visitors engaged.",
              },
              {
                title: "SEO Optimized",
                description: "Built with search engine optimization in mind to help you rank higher on Google.",
              },
              {
                title: "Custom Development",
                description: "Tailored solutions built specifically for your business needs and goals.",
              },
              {
                title: "Modern Technologies",
                description: "Using the latest web technologies like React, Next.js, and Tailwind CSS.",
              },
              {
                title: "Ongoing Support",
                description: "Continuous maintenance and support to keep your website running smoothly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
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
                description: "We learn about your business, goals, and target audience.",
              },
              { step: "02", title: "Design", description: "Create wireframes and mockups that align with your brand." },
              {
                step: "03",
                title: "Development",
                description: "Build your website using modern technologies and best practices.",
              },
              {
                step: "04",
                title: "Testing",
                description: "Rigorous testing across devices and browsers to ensure quality.",
              },
              {
                step: "05",
                title: "Launch",
                description: "Deploy your website and provide training on how to manage it.",
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

      {/* Related Services Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Related Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link
              href="/services/digital-marketing"
              className="group p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-pink-600 transition-colors">
                Digital Marketing
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Boost your brand with targeted SEO and effective online campaigns.
              </p>
              <span className="text-pink-600 text-sm font-medium inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/services/ecommerce"
              className="group p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                E-Commerce Solutions
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Tailored e-commerce websites to enhance your online sales.
              </p>
              <span className="text-purple-600 text-sm font-medium inline-flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group p-6 rounded-xl bg-gradient-to-br from-pink-500 to-blue-600 text-white hover:shadow-lg transition-all hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">View All Services</h3>
              <p className="text-white/90 text-sm mb-4">Explore our complete range of digital solutions.</p>
              <span className="text-white text-sm font-medium inline-flex items-center">
                See All <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Website?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's create a stunning website that helps your business grow and succeed online.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
