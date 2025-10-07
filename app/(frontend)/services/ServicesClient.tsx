"use client"

import dynamic from "next/dynamic"

// Dynamically import client-only components
const Services = dynamic(() => import("@/components/ServicesPage"), { ssr: false })
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false })
// Removed ContactForm from here as it belongs to the contact page

export default function ClientServicesPage() {
  return (
    <main>
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}
