"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { getTestimonials } from "@/services/testimonialService"
import type { Testimonial } from "@/types/testimonial"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

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
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200/20 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">{children}</div>
    </section>
  )

  if (loading) {
    return (
      <SectionWrapper>
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full uppercase tracking-wide text-xs shadow-lg">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4 text-balance">
            See What Our Clients Say
          </h2>
          <div className="flex justify-center items-center h-48">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-pink-200 dark:border-pink-900 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 px-4 animate-pulse">Loading testimonials...</p>
        </div>
      </SectionWrapper>
    )
  }

  if (error) {
    return (
      <SectionWrapper>
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full uppercase tracking-wide text-xs shadow-lg">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4 text-balance">
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
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full uppercase tracking-wide text-xs shadow-lg">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 px-4 text-balance">
            See What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 px-4">No testimonials available at the moment.</p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <div className="text-center mb-12 md:mb-20">
        <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-full uppercase tracking-wide text-xs shadow-lg animate-fade-in">
          TESTIMONIALS
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 px-4 text-balance leading-tight">
          See What Our Clients Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto px-4 text-pretty">
          Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-2 md:px-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            enabled: true,
            hideOnClick: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            enabled: true,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={testimonials.length > 1}
          className="pb-12 md:pb-16 testimonials-swiper"
          breakpoints={{
            640: {
              spaceBetween: 24,
            },
            768: {
              spaceBetween: 32,
            },
            1024: {
              spaceBetween: 40,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="mx-0 md:mx-4 lg:mx-8">
                <div className="group bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-pink-500/10 p-6 md:p-12 lg:p-16 relative transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-pink-200 dark:hover:border-pink-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 via-transparent to-blue-50/0 dark:from-pink-950/0 dark:to-blue-950/0 group-hover:from-pink-50/50 group-hover:to-blue-50/50 dark:group-hover:from-pink-950/20 dark:group-hover:to-blue-950/20 transition-all duration-500 pointer-events-none"></div>

                  <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-500">
                    <Quote className="w-16 h-16 md:w-24 md:h-24 text-pink-500" strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 text-center">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-br from-pink-500 via-pink-400 to-blue-500 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                          <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
                            <Image
                              src={
                                testimonial.image || "/placeholder.svg?height=128&width=128&query=professional headshot"
                              }
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                            />
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 w-full max-w-3xl">
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-300"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed mb-8 text-pretty font-light italic">
                        "{testimonial.content}"
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-balance">
                          {testimonial.name}
                        </h4>
                        <p className="text-pink-600 dark:text-pink-400 font-semibold text-sm md:text-base">
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #ec4899;
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .testimonials-swiper .swiper-button-next:hover,
        .testimonials-swiper .swiper-button-prev:hover {
          background: #ec4899;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
        }
        
        .dark .testimonials-swiper .swiper-button-next,
        .dark .testimonials-swiper .swiper-button-prev {
          background: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .dark .testimonials-swiper .swiper-button-next:hover,
        .dark .testimonials-swiper .swiper-button-prev:hover {
          background: #ec4899;
        }
        
        @media (max-width: 768px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: none;
          }
          
          .testimonials-swiper .swiper-pagination {
            display: none;
          }
        }
        
        @media (min-width: 769px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: flex;
          }
        }
        
        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #ec4899;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
          background: linear-gradient(to right, #ec4899, #db2777);
        }
        
        /* Fixed overflow issues by ensuring proper containment */
        .testimonials-swiper {
          overflow: hidden;
          width: 100%;
        }
        
        .testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
        
        .testimonials-swiper .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }
        
        .testimonials-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </SectionWrapper>
  )
}
