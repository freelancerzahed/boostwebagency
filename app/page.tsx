import { Suspense } from "react"
import dynamic from "next/dynamic"

// Lazy load components with loading fallbacks
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />,
  ssr: true,
})

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="py-20 bg-gray-50" />,
  ssr: true,
})

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="py-20" />,
  ssr: true,
})

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => <div className="py-20" />,
  ssr: true,
})

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="py-20 bg-gray-50" />,
  ssr: true,
})

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-20" />,
  ssr: true,
})

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="py-20 bg-gray-50" />,
  ssr: true,
})

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-gray-50" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-gray-50" />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-gray-50" />}>
        <ContactForm />
      </Suspense>
    </main>
  )
}