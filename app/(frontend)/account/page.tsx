"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  LayoutDashboard,
  User,
  Settings,
  Package,
  Heart,
  Mail,
  Save,
  Edit,
  CheckCircle2,
  Key,
  TrendingUp,
  ShoppingBag,
  Download,
  FileText,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  bio: string
  avatar: string
  joinedDate: string
  accountType: "free" | "premium" | "enterprise"
}

export default function AccountPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isEditing, setIsEditing] = useState(false)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    id: "1",
    firstName: user?.name?.split(" ")[0] || "John",
    lastName: user?.name?.split(" ")[1] || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    bio: "Web developer and designer with a passion for creating beautiful, functional websites.",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    joinedDate: "2023-01-15",
    accountType: "premium",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [settingsForm, setSettingsForm] = useState({
    email: editedProfile.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    firstName: user?.name?.split(" ")[0] || "John",
    lastName: user?.name?.split(" ")[1] || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    bio: "Web developer and designer with a passion for creating beautiful, functional websites.",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    joinedDate: "2023-01-15",
    accountType: "premium",
  })

  const stats = [
    { label: "Total Orders", value: "24", icon: ShoppingBag, color: "from-blue-500 to-blue-600" },
    { label: "Wishlist Items", value: "12", icon: Heart, color: "from-pink-500 to-pink-600" },
    { label: "Downloads", value: "48", icon: Download, color: "from-purple-500 to-purple-600" },
    { label: "Active Products", value: "18", icon: FileText, color: "from-green-500 to-green-600" },
  ]

  const recentOrders = [
    { id: "1", date: "2024-01-25", total: "$129.99", status: "Delivered", items: 3 },
    { id: "2", date: "2024-01-20", total: "$89.50", status: "In Transit", items: 2 },
    { id: "3", date: "2024-01-15", total: "$199.99", status: "Processing", items: 5 },
  ]

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setProfile(editedProfile)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangePasswordOpen(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSettingsChange = (field: string, value: string) => {
    setSettingsForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email update logic here
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password update logic here
    setSettingsForm({
      ...settingsForm,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const passwordStrength = getPasswordStrength(settingsForm.newPassword)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setIsCropDialogOpen(true)
        setIsAvatarDialogOpen(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropSave = () => {
    if (selectedImage) {
      setIsUploadingAvatar(true)
      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          avatar: selectedImage,
        }))
        setEditedProfile((prev) => ({
          ...prev,
          avatar: selectedImage,
        }))
        setIsUploadingAvatar(false)
        setIsCropDialogOpen(false)
        setSelectedImage(null)
        setZoom(1)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 500)
    }
  }

  const handleCropCancel = () => {
    setIsCropDialogOpen(false)
    setSelectedImage(null)
    setZoom(1)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute top-1/4 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delayed" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      </div>

      <div className="relative container mx-auto p-4 lg:p-6 pt-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-xl transition-transform group-hover:scale-105">
                  <AvatarImage
                    src={profile.avatar || "/placeholder.svg"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                  />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-pink-500 to-blue-600 text-white">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-600 shadow-lg border-2 border-white dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>
            {activeTab === "profile" && (
              <div className="hidden lg:flex gap-3">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel} className="bg-transparent rounded-xl">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg"
                    >
                      {isSaving ? (
                        <>
                          <Save className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-1 h-auto rounded-2xl">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 mt-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all rounded-2xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                        </div>
                        <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-pink-600" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</p>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{order.total}</p>
                      </div>
                    ))}
                    <Link href="/account/orders">
                      <Button variant="outline" className="w-full bg-transparent rounded-xl">
                        View All Orders
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/account/orders">
                      <Button variant="outline" className="w-full justify-start bg-transparent rounded-xl" size="lg">
                        <Package className="h-5 w-5 mr-3" />
                        View Orders
                      </Button>
                    </Link>
                    <Link href="/account/wishlist">
                      <Button variant="outline" className="w-full justify-start bg-transparent rounded-xl" size="lg">
                        <Heart className="h-5 w-5 mr-3" />
                        My Wishlist
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button variant="outline" className="w-full justify-start bg-transparent rounded-xl" size="lg">
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        Browse Products
                      </Button>
                    </Link>
                    <Link href="/account/support">
                      <Button variant="outline" className="w-full justify-start bg-transparent rounded-xl" size="lg">
                        <Mail className="h-5 w-5 mr-3" />
                        Contact Support
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Account Status */}
              <Card className="bg-gradient-to-r from-pink-500 to-blue-600 text-white border-0 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Premium Member</h3>
                      <p className="text-white/90">Enjoy exclusive benefits and early access to sales</p>
                    </div>
                    <Badge className="bg-white text-pink-600 hover:bg-white/90">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab - Updated for responsiveness */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            value={editedProfile.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="h-11 rounded-xl"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white py-2 font-medium">{profile.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name
                        </Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            value={editedProfile.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="h-11 rounded-xl"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white py-2 font-medium">{profile.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={editedProfile.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          rows={3}
                          placeholder="Tell us about yourself..."
                          className="rounded-xl resize-none"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white py-2">{profile.bio || "No bio provided"}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                        Date of Birth
                      </Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={editedProfile.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          className="h-11 rounded-xl"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white py-2 font-medium">
                          {formatDate(profile.dateOfBirth)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="h-11 rounded-xl"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white py-2 font-medium">{profile.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="h-11 rounded-xl"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white py-2 font-medium">{profile.phone}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Save Buttons */}
              {isEditing && (
                <div className="lg:hidden flex gap-3">
                  <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent rounded-xl h-12">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg h-12"
                  >
                    {isSaving ? (
                      <>
                        <Save className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Settings Tab - Updated for responsiveness */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Update Email */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      Update Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="settingsEmail" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="settingsEmail"
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) => handleSettingsChange("email", e.target.value)}
                          className="h-11 rounded-xl"
                          placeholder="your.email@example.com"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          We'll send a verification email to your new address
                        </p>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Update Email
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Update Password */}
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Key className="h-5 w-5 text-white" />
                      </div>
                      Update Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="settingsCurrentPassword" className="text-sm font-medium">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="settingsCurrentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={settingsForm.currentPassword}
                            onChange={(e) => handleSettingsChange("currentPassword", e.target.value)}
                            className="h-11 rounded-xl pr-10"
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="settingsNewPassword" className="text-sm font-medium">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="settingsNewPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={settingsForm.newPassword}
                            onChange={(e) => handleSettingsChange("newPassword", e.target.value)}
                            className="h-11 rounded-xl pr-10"
                            placeholder="Enter new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {settingsForm.newPassword && (
                          <div className="space-y-2 mt-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Password Strength:</span>
                              <span className="font-medium">{strengthLabels[passwordStrength]}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${strengthColors[passwordStrength]}`}
                                style={{ width: `${((passwordStrength + 1) / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="settingsConfirmPassword" className="text-sm font-medium">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="settingsConfirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={settingsForm.confirmPassword}
                            onChange={(e) => handleSettingsChange("confirmPassword", e.target.value)}
                            className="h-11 rounded-xl pr-10"
                            placeholder="Confirm new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {settingsForm.confirmPassword && settingsForm.newPassword !== settingsForm.confirmPassword && (
                          <p className="text-sm text-red-600 dark:text-red-400">Passwords do not match</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          !settingsForm.currentPassword ||
                          !settingsForm.newPassword ||
                          !settingsForm.confirmPassword ||
                          settingsForm.newPassword !== settingsForm.confirmPassword
                        }
                        className="w-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Crop Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="relative w-64 h-64 overflow-hidden rounded-lg border-4 border-gray-200 dark:border-gray-700">
                  {selectedImage && (
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
                      style={{
                        transform: `scale(${zoom})`,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zoom" className="text-sm font-medium">
                  Zoom
                </Label>
                <input
                  id="zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number.parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Adjust the zoom to crop your image</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCropCancel}
                disabled={isUploadingAvatar}
                className="rounded-xl bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropSave}
                disabled={isUploadingAvatar}
                className="bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white rounded-xl shadow-lg"
              >
                {isUploadingAvatar ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Save Picture
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
