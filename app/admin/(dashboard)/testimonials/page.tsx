"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, MessageSquare, TrendingUp, CheckCircle, X } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  email: string
  company: string
  rating: number
  message: string
  status: "pending" | "approved" | "rejected"
  date: string
  avatar: string
}

export default function TestimonialsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    rating: "",
    message: "",
    status: "pending",
  })

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      company: "Tech Solutions Inc.",
      rating: 5,
      message:
        "Absolutely fantastic service! The team went above and beyond to deliver exactly what we needed. Highly recommend to anyone looking for quality work.",
      status: "approved",
      date: "2024-01-15",
      avatar: "/testimonials/sarah-johnson-ceo.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@startup.com",
      company: "StartupCo",
      rating: 4,
      message:
        "Great experience working with this team. Professional, timely, and delivered quality results. Would definitely work with them again.",
      status: "approved",
      date: "2024-01-12",
      avatar: "/testimonials/michael-chen-marketing.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@design.com",
      company: "Creative Design Studio",
      rating: 5,
      message:
        "Outstanding work! The attention to detail and creativity exceeded our expectations. The project was completed on time and within budget.",
      status: "pending",
      date: "2024-01-10",
      avatar: "/testimonials/emily-rodriguez-founder.jpg",
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david@corp.com",
      company: "Global Corp",
      rating: 3,
      message:
        "Good service overall, but there were some communication issues that caused delays. The final result was satisfactory.",
      status: "rejected",
      date: "2024-01-08",
      avatar: "/testimonials/david-thompson-ecommerce.jpg",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa@agency.com",
      company: "Marketing Agency",
      rating: 5,
      message:
        "Exceptional quality and service! The team was responsive, professional, and delivered beyond our expectations. Highly recommended!",
      status: "approved",
      date: "2024-01-05",
      avatar: "/testimonials/lisa-wang-operations.jpg",
    },
  ])

  const stats = [
    {
      title: "Total Testimonials",
      value: testimonials.length.toString(),
      change: "+12%",
      icon: MessageSquare,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Approved",
      value: testimonials.filter((t) => t.status === "approved").length.toString(),
      change: "+8%",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Average Rating",
      value: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
      change: "+0.2",
      icon: Star,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Pending Review",
      value: testimonials.filter((t) => t.status === "pending").length.toString(),
      change: "+3",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-500",
    },
  ]

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || testimonial.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      rating: "",
      message: "",
      status: "pending",
    })
  }

  const handleAddTestimonial = async () => {
    if (!formData.name || !formData.email || !formData.company || !formData.rating || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      rating: Number.parseInt(formData.rating),
      message: formData.message,
      status: formData.status as "pending" | "approved" | "rejected",
      date: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setTestimonials([...testimonials, newTestimonial])
    setIsAddDialogOpen(false)
    resetForm()
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Testimonial added successfully",
    })
  }

  const handleEditTestimonial = async () => {
    if (
      !selectedTestimonial ||
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.rating ||
      !formData.message
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === selectedTestimonial.id
        ? {
            ...testimonial,
            name: formData.name,
            email: formData.email,
            company: formData.company,
            rating: Number.parseInt(formData.rating),
            message: formData.message,
            status: formData.status as "pending" | "approved" | "rejected",
          }
        : testimonial,
    )

    setTestimonials(updatedTestimonials)
    setIsEditDialogOpen(false)
    setSelectedTestimonial(null)
    resetForm()
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Testimonial updated successfully",
    })
  }

  const handleDeleteTestimonial = async (id: number) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Testimonial deleted successfully",
    })
  }

  const handleStatusChange = async (id: number, newStatus: "pending" | "approved" | "rejected") => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === id ? { ...testimonial, status: newStatus } : testimonial,
    )

    setTestimonials(updatedTestimonials)
    setIsLoading(false)

    toast({
      title: "Success",
      description: `Testimonial ${newStatus} successfully`,
    })
  }

  const openEditDialog = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      email: testimonial.email,
      company: testimonial.company,
      rating: testimonial.rating.toString(),
      message: testimonial.message,
      status: testimonial.status,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Approved</Badge>
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Pending</Badge>
      case "rejected":
        return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-0">Rejected</Badge>
      default:
        return <Badge className="border-0">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Testimonials</h1>
            <p className="text-pink-50 text-sm md:text-base">Manage customer testimonials and reviews</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto bg-white text-pink-600 hover:bg-pink-50 shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-white/90" />
                  <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/90 font-medium">{stat.title}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-pink-500"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-pink-500">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Left: Avatar and Info */}
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-16 w-16 ring-4 ring-pink-100">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-lg font-semibold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.email}</p>
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">{testimonial.company}</Badge>
                </div>
              </div>

              {/* Middle: Rating and Message */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                  <span className="text-sm font-semibold text-gray-700">({testimonial.rating}.0)</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{testimonial.message}</p>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex md:flex-col items-center md:items-end gap-3">
                {getStatusBadge(testimonial.status)}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(testimonial.date).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openViewDialog(testimonial)}
                    className="hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(testimonial)}
                    className="hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No testimonials found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Testimonial Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>Add a new customer testimonial to your collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                placeholder="Customer name"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company *
              </Label>
              <Input
                id="company"
                placeholder="Company name"
                className="col-span-3"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating *
              </Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Testimonial message"
                className="col-span-3"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTestimonial} disabled={isLoading} className="bg-pink-600 hover:bg-pink-700">
              {isLoading ? "Adding..." : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>Update the testimonial information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name *
              </Label>
              <Input
                id="edit-name"
                placeholder="Customer name"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email *
              </Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="customer@example.com"
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-company" className="text-right">
                Company *
              </Label>
              <Input
                id="edit-company"
                placeholder="Company name"
                className="col-span-3"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-rating" className="text-right">
                Rating *
              </Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-message" className="text-right">
                Message *
              </Label>
              <Textarea
                id="edit-message"
                placeholder="Testimonial message"
                className="col-span-3"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTestimonial} disabled={isLoading} className="bg-pink-600 hover:bg-pink-700">
              {isLoading ? "Updating..." : "Update Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Testimonial Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>View Testimonial</DialogTitle>
            <DialogDescription>Testimonial details</DialogDescription>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-4 ring-pink-100">
                  <AvatarImage src={selectedTestimonial.avatar || "/placeholder.svg"} alt={selectedTestimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white text-lg">
                    {selectedTestimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedTestimonial.name}</h3>
                  <p className="text-sm text-gray-600">{selectedTestimonial.email}</p>
                  <Badge className="mt-2 bg-gray-100 text-gray-700 border-0">{selectedTestimonial.company}</Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex items-center space-x-1">
                  {renderStars(selectedTestimonial.rating)}
                  <span className="text-sm text-gray-600">({selectedTestimonial.rating}/5)</span>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Status:</span>
                <div className="mt-1">{getStatusBadge(selectedTestimonial.status)}</div>
              </div>

              <div>
                <span className="text-sm font-medium">Message:</span>
                <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">{selectedTestimonial.message}</p>
              </div>

              <div>
                <span className="text-sm font-medium">Date:</span>
                <p className="text-sm text-gray-600">{new Date(selectedTestimonial.date).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedTestimonial.id, "approved")}
                  disabled={selectedTestimonial.status === "approved"}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange(selectedTestimonial.id, "rejected")}
                  disabled={selectedTestimonial.status === "rejected"}
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(selectedTestimonial)}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
