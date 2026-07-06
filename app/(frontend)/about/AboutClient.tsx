"use client"

import dynamic from "next/dynamic"
import About from "@/components/About"
import AboutSchemaMarkup from "./AboutSchemaMarkup"

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false })

export default function AboutClient() {
  return (
    <>
      <AboutSchemaMarkup />
      <About />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}
