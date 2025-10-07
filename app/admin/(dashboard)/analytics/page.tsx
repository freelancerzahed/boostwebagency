"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
} from "lucide-react"

export default function AnalyticsPage() {
  const overviewStats = [
    {
      title: "Total Visitors",
      value: "45,231",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Page Views",
      value: "123,456",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Avg. Session",
      value: "4m 32s",
      change: "+15.3%",
      trend: "up",
      icon: Clock,
      gradient: "from-blue-500 to-indigo-500",
    },
  ]

  const topPages = [
    { page: "/", views: 12543, percentage: 35 },
    { page: "/shop", views: 8921, percentage: 25 },
    { page: "/about", views: 5432, percentage: 15 },
    { page: "/contact", views: 3210, percentage: 9 },
    { page: "/services", views: 2876, percentage: 8 },
  ]

  const deviceStats = [
    { device: "Desktop", users: 18543, percentage: 65 },
    { device: "Mobile", users: 8921, percentage: 31 },
    { device: "Tablet", users: 1234, percentage: 4 },
  ]

  const trafficSources = [
    { source: "Organic Search", visitors: 15432, percentage: 45 },
    { source: "Direct", visitors: 8765, percentage: 25 },
    { source: "Social Media", visitors: 5432, percentage: 16 },
    { source: "Referral", visitors: 3210, percentage: 9 },
    { source: "Email", visitors: 1876, percentage: 5 },
  ]

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Desktop":
        return <Monitor className="h-4 w-4" />
      case "Mobile":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-pink-50 text-sm md:text-base">Comprehensive insights into your website performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-white text-pink-600 hover:bg-pink-50 shadow-md">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-white/90" />
                  <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-1 rounded-full flex items-center gap-1">
                    {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
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

      {/* Main Analytics Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white rounded-2xl p-1 shadow-lg">
          <TabsTrigger
            value="overview"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="traffic"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
          >
            Traffic
          </TabsTrigger>
          <TabsTrigger
            value="behavior"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
          >
            Behavior
          </TabsTrigger>
          <TabsTrigger
            value="conversions"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
          >
            Conversions
          </TabsTrigger>
          <TabsTrigger
            value="real-time"
            className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
          >
            Real-time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{page.page}</span>
                        <span className="text-sm text-gray-600">{page.views.toLocaleString()}</span>
                      </div>
                      <Progress value={page.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitor distribution by device type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceStats.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-pink-50 hover:to-rose-50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">{getDeviceIcon(device.device)}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{device.device}</p>
                        <p className="text-xs text-gray-500">{device.users.toLocaleString()} users</p>
                      </div>
                    </div>
                    <Badge className="bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 border-0">
                      {device.percentage}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.visitors.toLocaleString()}</span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Traffic Analysis</CardTitle>
              <CardDescription>Detailed traffic patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Traffic Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Detailed traffic analysis with charts and graphs would be displayed here.
                </p>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
              <CardDescription>How users interact with your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Behavior Analysis</h3>
                <p className="text-gray-600 mb-4">
                  User behavior patterns, heatmaps, and interaction data would be shown here.
                </p>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600">
                  <Eye className="h-4 w-4 mr-2" />
                  View Behavior Flow
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Conversion Tracking</CardTitle>
              <CardDescription>Monitor your conversion goals and funnels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Conversion Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Conversion funnels, goal tracking, and e-commerce analytics would be displayed here.
                </p>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Conversion Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>Live visitor activity on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-2xl font-bold text-gray-900">127</span>
                  <span className="text-gray-600 ml-2">active users</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Live Activity</h3>
                <p className="text-gray-600 mb-4">
                  Real-time visitor tracking, active pages, and live events would be shown here.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
                  <Globe className="h-4 w-4 mr-2" />
                  View Live Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
