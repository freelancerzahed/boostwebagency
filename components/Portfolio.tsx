"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { FreeMode } from "swiper/modules"

const categories = [
  { id: "all", name: "All" },
  { id: "web-development", name: "Web Development" },
  { id: "digital-marketing", name: "Digital Marketing" },
  { id: "ecommerce", name: "E-Commerce" },
  { id: "logo-design", name: "Logo Design" },
  { id: "mobile-apps", name: "Mobile Apps" },
  { id: "ui-ux-design", name: "UI/UX Design" },
]

const projects = [
  {
    id: 1,
    title: "E-commerce Website - Selia",
    category: ["web-development", "ecommerce"],
    description: "Modern e-commerce platform with seamless shopping experience and secure payment integration",
    image: "/portfolio/modern-ecommerce-website-shopping-online-store.jpg",
    link: "https://selia.ma/",
  },
  {
    id: 2,
    title: "Digital Marketing Campaign",
    category: ["digital-marketing"],
    description: "Comprehensive digital marketing strategy driving 300% increase in engagement",
    image: "/portfolio/digital-marketing-social-media-campaign-analytics.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Corporate Website",
    category: ["web-development"],
    description: "Professional corporate website with modern design and optimized performance",
    image: "/portfolio/professional-corporate-business-website-design.jpg",
    link: "https://timesdigitalbd.com/",
  },
  {
    id: 4,
    title: "Brand Identity Design",
    category: ["logo-design"],
    description: "Complete brand identity package including logo, color palette, and brand guidelines",
    image: "/portfolio/modern-logo-design-brand-identity-creative.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "E-commerce Platform",
    category: ["web-development", "ecommerce"],
    description: "Full-featured online marketplace with vendor management and advanced analytics",
    image: "/portfolio/ecommerce-platform-online-marketplace-shopping-car.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Social Media Campaign",
    category: ["digital-marketing"],
    description: "Multi-platform social media strategy with viral content and influencer partnerships",
    image: "/portfolio/social-media-marketing-instagram-facebook-campaign.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Mobile App Development",
    category: ["web-development", "mobile-apps"],
    description: "Cross-platform mobile application with intuitive UI and real-time features",
    image: "/portfolio/mobile-app-development.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "SEO Optimization",
    category: ["digital-marketing"],
    description: "Complete SEO overhaul resulting in first-page rankings for key search terms",
    image: "/portfolio/seo-optimization-search-engine-ranking-analytics.jpg",
    link: "#",
  },
  {
    id: 9,
    title: "Custom Software Solution",
    category: ["web-development"],
    description: "Tailored enterprise software solution streamlining business operations",
    image: "/portfolio/custom-software-dashboard.png",
    link: "#",
  },
  {
    id: 10,
    title: "User Interface Redesign",
    category: ["ui-ux-design"],
    description: "Complete UI/UX redesign improving user satisfaction by 85%",
    image: "/portfolio/ui-ux-design-user-interface-modern-app-design.jpg",
    link: "#",
  },
]

const PROJECTS_PER_LOAD = 6

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(PROJECTS_PER_LOAD)
  const [isMobile, setIsMobile] = useState(false)

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category.includes(activeCategory),
  )

  const projectsToDisplay = filteredProjects.slice(0, visibleProjectsCount)
  const hasMoreProjects = visibleProjectsCount < filteredProjects.length

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setVisibleProjectsCount(PROJECTS_PER_LOAD)
  }, [activeCategory])

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-pink-500 dark:text-pink-400 font-semibold uppercase tracking-widest mb-3 text-sm">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Take A Look At Our Latest Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio of successful projects across web development, digital marketing, and design
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10">
          {isMobile ? (
            <Swiper
              key="mobile"
              slidesPerView="auto"
              spaceBetween={12}
              freeMode
              modules={[FreeMode]}
              className="-mx-4 px-4"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id} className="!w-auto">
                  <Button
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-5 py-2 my-2 text-sm rounded-full transition-all duration-200 font-medium whitespace-nowrap",
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/70",
                    )}
                  >
                    {cat.name}
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center flex-wrap gap-3 px-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-muted text-muted-foreground hover:bg-muted/70 hover:scale-105",
                  )}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-pink-500 rounded-full" />
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsToDisplay.map((project, index) => (
            <Card
              key={project.id}
              className="group rounded-2xl overflow-hidden border-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium opacity-90">{project.description}</p>
                  </div>
                </div>
                {/* View icon on hover */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                  <ExternalLink className="w-5 h-5 text-pink-500" />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={project.link} target="_blank" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full group/btn flex items-center justify-center border-2 border-pink-500/50 dark:border-pink-400/50 text-pink-600 dark:text-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-300 bg-transparent"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreProjects && (
          <div className="text-center mt-12 sm:mt-16">
            <Button
              onClick={() => setVisibleProjectsCount((prev) => prev + PROJECTS_PER_LOAD)}
              className="px-10 py-6 text-base font-semibold rounded-full bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Show More Projects
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
