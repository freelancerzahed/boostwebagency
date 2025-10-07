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
import { Plus, Search, Filter, Edit, Trash2, Eye, FileText, TrendingUp, BookOpen, Users } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  slug: string
  author: string
  status: "published" | "draft" | "review"
  category: string
  publishDate: string
  views: number
  excerpt: string
  avatar: string
}

export default function BlogPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    excerpt: "",
    status: "draft",
  })

  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      slug: "getting-started-nextjs-14",
      author: "John Doe",
      status: "published",
      category: "Technology",
      publishDate: "2024-01-05",
      views: 1234,
      excerpt: "Learn how to build modern web applications with Next.js 14 and its latest features.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "The Future of Web Development",
      slug: "future-web-development",
      author: "Jane Smith",
      status: "draft",
      category: "Technology",
      publishDate: "2024-01-03",
      views: 0,
      excerpt: "Exploring upcoming trends and technologies that will shape web development.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "UI/UX Design Best Practices",
      slug: "ui-ux-design-best-practices",
      author: "Mike Johnson",
      status: "published",
      category: "Design",
      publishDate: "2024-01-01",
      views: 856,
      excerpt: "Essential principles and practices for creating exceptional user experiences.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "Building Scalable APIs",
      slug: "building-scalable-apis",
      author: "Sarah Wilson",
      status: "review",
      category: "Backend",
      publishDate: "2023-12-28",
      views: 432,
      excerpt: "A comprehensive guide to designing and building APIs that scale.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      title: "Mobile-First Design Strategy",
      slug: "mobile-first-design-strategy",
      author: "David Brown",
      status: "published",
      category: "Design",
      publishDate: "2023-12-25",
      views: 642,
      excerpt: "Why mobile-first approach is crucial for modern web design.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const stats = [
    {
      title: "Total Posts",
      value: posts.length.toString(),
      change: "+12%",
      icon: FileText,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Published",
      value: posts.filter((p) => p.status === "published").length.toString(),
      change: "+8%",
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Total Views",
      value: posts.reduce((sum, post) => sum + post.views, 0).toLocaleString(),
      change: "+15%",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Authors",
      value: new Set(posts.map((p) => p.author)).size.toString(),
      change: "+2",
      icon: Users,
      gradient: "from-amber-500 to-orange-500",
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesStatus && matchesCategory
  })

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      author: "",
      category: "",
      excerpt: "",
      status: "draft",
    })
  }

  const handleAddPost = async () => {
    if (!formData.title || !formData.author || !formData.category || !formData.excerpt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPost: BlogPost = {
      id: posts.length + 1,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      author: formData.author,
      category: formData.category,
      excerpt: formData.excerpt,
      status: formData.status as "published" | "draft" | "review",
      publishDate: new Date().toISOString().split("T")[0],
      views: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setPosts([...posts, newPost])
    setIsAddDialogOpen(false)
    resetForm()
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Blog post added successfully",
    })
  }

  const handleEditPost = async () => {
    if (!selectedPost || !formData.title || !formData.author || !formData.category || !formData.excerpt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedPosts = posts.map((post) =>
      post.id === selectedPost.id
        ? {
            ...post,
            title: formData.title,
            slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
            author: formData.author,
            category: formData.category,
            excerpt: formData.excerpt,
            status: formData.status as "published" | "draft" | "review",
          }
        : post,
    )

    setPosts(updatedPosts)
    setIsEditDialogOpen(false)
    setSelectedPost(null)
    resetForm()
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Blog post updated successfully",
    })
  }

  const handleDeletePost = async (id: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    setPosts(posts.filter((post) => post.id !== id))
    setIsLoading(false)

    toast({
      title: "Success",
      description: "Blog post deleted successfully",
    })
  }

  const openEditDialog = (post: BlogPost) => {
    setSelectedPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      status: post.status,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (post: BlogPost) => {
    setSelectedPost(post)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Published</Badge>
      case "draft":
        return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 border-0">Draft</Badge>
      case "review":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Review</Badge>
      default:
        return <Badge className="border-0">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">Technology</Badge>
      case "design":
        return <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0">Design</Badge>
      case "backend":
        return <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-0">Backend</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-0">{category}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog Posts</h1>
            <p className="text-blue-50 text-sm md:text-base">Create and manage your blog content</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
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
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Left: Avatar and Author Info */}
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                  <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-lg font-semibold">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{post.author}</h3>
                  <p className="text-sm text-gray-500 mb-2">{new Date(post.publishDate).toLocaleDateString()}</p>
                  {getCategoryBadge(post.category)}
                </div>
              </div>

              {/* Middle: Title and Excerpt */}
              <div className="flex-1 space-y-3">
                <h2 className="font-bold text-xl text-gray-900">{post.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex md:flex-col items-center md:items-end gap-3">
                {getStatusBadge(post.status)}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openViewDialog(post)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(post)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-rose-50 hover:text-rose-600"
                    onClick={() => handleDeletePost(post.id)}
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

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Post Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>Add a new blog post to your collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title *
              </Label>
              <Input
                id="title"
                placeholder="Post title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                placeholder="post-slug (auto-generated)"
                className="col-span-3"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author *
              </Label>
              <Input
                id="author"
                placeholder="Author name"
                className="col-span-3"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="excerpt" className="text-right">
                Excerpt *
              </Label>
              <Textarea
                id="excerpt"
                placeholder="Brief description"
                className="col-span-3"
                rows={4}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPost} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Adding..." : "Add Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Update the blog post information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title *
              </Label>
              <Input
                id="edit-title"
                placeholder="Post title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-slug" className="text-right">
                Slug
              </Label>
              <Input
                id="edit-slug"
                placeholder="post-slug"
                className="col-span-3"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-author" className="text-right">
                Author *
              </Label>
              <Input
                id="edit-author"
                placeholder="Author name"
                className="col-span-3"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-excerpt" className="text-right">
                Excerpt *
              </Label>
              <Textarea
                id="edit-excerpt"
                placeholder="Brief description"
                className="col-span-3"
                rows={4}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPost} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Updating..." : "Update Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Post Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>View Blog Post</DialogTitle>
            <DialogDescription>Blog post details</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                  <AvatarImage src={selectedPost.avatar || "/placeholder.svg"} alt={selectedPost.author} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-lg">
                    {selectedPost.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedPost.author}</h3>
                  <p className="text-sm text-gray-600">{new Date(selectedPost.publishDate).toLocaleDateString()}</p>
                  {getCategoryBadge(selectedPost.category)}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Title:</span>
                <h2 className="mt-1 text-xl font-bold text-gray-900">{selectedPost.title}</h2>
              </div>

              <div>
                <span className="text-sm font-medium">Slug:</span>
                <p className="text-sm text-gray-600 mt-1">{selectedPost.slug}</p>
              </div>

              <div>
                <span className="text-sm font-medium">Status:</span>
                <div className="mt-1">{getStatusBadge(selectedPost.status)}</div>
              </div>

              <div>
                <span className="text-sm font-medium">Excerpt:</span>
                <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">{selectedPost.excerpt}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>{selectedPost.views.toLocaleString()} views</span>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  onClick={() => openEditDialog(selectedPost)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
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
