"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Upload, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Defensive: read values from DOM to avoid stale React state during hydration
    const nameVal = (document.querySelector('input[name="name"]') as HTMLInputElement | null)?.value || formData.name
    const emailVal = (document.querySelector('input[name="email"]') as HTMLInputElement | null)?.value || formData.email
    const serviceVal = (document.querySelector('select[name="choose_service"]') as HTMLSelectElement | null)?.value || formData.choose_service
    const messageVal = (document.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null)?.value || formData.message

    if (!nameVal.trim()) {
      newErrors.name = "Full name is required"
    } else if (nameVal.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!emailVal.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!serviceVal) {
      newErrors.choose_service = "Please select a service"
    }

    if (!messageVal.trim()) {
      newErrors.message = "Please tell us about your project"
    } else if (messageVal.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Defensive: remove any leftover HTML5 `required` attributes that may come from SSR
  useEffect(() => {
    try {
      const selectors = [
        'input[name="name"]',
        'input[name="email"]',
        'input[name="phone"]',
        'select[name="choose_service"]',
        'textarea[name="message"]',
      ]
      // disable native validation on the form and remove any `required` attributes
      const form = document.querySelector('form') as HTMLFormElement | null
      if (form) {
        try {
          // prefer property assignment which reliably disables validation
          ;(form as any).noValidate = true
        } catch (e) {
          form.setAttribute('novalidate', 'true')
        }
      }
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.removeAttribute('required')
          // prevent native invalid UI
          el.addEventListener && el.addEventListener('invalid', (ev) => {
            try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
          })
        })
      })
    } catch (err) {
      // no-op
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      setStatus("Please fix the errors above")
      return
    }

    // Show success message immediately
    setStatus("✅ SUCCESS! Your FREE Digital Marketing Proposal request has been sent. Check your email for confirmation. Our team will contact you within 24 hours.")

    setIsSubmitting(true)

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as string | Blob)
      }
    })

    try {
      // Send email in background (no await)
      fetch("/api/sendEmail", {
        method: "POST",
        body: data,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_title: "",
        choose_service: "",
        message: "",
        file: null,
      })

      // Auto-hide status after 8 seconds
      setTimeout(() => setStatus(""), 8000)
    } catch (error: any) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Info */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>CONTACT US</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                Boost Your Business with
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
                  Boost Web Agency
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                We help your business grow with top-tier digital marketing, web design, and development.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:space-y-4">
              {["Free Consultation", "Premium Services", "24/7 Support", "Affordable Pricing"].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {/* Phone */}
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Call Us</p>
                    <div className="space-y-1">
                      <a href="tel:+8801603108425" className="block text-gray-600 dark:text-gray-400 text-sm">
                        +880 1603-108425
                      </a>
                      <a href="tel:+8801869731202" className="block text-gray-600 dark:text-gray-400 text-sm">
                        +880 1869-731202
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</p>
                    <a
                      href="mailto:boostwebagency.info@gmail.com"
                      className="text-gray-600 dark:text-gray-400 text-sm"
                    >
                      boostwebagency.info@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Location</p>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 md:p-8 rounded-3xl shadow-xl">
            <div className="mb-6 md:mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get Your FREE Digital Marketing Proposal
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData] as string}
                    onChange={handleChange}
                    onInvalid={(e) => { try { e.preventDefault(); e.stopPropagation(); } catch (err) {} }}
                    placeholder={
                      field === "name"
                        ? "Full Name"
                        : field === "email"
                        ? "Email Address"
                        : "Phone Number"
                    }
                    className={`w-full px-4 py-4 rounded-2xl border bg-white dark:bg-gray-800 text-base text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all ${
                      errors[field]
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-200 dark:border-gray-700 focus:ring-pink-300"
                    }`}
                  />
                  {errors[field] && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              {/* Project + Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="project_title"
                  value={formData.project_title}
                  onChange={handleChange}
                  placeholder="Website or FB link"
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all"
                />
                <div>
                  <select
                    name="choose_service"
                    value={formData.choose_service}
                    onChange={handleChange}
                    onInvalid={(e) => { try { e.preventDefault(); e.stopPropagation(); } catch (err) {} }}
                    className={`w-full px-4 py-4 rounded-2xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:ring-2 focus:outline-none transition-all ${
                      errors.choose_service
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-200 dark:border-gray-700 focus:ring-pink-300"
                    }`}
                  >
                    <option value="">Choose Service</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="ecommerce">E-Commerce Solutions</option>
                    <option value="logo-design">Logo Design</option>
                  </select>
                  {errors.choose_service && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.choose_service}
                    </p>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <label
                htmlFor="file-upload"
                className="flex items-center justify-between px-4 py-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl cursor-pointer"
              >
                <span className={formData.file ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}>
                  {formData.file ? formData.file.name : "Choose file (optional)"}
                </span>
                <Upload className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input type="file" name="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              </label>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onInvalid={(e) => { try { e.preventDefault(); e.stopPropagation(); } catch (err) {} }}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`w-full px-4 py-4 rounded-2xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base resize-none focus:ring-2 focus:outline-none transition-all ${
                    errors.message
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-200 dark:border-gray-700 focus:ring-pink-300"
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status */}
              {status && (
                <div
                  className={`p-4 rounded-2xl animate-in fade-in duration-300 ${
                    status.includes("✅") 
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-green-800 dark:text-green-200" 
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 text-red-800 dark:text-red-200"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">{status}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
