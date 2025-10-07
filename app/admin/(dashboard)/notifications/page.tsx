"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Mail,
  MessageSquare,
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Settings,
} from "lucide-react"

export default function NotificationsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    orderAlerts: true,
    userRegistrations: true,
    systemAlerts: true,
    marketingEmails: false,
  })

  const notifications = [
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-001 has been placed by John Doe",
      time: "5 minutes ago",
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "user",
      title: "New User Registration",
      message: "Jane Smith has registered for an account",
      time: "15 minutes ago",
      read: true,
      priority: "medium",
    },
    {
      id: "3",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will begin at 2:00 AM UTC",
      time: "1 hour ago",
      read: false,
      priority: "low",
    },
    {
      id: "4",
      type: "security",
      title: "Security Alert",
      message: "Multiple failed login attempts detected",
      time: "2 hours ago",
      read: true,
      priority: "high",
    },
    {
      id: "5",
      type: "testimonial",
      title: "New Testimonial",
      message: "A new testimonial has been submitted for review",
      time: "3 hours ago",
      read: true,
      priority: "medium",
    },
  ]

  const [broadcastMessage, setBroadcastMessage] = useState("")
  const [broadcastSubject, setBroadcastSubject] = useState("")

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-5 w-5 text-blue-500" />
      case "user":
        return <Users className="h-5 w-5 text-green-500" />
      case "system":
        return <Settings className="h-5 w-5 text-gray-500" />
      case "security":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "testimonial":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0">High</Badge>
      case "medium":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Medium</Badge>
      case "low":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Low</Badge>
      default:
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border-0">Normal</Badge>
    }
  }

  const markAsRead = (id: string) => {
    // In a real app, this would update the notification status
  }

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
  }

  const sendBroadcast = () => {
    if (broadcastSubject && broadcastMessage) {
      // In a real app, this would send the broadcast message
      alert("Broadcast message sent successfully!")
      setBroadcastSubject("")
      setBroadcastMessage("")
    }
  }

  const notificationStats = [
    {
      title: "Total Notifications",
      value: notifications.length.toString(),
      icon: Bell,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Unread",
      value: notifications.filter((n) => !n.read).length.toString(),
      icon: Mail,
      gradient: "from-red-500 to-rose-500",
    },
    {
      title: "High Priority",
      value: notifications.filter((n) => n.priority === "high").length.toString(),
      icon: AlertTriangle,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Today",
      value: notifications.length.toString(),
      icon: Clock,
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Notifications</h1>
            <p className="text-blue-50 text-sm md:text-base">Manage notifications and communication settings</p>
          </div>
          <Button
            onClick={markAllAsRead}
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {notificationStats.map((stat, index) => {
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

      <Tabs defaultValue="inbox" className="space-y-6">
        <TabsList className="bg-white rounded-xl p-1 shadow-md">
          <TabsTrigger value="inbox" className="rounded-lg">
            Inbox
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg">
            Settings
          </TabsTrigger>
          <TabsTrigger value="broadcast" className="rounded-lg">
            Broadcast
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-lg">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Notifications</h2>
              <p className="text-gray-600">View and manage your latest notifications</p>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    !notification.read ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {getPriorityBadge(notification.priority)}
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-gray-600 text-sm">Configure how you receive notifications</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>
              </div>
            </div>

            {/* Alert Types */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Alert Types</h2>
                <p className="text-gray-600 text-sm">Choose which events trigger notifications</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Order Alerts</Label>
                    <p className="text-sm text-gray-500">New orders and order updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderAlerts}
                    onCheckedChange={(checked) => handleSettingChange("orderAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">User Registrations</Label>
                    <p className="text-sm text-gray-500">New user account creations</p>
                  </div>
                  <Switch
                    checked={notificationSettings.userRegistrations}
                    onCheckedChange={(checked) => handleSettingChange("userRegistrations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">System Alerts</Label>
                    <p className="text-sm text-gray-500">System maintenance and updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={(checked) => handleSettingChange("systemAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Promotional and marketing content</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="broadcast" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Broadcast Message</h2>
              <p className="text-gray-600">Send notifications to all users or specific groups</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter your broadcast message"
                  rows={6}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  Save Draft
                </Button>
                <Button onClick={sendBroadcast} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                  <Send className="h-4 w-4 mr-2" />
                  Send Broadcast
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Templates</h2>
              <p className="text-gray-600">Manage email and notification templates</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div>
                  <h3 className="font-semibold text-gray-900">Welcome Email</h3>
                  <p className="text-sm text-gray-600">Sent to new users upon registration</p>
                </div>
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div>
                  <h3 className="font-semibold text-gray-900">Order Confirmation</h3>
                  <p className="text-sm text-gray-600">Sent when an order is placed</p>
                </div>
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div>
                  <h3 className="font-semibold text-gray-900">Password Reset</h3>
                  <p className="text-sm text-gray-600">Sent when user requests password reset</p>
                </div>
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div>
                  <h3 className="font-semibold text-gray-900">System Maintenance</h3>
                  <p className="text-sm text-gray-600">Sent before scheduled maintenance</p>
                </div>
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
