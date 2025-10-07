"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { getTestimonials } from "@/services/testimonialService"
import type { Testimonial } from "@/types/testimonial"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (err) {
        setError("Failed to load testimonials.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">{children}</div>
    </section>
  )

  if (loading) {
    return (
      <SectionWrapper>
        <div className="text-center">
          <p className="text-pink-500 font-semibold mb-4 uppercase tracking-wide text-sm">TESTIMONIALS</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4">
            See What Our Clients Say
          </h2>
          <div className="flex justify-center items-center h-32 md:h-48">
            <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 px-4">Loading testimonials...</p>
        </div>
      </SectionWrapper>
    )
  }

  if (error) {
    return (
      <SectionWrapper>
        <div className="text-center">
          <p className="text-pink-500 font-semibold mb-4 uppercase tracking-wide text-sm">TESTIMONIALS</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4">
            See What Our Clients Say
          </h2>
          <div className="text-red-500 dark:text-red-400 text-base md:text-lg px-4">{error}</div>
        </div>
      </SectionWrapper>
    )
  }

  if (testimonials.length === 0) {
    return (
      <SectionWrapper>
        <div className="text-center">
          <p className="text-pink-500 font-semibold mb-4 uppercase tracking-wide text-sm">TESTIMONIALS</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4">
            See What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 px-4">No testimonials available at the moment.</p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <div className="text-center mb-8 md:mb-16">
        <p className="text-pink-500 font-semibold mb-4 uppercase tracking-wide text-sm">TESTIMONIALS</p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4">
          See What Our Clients Say
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            enabled: true,
            hideOnClick: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={testimonials.length > 1}
          className="pb-12 testimonials-swiper"
          breakpoints={{
            640: {
              spaceBetween: 20,
            },
            768: {
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="mx-2 md:mx-4">
                <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl dark:shadow-lg p-4 md:p-8 lg:p-12 relative transition-colors duration-300 overflow-hidden">
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 text-3xl md:text-6xl text-pink-100 dark:text-pink-900 font-serif select-none">
                    "
                  </div>

                  <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 text-center">
                    {/* Client Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32">
                        <Image
                          src={testimonial.image || "/placeholder.svg?height=128&width=128&query=professional headshot"}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
                        />
                        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 w-full max-w-3xl">
                      <div className="flex justify-center mb-3 md:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg leading-relaxed mb-4 md:mb-6 break-words hyphens-auto">
                        {testimonial.content}
                      </p>

                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words">
                          {testimonial.name}
                        </h4>
                        <p className="text-pink-500 font-medium text-sm md:text-base break-words">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #ec4899;
          width: 32px;
          height: 32px;
        }
        
        @media (max-width: 768px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            width: 24px;
            height: 24px;
            margin-top: -12px;
          }
          
          .testimonials-swiper .swiper-button-next:after,
          .testimonials-swiper .swiper-button-prev:after {
            font-size: 14px;
          }
        }
        
        .testimonials-swiper .swiper-pagination-bullet {
          background: #ec4899;
          opacity: 0.3;
        }
        
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        
        .testimonials-swiper {
          overflow: visible;
        }
        
        .testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </SectionWrapper>
  )
}
