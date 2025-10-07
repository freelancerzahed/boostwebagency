"use client"

import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Portfolio from "@/components/Portfolio"
import Testimonials from "@/components/Testimonials"
import WhyChooseUs from "@/components/WhyChooseUs"
import ProductsDisplay from "@/components/ProductsDisplay"

export default function HomeClient() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <ProductsDisplay />
      <Testimonials />
      <WhyChooseUs />
    </main>
  )
}
