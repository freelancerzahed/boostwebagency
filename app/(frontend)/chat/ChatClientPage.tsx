"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Upload,
  Send,
  MessageCircle,
  PlusCircle,
  X,
  Loader2,
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  Star,
  Clock,
  Shield,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatClientPage() {
  // State for Contact Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_title: "",
    choose_service: "",
    message: "",
    file: null as File | null,
  })
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State for Chatbot Modal
  const [showChatModal, setShowChatModal] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (showChatModal) {
      scrollToBottom()
    }
  }, [messages, showChatModal, typingText])

  useEffect(() => {
    // Add welcome message when modal opens for the first time
    if (showChatModal && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hello! Welcome to Boost Web Agency! 🚀 I'm your virtual assistant and I'm here to help you with information about our services. You can ask me about:\n\n• Web Development & Design\n• Digital Marketing & SEO\n• E-commerce Solutions\n• Pricing & Packages\n• Contact Information\n\nWhat would you like to know?",
          timestamp: new Date(),
        },
      ])
    }
  }, [showChatModal, messages.length])

  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "assistant",
        content:
          "Hello! Welcome back to Boost Web Agency! 🚀 I'm ready to help you with any questions about our web development, digital marketing, and design services. What can I assist you with today?",
        timestamp: new Date(),
      },
    ])
    setError(null)
    setInput("")
  }

  const typeMessage = async (text: string) => {
    setIsTyping(true)
    setTypingText("")

    const words = text.split(" ")
    let currentText = ""

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i]
      setTypingText(currentText)
      await new Promise((resolve) => setTimeout(resolve, 80))
    }

    // Add the complete message to the messages array
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
    setTypingText("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      })

      const data = await response.json()

      if (data.success) {
        await typeMessage(data.message)
      } else {
        setError("Sorry, I'm having trouble responding right now. Please try again.")
      }
    } catch (error) {
      console.error("Chat error:", error)
      setError("Sorry, I'm having trouble connecting. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      const lastUserMessage = messages[messages.length - 1]
      setInput(lastUserMessage.content)
    }
  }

  // Handlers for Contact Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as string | Blob)
      }
    })

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: data,
      })

      if (response.ok) {
        setStatus("Thank you for your message! We'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          project_title: "",
          choose_service: "",
          message: "",
          file: null,
        })
      } else {
        setStatus("Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        {/* Background Elements - Adjusted for mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 dark:from-pink-500/5 dark:via-purple-500/5 dark:to-blue-500/5"></div>
        <div className="absolute top-10 left-5 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-20 right-5 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 text-pink-600 dark:text-pink-400 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm font-semibold mb-6 sm:mb-8 border border-pink-200/50 dark:border-pink-800/50">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>AI-POWERED CUSTOMER SUPPORT</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              Get Instant Answers with Our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 animate-gradient">
                Smart AI Assistant
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
              Chat with our intelligent assistant to learn about our web development, digital marketing, and design
              services. Get personalized recommendations instantly!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
              <Button
                onClick={() => setShowChatModal(true)}
                className="group relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white px-8 py-4 sm:px-10 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
                Start Free Chat Now
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-700 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Button>

              <div className="flex items-center space-x-3 sm:space-x-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="font-medium">24/7 Available</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="font-medium">100% Free</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Globe, label: "Websites Built", value: "500+" },
                { icon: TrendingUp, label: "Growth Rate", value: "200%" },
                { icon: Star, label: "Client Rating", value: "4.9/5" },
                { icon: Award, label: "Years Experience", value: "5+" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Enhanced Info */}
            <div className="space-y-8 sm:space-y-10">
              {/* Why Choose Our Chat */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 dark:border-gray-800/20">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 flex items-center">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 mr-2 sm:mr-3" />
                  Why Chat With Us?
                </h2>

                <div className="grid gap-5 sm:gap-6">
                  {[
                    {
                      icon: MessageCircle,
                      title: "Instant Responses",
                      desc: "Get immediate answers to all your questions about our services",
                    },
                    {
                      icon: Sparkles,
                      title: "Smart Recommendations",
                      desc: "Receive personalized suggestions based on your business needs",
                    },
                    {
                      icon: Clock,
                      title: "24/7 Availability",
                      desc: "Our AI assistant is always ready to help, day or night",
                    },
                    { icon: Shield, title: "No Commitment", desc: "Chat freely without any pressure or obligations" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 sm:space-x-4 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-lg sm:text-xl">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-5 sm:gap-6">
                {/* Phone */}
                <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-pink-200/30 dark:border-pink-800/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-base sm:text-lg">
                        Call Us Directly
                      </p>
                      <div className="space-y-0.5 sm:space-y-1">
                        <a
                          href="tel:+8801603108425"
                          className="block text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm sm:text-base"
                        >
                          +880 1603-108425
                        </a>
                        <a
                          href="tel:+8801869731202"
                          className="block text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm sm:text-base"
                        >
                          +880 1869-731202
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-200/30 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-base sm:text-lg">
                        Email Us
                      </p>
                      <a
                        href="mailto:boostwebagency.info@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                      >
                        boostwebagency.info@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-green-200/30 dark:border-green-800/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-base sm:text-lg">
                        Visit Our Office
                      </p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Form */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/20 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-10 -translate-x-10 sm:translate-y-12 sm:-translate-x-12"></div>

              <div className="relative z-10">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Get Your FREE Digital Marketing Proposal
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 text-sm sm:text-base">
                    Fill out the form below and we'll create a custom strategy for your business within 24 hours.
                  </p>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full" />
                </div>

                <form onSubmit={handleContactFormSubmit} className="space-y-5 sm:space-y-6">
                  {/* Name, Email, Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["name", "email", "phone"].map((field) => (
                      <div key={field} className="relative">
                        <input
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          name={field}
                          value={formData[field as keyof typeof formData] as string}
                          onChange={handleChange}
                          placeholder={
                            field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"
                          }
                          required
                          className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-pink-500 dark:focus:border-pink-400 focus:ring-0 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Project + Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="project_title"
                      value={formData.project_title}
                      onChange={handleChange}
                      placeholder="Website or FB link"
                      className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-pink-500 dark:focus:border-pink-400 focus:ring-0 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                    />
                    <select
                      name="choose_service"
                      value={formData.choose_service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-pink-500 dark:focus:border-pink-400 focus:ring-0 outline-none transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="">Choose Service</option>
                      <option value="web-development">Web Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ecommerce">E-Commerce Solutions</option>
                      <option value="logo-design">Logo Design</option>
                    </select>
                  </div>

                  {/* File Upload */}
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-between px-4 py-3 sm:py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl cursor-pointer hover:border-pink-500 dark:hover:border-pink-400 transition-all duration-300 group text-sm sm:text-base"
                  >
                    <span
                      className={`${formData.file ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"} group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors`}
                    >
                      {formData.file ? formData.file.name : "Choose file (optional)"}
                    </span>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 group-hover:text-pink-500 transition-colors" />
                    <input type="file" name="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                  </label>

                  {/* Message */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project goals and requirements..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:border-pink-500 dark:focus:border-pink-400 focus:ring-0 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                  />

                  {/* Status */}
                  {status && (
                    <div
                      className={`p-4 rounded-xl border text-sm sm:text-base ${
                        status.includes("Thank you")
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {status}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white px-6 py-4 sm:px-8 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 sm:space-x-3 group transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Your Proposal...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Get My FREE Proposal</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    🔒 Your information is secure and will never be shared
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* Chatbot Modal */}
{/* Chatbot Modal */}
<div className={`fixed inset-0 z-[999] ${showChatModal ? 'flex' : 'hidden'} items-center justify-center`}>
  {/* Backdrop - Click to close on mobile */}
  <div 
    className="fixed inset-0 bg-black/50 sm:bg-transparent sm:pointer-events-none"
    onClick={() => setShowChatModal(false)}
  />
  
  {/* Chat Container */}
  <div className={
    `relative flex flex-col bg-white dark:bg-gray-950 shadow-xl sm:rounded-3xl
    w-full h-full sm:w-[500px] sm:h-[90vh] md:w-[700px] 
    overflow-hidden z-[1000]`
  }>
    {/* Header */}
    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 flex-shrink-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Boost Web Assistant</h2>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                🟢 Online
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                FREE
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleNewChat}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="New Chat"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowChatModal(false)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    {/* Chat Messages Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
      {messages.length === 0 && !isLoading && (
        <div className="h-full flex flex-col items-center justify-center text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Boost Web!
          </h3>
          <p className="mb-6 max-w-md">
            I'm your AI assistant, ready to help with your web needs!
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Web Dev', 'Marketing', 'E-commerce', 'Pricing'].map((tag) => (
              <span 
                key={tag}
                className="text-xs bg-gradient-to-r from-pink-500 to-blue-600 text-white px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.role === 'assistant' && (
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              🚀
            </div>
          )}
          <div
            className={`max-w-[80%] p-3 rounded-xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-pink-500 to-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
            }`}
          >
            {msg.content}
          </div>
          {msg.role === 'user' && (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 flex-shrink-0">
              You
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3 justify-start">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            🚀
          </div>
          <div className="max-w-[80%] p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
            {typingText}
            <span className="inline-block w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full ml-1 animate-pulse" />
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-center">
          <p className="mb-3">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 text-sm border border-red-300 dark:border-red-700 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            Try Again
          </button>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>

    {/* Input Area */}
    <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 z-10">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
          disabled={isLoading || isTyping}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || isTyping}
          className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
        Boost Web Agency AI Assistant
      </p>
    </div>
  </div>
</div>
    </div>
  )
}
