"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ImageIcon,
  Upload,
  Search,
  Grid3X3,
  List,
  Download,
  Trash2,
  Eye,
  Copy,
  FileImage,
  FileVideo,
  File,
  HardDrive,
} from "lucide-react"

// Demo media data
const demoMedia = [
  {
    id: "1",
    name: "hero-image.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    url: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-06",
    alt: "Hero section background image",
  },
  {
    id: "2",
    name: "product-demo.mp4",
    type: "video",
    size: "15.2 MB",
    dimensions: "1280x720",
    url: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-05",
    alt: "Product demonstration video",
  },
  {
    id: "3",
    name: "logo.png",
    type: "image",
    size: "45 KB",
    dimensions: "512x512",
    url: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-04",
    alt: "Company logo",
  },
  {
    id: "4",
    name: "testimonial-bg.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "1600x900",
    url: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-03",
    alt: "Testimonials section background",
  },
  {
    id: "5",
    name: "user-guide.pdf",
    type: "document",
    size: "3.2 MB",
    dimensions: "A4",
    url: "/placeholder.svg?height=200&width=300",
    uploadDate: "2024-01-02",
    alt: "User guide document",
  },
]

export default function MediaPage() {
  const [media, setMedia] = useState(demoMedia)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType

    return matchesSearch && matchesType
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-8 w-8 text-blue-500" />
      case "video":
        return <FileVideo className="h-8 w-8 text-purple-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0"
      case "video":
        return "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0"
      case "document":
        return "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0"
      default:
        return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border-0"
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media file?")) {
      setMedia(media.filter((item) => item.id !== id))
    }
  }

  const mediaStats = [
    {
      title: "Total Files",
      value: media.length.toString(),
      change: "+12%",
      icon: ImageIcon,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Images",
      value: media.filter((m) => m.type === "image").length.toString(),
      change: "+8",
      icon: FileImage,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Videos",
      value: media.filter((m) => m.type === "video").length.toString(),
      change: "+2",
      icon: FileVideo,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Size",
      value: "22.6 MB",
      change: "+3.2 MB",
      icon: HardDrive,
      gradient: "from-orange-500 to-amber-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Media Library</h1>
            <p className="text-blue-50 text-sm md:text-base">Manage your images, videos, and documents</p>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media Files</DialogTitle>
                <DialogDescription>Upload images, videos, or documents to your media library.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-text">Alt Text (for images)</Label>
                  <Input id="alt-text" placeholder="Describe the image for accessibility" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsUploadOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaStats.map((stat, index) => {
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
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-600"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-600"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-video bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                {item.type === "image" || item.type === "video" ? (
                  <img src={item.url || "/placeholder.svg"} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  getFileIcon(item.type)
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm truncate text-gray-900">{item.name}</h3>
                  <Badge className={getTypeBadgeColor(item.type)}>{item.type}</Badge>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{item.size}</p>
                  <p>{item.dimensions}</p>
                  <p>{new Date(item.uploadDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleCopyUrl(item.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {item.type === "image" || item.type === "video" ? (
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.alt}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                      {getFileIcon(item.type)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <Badge className={getTypeBadgeColor(item.type)}>{item.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.size} • {item.dimensions} • {new Date(item.uploadDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleCopyUrl(item.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMedia.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No media files found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
