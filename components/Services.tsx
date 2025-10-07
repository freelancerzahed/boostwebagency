"use client"

import { useState } from "react"
import { Globe, TrendingUp, ShoppingCart, Users, Facebook, Palette, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/autoplay"

const services = [
  {
    id: "web-dev",
    icon: Globe,
    title: "Web Development",
    description: "Custom website design and development to create a strong online presence.",
    color: "from-blue-500 to-cyan-500",
    features: ["Responsive Design", "Fast Loading", "SEO Optimized"],
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategies to boost your brand through targeted SEO and effective online campaigns.",
    color: "from-pink-500 to-rose-500",
    features: ["SEO Strategy", "Content Marketing", "Analytics"],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Tailored e-commerce websites to enhance your online sales and customer experience.",
    color: "from-purple-500 to-indigo-500",
    features: ["Online Store", "Payment Gateway", "Inventory"],
  },
  {
    id: "lead-gen",
    icon: Users,
    title: "Lead Generation",
    description: "Effective techniques to attract and convert potential customers into leads.",
    color: "from-green-500 to-emerald-500",
    features: ["Landing Pages", "Lead Magnets", "Conversion"],
  },
  {
    id: "facebook-ads",
    icon: Facebook,
    title: "Facebook Boosting",
    description: "Optimize your social media presence with targeted Facebook advertising.",
    color: "from-blue-600 to-blue-700",
    features: ["Ad Campaigns", "Targeting", "ROI Tracking"],
  },
  {
    id: "logo-design",
    icon: Palette,
    title: "Logo Design",
    description: "Professional logo creation to establish and strengthen your brand identity.",
    color: "from-orange-500 to-red-500",
    features: ["Brand Identity", "Logo Design", "Guidelines"],
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState("digital-marketing")

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-background transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 dark:bg-pink-800/20 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>OUR SERVICES</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Expert Digital Solutions
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
              for Your Business
            </span>
          </h2>
        </div>

        {/* Services Grid (Desktop) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            const isActive = activeService === service.id

            return (
              <div
                key={service.id}
                className={`group relative p-6 md:p-8 rounded-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  isActive
                    ? "bg-white dark:bg-muted shadow-2xl scale-105 ring-2 ring-pink-500/20"
                    : "bg-white dark:bg-muted hover:shadow-xl shadow-lg"
                }`}
                onTouchStart={() => setActiveService(service.id)}
                onMouseEnter={() => setActiveService(service.id)}
              >
                {/* Background Hover Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 to-blue-600 transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-200 text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full transition-all duration-300 bg-gradient-to-r from-pink-500 to-blue-600 text-white hover:shadow-lg"
                >
                  <span className="text-sm md:text-base">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl"></div>
              </div>
            )
          })}
        </div>

        {/* Services Slider (Mobile) */}
        <div className="block py-3 md:hidden">
          <Swiper
            slidesPerView={2.5} // Adjusted for better mobile visibility
            spaceBetween={16}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <SwiperSlide key={service.id} className="!w-auto mb-5">
                  <Link
                    href="/contact"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-muted shadow-md hover:shadow-lg transition-all duration-300 touch-scale text-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 mb-1`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-xs whitespace-nowrap">
                      {service.title}
                    </span>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-blue-600 p-6 md:p-8 rounded-3xl text-white dark:text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-white/90 dark:text-white/80 mb-6 text-sm md:text-base max-w-xl mx-auto">
              Let's discuss your project and create a solution that drives results.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-pink-600 dark:bg-gray-900 dark:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
