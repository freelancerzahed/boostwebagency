"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const stats = [
  { number: 100, label: "Satisfied Clients", suffix: "+" },
  { number: 130, label: "Projects Launched", suffix: "+" },
  { number: 7, label: "Years Experience", suffix: "+" },
]

function Counter({ end, duration = 2000, isVisible }: { end: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isVisible])

  return <span>{count}</span>
}

function useIntersectionObserver(ref: React.RefObject<Element>, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 })

  return (
    <section className="py-20 bg-gray-50 dark:bg-background transition-colors duration-500" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-muted p-8 rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop&crop=center"
                alt="Why Choose Us - Team collaboration"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
            {/* Background Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500 to-blue-600 rounded-2xl -z-10 opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -z-10 opacity-20 animate-bounce"></div>
            <div className="absolute top-10 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute bottom-20 -right-8 w-12 h-12 bg-green-400 rounded-full opacity-40 animate-pulse"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div
              className={`transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Our Agency
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-blue-600 mb-6 transform transition-all duration-500 hover:w-32"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Boost Web Agency stands out for our blend of expertise and innovation. We offer customized digital
                solutions tailored to your needs, using the latest technologies to drive growth and enhance your online
                presence. Our dedicated team ensures exceptional results and ongoing support, making us a trusted
                partner in achieving your business goals.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-700 hover:scale-110 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full opacity-10 animate-pulse"></div>

                    <div className="relative text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-2 py-4">
                      <Counter end={stat.number} isVisible={isVisible} duration={2000 + index * 500} />
                      {stat.suffix}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-200 font-medium">{stat.label}</p>

                  <div className="mt-2 h-1 bg-gray-200 dark:bg-muted-foreground/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-blue-600 rounded-full transform transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? "100%" : "0%",
                        transitionDelay: `${index * 300}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
