"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  MessageSquare,
  RefreshCw,
  Search,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  project_title?: string
  choose_service?: string
  message: string
  hasAttachment: boolean
  attachmentName?: string
  timestamp: string
  status: string
}

export default function AdminSubscribers() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/getSubscribers")
      const data = await response.json()

      if (response.ok) {
        setContacts(data.contacts || [])
        setFilteredContacts(data.contacts || [])
        setError("")
      } else {
        setError(data.error || "Failed to fetch contacts")
      }
    } catch (err) {
      setError("Failed to fetch contacts")
      console.error("Error fetching contacts:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  // Filter contacts based on search and filters
  useEffect(() => {
    let filtered = contacts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery) ||
          contact.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((contact) => contact.choose_service === serviceFilter)
    }

    setFilteredContacts(filtered)
  }, [searchQuery, statusFilter, serviceFilter, contacts])

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown"
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Invalid Date"
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "new":
        return { color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20", icon: AlertCircle, label: "New" }
      case "contacted":
        return { color: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20", icon: Clock, label: "Contacted" }
      case "in_progress":
        return { color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20", icon: Clock, label: "In Progress" }
      case "completed":
        return {
          color: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
          icon: CheckCircle,
          label: "Completed",
        }
      default:
        return { color: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20", icon: AlertCircle, label: status }
    }
  }

  const getStatusCounts = () => {
    return {
      total: contacts.length,
      new: contacts.filter((c) => c.status === "new").length,
      contacted: contacts.filter((c) => c.status === "contacted").length,
      in_progress: contacts.filter((c) => c.status === "in_progress").length,
      completed: contacts.filter((c) => c.status === "completed").length,
    }
  }

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Service", "Project", "Message", "Status", "Date"]
    const rows = filteredContacts.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.choose_service || "",
      c.project_title || "",
      c.message.replace(/\n/g, " "),
      c.status,
      formatDate(c.timestamp),
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const statusCounts = getStatusCounts()

  const stats = [
    {
      title: "Total Contacts",
      value: statusCounts.total.toString(),
      change: "+12%",
      icon: Users,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "New",
      value: statusCounts.new.toString(),
      change: "+5",
      icon: AlertCircle,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Contacted",
      value: statusCounts.contacted.toString(),
      change: "+3",
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "In Progress",
      value: statusCounts.in_progress.toString(),
      change: "+2",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Completed",
      value: statusCounts.completed.toString(),
      change: "+8",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className="text-lg">Loading contacts...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Management</h1>
            <p className="text-blue-50 text-sm md:text-base">Manage and track all customer inquiries and submissions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={exportToCSV}
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={fetchContacts}
              className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 shadow-md border-0"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
              <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
              <SelectItem value="Branding">Branding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 text-rose-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
              ? "No contacts match your filters"
              : "No contacts yet"}
          </h3>
          <p className="text-gray-600">
            {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Contact form submissions will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {filteredContacts.map((contact) => {
            const statusConfig = getStatusConfig(contact.status)
            const StatusIcon = statusConfig.icon

            return (
              <div
                key={contact.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Badge className={`${statusConfig.color} border-0 flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </Badge>
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(contact.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {contact.choose_service && (
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl">
                      <Briefcase className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Service</p>
                        <p className="text-sm font-medium">{contact.choose_service}</p>
                      </div>
                    </div>
                  )}
                  {contact.project_title && (
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-xl">
                      <Briefcase className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Project</p>
                        <p className="text-sm font-medium">{contact.project_title}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Message</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                    </div>
                  </div>
                </div>

                {contact.hasAttachment && (
                  <div className="bg-blue-50 p-3 rounded-xl mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>📎 Attachment:</strong> {contact.attachmentName || "File attached"}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Reply via Email
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
