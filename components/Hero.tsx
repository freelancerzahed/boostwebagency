"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Play,
  Star,
  Rocket,
  Lightbulb,
  BarChart2,
  Target,
  TrendingUp,
  Globe,
  Users,
  Sparkles,
  Award,
} from "lucide-react"

// Lazy load heavy components
const VideoModal = dynamic(() => import("./VideoModal"), {
  loading: () => null,
  ssr: false,
})

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [currentStat, setCurrentStat] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)

    // Auto-rotate stats
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const openVideoModal = useCallback(() => setShowVideoModal(true), [])
  const closeVideoModal = useCallback(() => {
    setShowVideoModal(false)
    setIsVideoMuted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showVideoModal) closeVideoModal()
    }

    if (showVideoModal) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [showVideoModal, closeVideoModal])

  const stats = [
    {
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      number: "500+",
      label: "Happy Clients",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      number: "300%",
      label: "ROI Boost",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <Award className="w-4 h-4 md:w-5 md:h-5" />,
      number: "24/7",
      label: "Support",
      color: "from-purple-400 to-pink-500",
    },
  ]

  const floatingElements = [
    {
      icon: <Star className="w-3 h-3 md:w-4 md:h-4" />,
      position: { top: "15%", left: "8%" },
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      delay: "0s",
      duration: "8s",
    },
    {
      icon: <Globe className="w-3 h-3 md:w-4 md:h-4" />,
      position: { top: "25%", right: "12%" },
      color: "bg-gradient-to-r from-blue-400 to-cyan-500",
      delay: "1s",
      duration: "10s",
    },
    {
      icon: <Rocket className="w-3 h-3 md:w-4 md:h-4" />,
      position: { bottom: "30%", left: "15%" },
      color: "bg-gradient-to-r from-pink-400 to-rose-500",
      delay: "2s",
      duration: "9s",
    },
    {
      icon: <BarChart2 className="w-3 h-3 md:w-4 md:h-4" />,
      position: { bottom: "35%", right: "8%" },
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
      delay: "0.5s",
      duration: "11s",
    },
    {
      icon: <Target className="w-3 h-3 md:w-4 md:h-4" />,
      position: { top: "45%", left: "3%" },
      color: "bg-gradient-to-r from-purple-400 to-violet-500",
      delay: "1.5s",
      duration: "7s",
    },
    {
      icon: <Lightbulb className="w-3 h-3 md:w-4 md:h-4" />,
      position: { top: "65%", right: "5%" },
      color: "bg-gradient-to-r from-amber-400 to-yellow-500",
      delay: "3s",
      duration: "8s",
    },
  ]

  return (
    <section
      ref={heroRef}
      className="relative py-2 flex flex-col justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 text-white overflow-hidden animate-gradient-shift"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-purple-600/25 to-pink-600/15 dark:from-indigo-500/8 dark:via-purple-500/15 dark:to-pink-500/8"></div>

        {/* Secondary radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.05),transparent_50%)]"></div>

        {/* Interactive mouse follower - Desktop only */}
        <div
          className="absolute w-80 h-80 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/8 via-purple-400/12 to-pink-400/8 dark:from-blue-300/4 dark:via-purple-300/8 dark:to-pink-300/4 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none hidden md:block"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Subtle animated grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
        </div>
      </div>

      {/* Optimized Floating Elements - Desktop only */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute w-8 h-8 md:w-12 md:h-12 ${element.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl animate-float-custom backdrop-blur-sm border border-white/15 dark:border-white/8 hidden md:flex opacity-80`}
          style={{
            ...element.position,
            animationDelay: element.delay,
            animationDuration: element.duration,
          }}
        >
          {element.icon}
        </div>
      ))}

      {/* Main Content - Improved Layout */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-0 md:py-safe">
        <div className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-4xl lg:max-w-6xl">
          {/* Enhanced Hero Badge */}
          <div className="text-center mb-5 md:mb-7 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/8 dark:bg-white/4 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-xs md:text-sm font-semibold shadow-lg">
              <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-white/95 dark:text-white/90">🚀 #1 Web Agency 2024</span>
            </div>
          </div>

          {/* Improved Main Headline */}
          <div className="text-center mb-7 md:mb-9 animate-fadeInUp animate-stagger-mobile-1">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-5 md:mb-6 text-white tracking-tight">
              <span className="block mb-1">We Don't Just Build</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 dark:from-yellow-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                We Engineer Success
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 dark:text-white/75 font-medium max-w-xs sm:max-w-sm md:max-w-2xl mx-auto leading-relaxed">
              Transform your vision into a profit-generating digital powerhouse that dominates your competition.
            </p>
          </div>

          {/* Combined Stats and ROI Section - Mobile stacked, Desktop side by side */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-7 md:mb-9 animate-fadeInUp animate-stagger-mobile-2">
            {/* Enhanced Rotating Stats */}
            <div className="bg-white/8 dark:bg-white/4 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-white/15 dark:border-white/8 w-full max-w-xs md:max-w-sm transition-all duration-500 shadow-xl">
              <div className="flex items-center justify-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stats[currentStat].color} shadow-lg`}>
                  {stats[currentStat].icon}
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1">
                    {stats[currentStat].number}
                  </div>
                  <div className="text-xs md:text-sm text-white/75 dark:text-white/65 font-medium">
                    {stats[currentStat].label}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced ROI Circle - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex justify-center">
              <div className="relative group cursor-pointer">
                {/* Outer glow effect */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse"></div>

                {/* Enhanced rotating rings with different speeds and colors */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-2 border-2 border-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-full animate-spin-slow shadow-lg"></div>
                  <div className="absolute inset-3 border-2 border-gradient-to-r from-blue-400/25 to-purple-400/25 rounded-full animate-spin-reverse shadow-md"></div>
                  <div className="absolute inset-4 border border-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-5 border border-white/15 dark:border-white/8 rounded-full animate-spin-reverse"></div>
                  <div className="absolute inset-6 border border-white/10 dark:border-white/5 rounded-full animate-spin-slow"></div>
                </div>

                {/* Floating particles around the circle */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-ping opacity-60"
                      style={{
                        top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced center content with better animations */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white/15 via-emerald-400/5 to-blue-400/5 dark:from-white/8 dark:via-emerald-400/3 dark:to-blue-400/3 backdrop-blur-xl rounded-full flex flex-col items-center justify-center border-2 border-white/20 dark:border-white/10 hover:scale-110 hover:border-emerald-400/40 transition-all duration-700 shadow-2xl group-hover:shadow-emerald-400/20">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-blue-400/0 to-purple-400/0 group-hover:from-emerald-400/10 group-hover:via-blue-400/10 group-hover:to-purple-400/10 rounded-full transition-all duration-700"></div>

                  {/* Main icon with enhanced animation */}
                  <div className="relative z-10 mb-2 transform group-hover:scale-125 transition-all duration-500">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 dark:text-emerald-500 drop-shadow-lg animate-bounce-subtle" />

                    {/* Icon glow effect */}
                    <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-emerald-400/30 blur-md rounded-full group-hover:bg-emerald-400/50 transition-all duration-500"></div>
                  </div>

                  {/* Enhanced text with animations */}
                  <div className="relative z-10 text-center">
                    <span className="text-lg md:text-xl font-black text-white mb-1 block transform group-hover:scale-110 transition-all duration-300 drop-shadow-sm">
                      ROI
                    </span>
                    <span className="text-xs text-white/75 dark:text-white/65 font-medium transform group-hover:text-emerald-300 transition-all duration-300">
                      Guaranteed
                    </span>
                  </div>

                  {/* Pulsing inner ring */}
                  <div className="absolute inset-6 border border-emerald-400/20 rounded-full animate-pulse group-hover:border-emerald-400/40 transition-all duration-500"></div>

                  {/* Success indicators */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Percentage indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 shadow-lg">
                    300%+
                  </div>
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-emerald-400/0 group-hover:border-emerald-400/30 group-hover:scale-125 transition-all duration-1000 pointer-events-none"></div>
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full border border-blue-400/0 group-hover:border-blue-400/20 group-hover:scale-150 transition-all duration-1500 delay-200 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Improved CTA Buttons */}
          <div className="flex flex-col gap-3 justify-center items-center mb-7 md:mb-9 animate-fadeInUp animate-stagger-mobile-3">
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-md md:max-w-lg">
              <Link
                href="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 dark:from-pink-600 dark:to-blue-700 dark:hover:from-pink-700 dark:hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex-1 text-center active:scale-95 touch-manipulation shadow-lg animate-button-pulse"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm md:text-base">
                  Start Your Success Story
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 dark:from-blue-700 dark:to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button
                onClick={openVideoModal}
                className="group flex items-center justify-center gap-3 bg-white/8 dark:bg-white/4 backdrop-blur-xl hover:bg-white/15 dark:hover:bg-white/8 text-white font-semibold py-4 px-6 rounded-2xl border border-white/20 dark:border-white/15 hover:border-white/40 dark:hover:border-white/25 transition-all duration-300 flex-1 active:scale-95 touch-manipulation shadow-lg"
              >
                <div className="w-8 h-8 bg-white/15 dark:bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/25 dark:group-hover:bg-white/15 transition-colors animate-pulse-ring">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <span className="text-sm md:text-base">Watch Success Stories</span>
              </button>
            </div>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-6 animate-fadeInUp animate-stagger-mobile-4 mb-6 md:mb-8">
            {[
              { icon: "⚡", text: "Lightning Fast", color: "from-yellow-400 to-orange-500" },
              { icon: "🎯", text: "Results Driven", color: "from-blue-400 to-indigo-500" },
              { icon: "🛡️", text: "100% Secure", color: "from-green-400 to-emerald-500" },
              { icon: "📱", text: "Mobile First", color: "from-purple-400 to-pink-500" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/6 dark:bg-white/3 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-full border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/6 transition-all duration-300 shadow-sm"
              >
                <span className="text-sm md:text-base">{item.icon}</span>
                <span className="text-xs md:text-sm font-medium text-white/90 dark:text-white/80 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Video Modal */}
      {showVideoModal && (
        <VideoModal isVideoMuted={isVideoMuted} setIsVideoMuted={setIsVideoMuted} closeVideoModal={closeVideoModal} />
      )}

      <style jsx>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0px rgba(255, 255, 255, 0);
          }
        }

        .animate-pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        @keyframes button-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 8px 25px rgba(236, 72, 153, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          }
        }

        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
