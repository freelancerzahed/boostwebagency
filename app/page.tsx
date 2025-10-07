import { Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoadingBar from "@/components/LoadingBar"
import GoToTop from "@/components/GoToTop"
import MobileBottomNav from "@/components/MobileBottomNav"

// Lazy load components with loading fallbacks
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse" />,
})

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse" />,
})

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="py-20 animate-pulse" />,
})

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => <div className="py-20 animate-pulse" />,
})

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse" />,
})

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-20 animate-pulse" />,
})

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse" />,
})

export default function HomePage() {
  return (
    <>
      <LoadingBar />
      <Header />
      <main className="pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+4rem)] lg:pb-0">
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
      <Footer />
      <GoToTop />
      <MobileBottomNav />
    </>
  )
}
