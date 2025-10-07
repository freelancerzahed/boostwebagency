"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getTeamMembers } from "@/services/teamService"
import type { TeamMember } from "@/types/team-member"
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
  MapPin,
  Calendar,
  Award,
  Users,
  X,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamClientPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        const data = await getTeamMembers()
        setTeamMembers(data)
      } catch (err) {
        setError("Failed to load team members.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  const getSocialIcon = (platform: string) => {
    const iconProps = { className: "w-4 h-4 md:w-5 md:h-5" }
    switch (platform) {
      case "linkedin":
        return <Linkedin {...iconProps} />
      case "twitter":
        return <Twitter {...iconProps} />
      case "facebook":
        return <Facebook {...iconProps} />
      case "instagram":
        return <Instagram {...iconProps} />
      case "github":
        return <Github {...iconProps} />
      default:
        return null
    }
  }

  const departments = ["all", "leadership", "development", "design", "marketing"]

  const getDepartment = (position: string) => {
    if (position.toLowerCase().includes("ceo") || position.toLowerCase().includes("chief")) return "leadership"
    if (position.toLowerCase().includes("developer") || position.toLowerCase().includes("engineer"))
      return "development"
    if (position.toLowerCase().includes("designer") || position.toLowerCase().includes("creative")) return "design"
    return "marketing"
  }

  const filteredMembers =
    filter === "all" ? teamMembers : teamMembers.filter((member) => getDepartment(member.position) === filter)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="relative mx-auto">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-2 animate-pulse"></div>
          </div>
          <p className="text-gray-600 font-medium text-sm md:text-base">Loading our amazing team...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
        <div className="text-center space-y-4 p-6 max-w-sm">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <X className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
          <p className="text-red-600 text-base md:text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Background Elements - Smaller for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="text-center text-white space-y-4 md:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span>Meet Our Team</span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold leading-tight">
              The Creative Minds
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Behind Our Success
              </span>
            </h1>

            <p className="text-base md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              Meet the passionate professionals who bring innovation, creativity, and expertise to every project we
              undertake.
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 pt-4 md:pt-8 px-4">
              <div className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <Award className="w-3 h-3 md:w-5 md:h-5 text-yellow-300" />
                <span className="text-xs md:text-sm font-medium">Award Winning</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <MapPin className="w-3 h-3 md:w-5 md:h-5 text-green-300" />
                <span className="text-xs md:text-sm font-medium">Global Team</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2">
                <Calendar className="w-3 h-3 md:w-5 md:h-5 text-blue-300" />
                <span className="text-xs md:text-sm font-medium">10+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section - Mobile Optimized with Dropdown */}
      <section className="py-6 md:py-12 bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          {/* Mobile Dropdown Filter */}
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/80 rounded-lg font-medium text-gray-700 shadow-sm"
            >
              <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {showFilters && (
              <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setFilter(dept)
                      setShowFilters(false)
                    }}
                    className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                      filter === dept
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === dept
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid - Mobile Optimized */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600 text-sm md:text-base">Try selecting a different department filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredMembers.map((member, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardContent className="p-0">
                    {/* Image Section - Mobile Optimized */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg?height=400&width=400&query=professional headshot"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Social Links Overlay - Mobile Optimized */}
                      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex justify-center space-x-2 md:space-x-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        {Object.entries(member.social ?? {}).map(
                          ([platform, url]) =>
                            url && (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {getSocialIcon(platform)}
                              </a>
                            ),
                        )}
                        <a
                          href={`mailto:${member.name.toLowerCase().replace(" ", ".")}@company.com`}
                          className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      </div>

                      {/* Department Badge - Mobile Optimized */}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4">
                        <span className="px-2 py-1 md:px-3 md:py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                          {getDepartment(member.position)}
                        </span>
                      </div>
                    </div>

                    {/* Content Section - Mobile Optimized */}
                    <div className="p-4 md:p-8 space-y-3 md:space-y-4">
                      <div className="space-y-1 md:space-y-2">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {member.position}
                        </p>
                      </div>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm md:text-base">{member.bio}</p>

                      <div className="pt-2 md:pt-4">
                        <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300 flex items-center space-x-2 group/btn text-sm md:text-base">
                          <span>View Profile</span>
                          <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover/btn:bg-purple-100 transition-colors duration-300">
                            <span className="text-xs">→</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Member Detail Modal - Mobile Optimized */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close Button - Mobile Optimized */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Header - Mobile Optimized */}
              <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-t-2xl md:rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                  <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{selectedMember.name}</h2>
                  <p className="text-sm md:text-xl text-blue-100">{selectedMember.position}</p>
                </div>
              </div>

              {/* Content - Mobile Optimized */}
              <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedMember.image || "/placeholder.svg?height=80&width=80&query=professional headshot"}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">{selectedMember.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base truncate">{selectedMember.position}</p>
                    <div className="flex space-x-1 md:space-x-2 mt-2">
                      {Object.entries(selectedMember.social ?? {}).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                              {getSocialIcon(platform)}
                            </a>
                          ),
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">About</h4>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{selectedMember.bio}</p>
                </div>

                <div>
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Contact</h4>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${selectedMember.name.toLowerCase().replace(" ", ".")}@company.com`}
                      className="flex items-center space-x-2 md:space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm md:text-base break-all"
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span>{selectedMember.name.toLowerCase().replace(" ", ".")}@company.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
