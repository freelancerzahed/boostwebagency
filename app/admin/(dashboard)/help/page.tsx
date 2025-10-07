"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Book,
  Video,
  Mail,
  Phone,
  ExternalLink,
  Send,
  FileText,
  Users,
  Settings,
} from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  })

  const faqs = [
    {
      question: "How do I reset my admin password?",
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page. An email with reset instructions will be sent to your registered email address.",
      category: "Account",
    },
    {
      question: "How do I add new users to the system?",
      answer:
        "Navigate to the Users section in the admin panel, click 'Add User', and fill in the required information including username, email, and role.",
      category: "User Management",
    },
    {
      question: "Can I customize the admin panel theme?",
      answer:
        "Yes, you can customize colors and appearance in the Settings > Appearance section. You can also add custom CSS for advanced styling.",
      category: "Customization",
    },
    {
      question: "How do I backup my data?",
      answer:
        "Go to Database > Backups and click 'Create Backup'. You can also set up automatic backups in the backup settings.",
      category: "Data Management",
    },
    {
      question: "What are the system requirements?",
      answer:
        "The admin panel requires a modern web browser (Chrome, Firefox, Safari, Edge) and JavaScript enabled. For optimal performance, we recommend at least 4GB RAM and a stable internet connection.",
      category: "Technical",
    },
  ]

  const tutorials = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using the admin panel",
      type: "video",
      duration: "15 min",
      url: "#",
    },
    {
      title: "User Management Tutorial",
      description: "How to manage users, roles, and permissions",
      type: "article",
      duration: "10 min read",
      url: "#",
    },
    {
      title: "Database Management",
      description: "Managing your database and backups",
      type: "video",
      duration: "20 min",
      url: "#",
    },
    {
      title: "Security Best Practices",
      description: "Keep your admin panel secure",
      type: "article",
      duration: "8 min read",
      url: "#",
    },
  ]

  const contactOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      contact: "support@yourcompany.com",
      available: "24/7",
    },
    {
      title: "Phone Support",
      description: "Speak with our support team",
      icon: Phone,
      contact: "+1 (555) 123-4567",
      available: "Mon-Fri 9AM-6PM EST",
    },
    {
      title: "Live Chat",
      description: "Chat with support in real-time",
      icon: MessageSquare,
      contact: "Available in app",
      available: "Mon-Fri 9AM-6PM EST",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the support request
    alert("Support request sent successfully!")
    setContactForm({ subject: "", message: "", priority: "medium" })
    setIsContactOpen(false)
  }

  const getTypeIcon = (type: string) => {
    return type === "video" ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />
  }

  const getTypeBadge = (type: string) => {
    return type === "video" ? (
      <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0">Video</Badge>
    ) : (
      <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">Article</Badge>
    )
  }

  const helpStats = [
    {
      title: "FAQ Articles",
      value: faqs.length.toString(),
      icon: HelpCircle,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Video Tutorials",
      value: tutorials.filter((t) => t.type === "video").length.toString(),
      icon: Video,
      gradient: "from-red-500 to-rose-500",
    },
    {
      title: "Documentation",
      value: tutorials.filter((t) => t.type === "article").length.toString(),
      icon: Book,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Support Tickets",
      value: "12",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Help & Support</h1>
            <p className="text-blue-50 text-sm md:text-base">Find answers and get help with the admin panel</p>
          </div>
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Support</DialogTitle>
                <DialogDescription>Send us a message and we'll get back to you as soon as possible.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your issue in detail"
                    rows={5}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsContactOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {helpStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col gap-3">
                <IconComponent className="h-8 w-8 text-white/90" />
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/90 font-medium">{stat.title}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="bg-white rounded-xl p-1 shadow-md">
          <TabsTrigger value="faq" className="rounded-lg">
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="rounded-lg">
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-lg">
            Contact
          </TabsTrigger>
          <TabsTrigger value="documentation" className="rounded-lg">
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find quick answers to common questions</p>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-xl px-4 border-0">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium">{faq.question}</span>
                      <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0 text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4 pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutorials & Guides</h2>
              <p className="text-gray-600">Step-by-step guides to help you get the most out of the admin panel</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      {getTypeIcon(tutorial.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                        {getTypeBadge(tutorial.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">{tutorial.duration}</span>
                        <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600" asChild>
                          <a href={tutorial.url}>
                            View <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="font-medium text-gray-900">{option.contact}</p>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-0">{option.available}</Badge>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        {option.title === "Live Chat" ? "Start Chat" : "Contact Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h2>
              <p className="text-gray-600">Comprehensive guides and API documentation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">User Management</h3>
                <p className="text-sm text-gray-600 mb-4">Complete guide to managing users, roles, and permissions</p>
                <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Read More <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-600 mb-4">How to configure and customize your admin panel</p>
                <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Read More <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">API Reference</h3>
                <p className="text-sm text-gray-600 mb-4">Complete API documentation for developers</p>
                <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Read More <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
