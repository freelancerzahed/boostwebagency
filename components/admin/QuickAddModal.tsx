"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Package, Users, FileText, ShoppingCart, Check, X, Loader2 } from "lucide-react"

interface QuickAddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QuickAddModal({ open, onOpenChange }: QuickAddModalProps) {
  const [activeTab, setActiveTab] = useState("product")
  const [loading, setLoading] = useState(false)

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  })

  // User form state
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  })

  // Blog post form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    status: "draft",
  })

  // Order form state
  const [orderForm, setOrderForm] = useState({
    customer: "",
    email: "",
    total: "",
    status: "pending",
    items: "1",
  })

  const quickActions = [
    {
      id: "product",
      name: "Product",
      icon: Package,
      description: "Add a new product to inventory",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "user",
      name: "User",
      icon: Users,
      description: "Create a new user account",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "blog",
      name: "Blog Post",
      icon: FileText,
      description: "Write a new blog article",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "order",
      name: "Order",
      icon: ShoppingCart,
      description: "Create a manual order",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const handleSubmit = async (type: string) => {
    setLoading(true)

    try {
      let endpoint = ""
      let data = {}

      switch (type) {
        case "product":
          endpoint = "/api/admin/products"
          data = {
            name: productForm.name,
            category: productForm.category,
            price: Number.parseFloat(productForm.price),
            stock: Number.parseInt(productForm.stock),
            description: productForm.description,
            status: "active",
            createdAt: new Date().toISOString(),
          }
          break
        case "user":
          endpoint = "/api/admin/users"
          data = {
            name: userForm.name,
            email: userForm.email,
            role: userForm.role,
            phone: userForm.phone,
            status: "active",
            createdAt: new Date().toISOString(),
          }
          break
        case "blog":
          endpoint = "/api/admin/blog"
          data = {
            title: blogForm.title,
            category: blogForm.category,
            excerpt: blogForm.excerpt,
            status: blogForm.status,
            author: "Admin",
            createdAt: new Date().toISOString(),
          }
          break
        case "order":
          endpoint = "/api/admin/orders"
          data = {
            customer: orderForm.customer,
            email: orderForm.email,
            total: Number.parseFloat(orderForm.total),
            status: orderForm.status,
            items: Number.parseInt(orderForm.items),
            paymentMethod: "Manual",
            createdAt: new Date().toISOString(),
          }
          break
      }

      // Simulate API call for now - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, you would make the API call:
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      let message = ""
      switch (type) {
        case "product":
          message = `Product "${productForm.name}" added successfully!`
          setProductForm({ name: "", category: "", price: "", stock: "", description: "" })
          break
        case "user":
          message = `User "${userForm.name}" created successfully!`
          setUserForm({ name: "", email: "", role: "", phone: "" })
          break
        case "blog":
          message = `Blog post "${blogForm.title}" created successfully!`
          setBlogForm({ title: "", category: "", excerpt: "", status: "draft" })
          break
        case "order":
          message = `Order for "${orderForm.customer}" created successfully!`
          setOrderForm({ customer: "", email: "", total: "", status: "pending", items: "1" })
          break
      }

      toast({
        title: "Success!",
        description: message,
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForms = () => {
    setProductForm({ name: "", category: "", price: "", stock: "", description: "" })
    setUserForm({ name: "", email: "", role: "", phone: "" })
    setBlogForm({ title: "", category: "", excerpt: "", status: "draft" })
    setOrderForm({ customer: "", email: "", total: "", status: "pending", items: "1" })
  }

  const handleClose = () => {
    resetForms()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Quick Add</DialogTitle>
          <DialogDescription>Quickly create new content and manage your admin panel</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-4">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant={activeTab === action.id ? "default" : "outline"}
                  onClick={() => setActiveTab(action.id)}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 ${
                    activeTab === action.id ? "bg-blue-600 text-white" : "bg-transparent"
                  }`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop Tab List */}
          <TabsList className="hidden lg:grid w-full grid-cols-4 mb-6">
            {quickActions.map((action) => (
              <TabsTrigger key={action.id} value={action.id} className="flex items-center space-x-2">
                <action.icon className="w-4 h-4" />
                <span>{action.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Product Tab */}
          <TabsContent value="product" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Add New Product</span>
                </CardTitle>
                <CardDescription>Create a new product in your inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      placeholder="Enter product name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category *</Label>
                    <Select
                      value={productForm.category}
                      onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price *</Label>
                    <Input
                      id="product-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-stock">Stock Quantity *</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      placeholder="0"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Product description..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleSubmit("product")}
                    disabled={
                      !productForm.name || !productForm.category || !productForm.price || !productForm.stock || loading
                    }
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={handleClose} className="bg-transparent">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Tab */}
          <TabsContent value="user" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span>Add New User</span>
                </CardTitle>
                <CardDescription>Create a new user account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Full Name *</Label>
                    <Input
                      id="user-name"
                      placeholder="John Doe"
                      value={userForm.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email *</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="john@example.com"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role *</Label>
                    <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-phone">Phone</Label>
                    <Input
                      id="user-phone"
                      placeholder="+1234567890"
                      value={userForm.phone}
                      onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleSubmit("user")}
                    disabled={!userForm.name || !userForm.email || !userForm.role || loading}
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Create User
                  </Button>
                  <Button variant="outline" onClick={handleClose} className="bg-transparent">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Post Tab */}
          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>Create Blog Post</span>
                </CardTitle>
                <CardDescription>Write a new blog article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blog-title">Title *</Label>
                  <Input
                    id="blog-title"
                    placeholder="Enter blog post title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blog-category">Category *</Label>
                    <Select
                      value={blogForm.category}
                      onValueChange={(value) => setBlogForm({ ...blogForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blog-status">Status</Label>
                    <Select
                      value={blogForm.status}
                      onValueChange={(value) => setBlogForm({ ...blogForm, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-excerpt">Excerpt *</Label>
                  <Textarea
                    id="blog-excerpt"
                    placeholder="Brief description of the blog post..."
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleSubmit("blog")}
                    disabled={!blogForm.title || !blogForm.category || !blogForm.excerpt || loading}
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Create Post
                  </Button>
                  <Button variant="outline" onClick={handleClose} className="bg-transparent">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Tab */}
          <TabsContent value="order" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                  <span>Create Manual Order</span>
                </CardTitle>
                <CardDescription>Create a new order manually</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-customer">Customer Name *</Label>
                    <Input
                      id="order-customer"
                      placeholder="Customer name"
                      value={orderForm.customer}
                      onChange={(e) => setOrderForm({ ...orderForm, customer: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-email">Customer Email *</Label>
                    <Input
                      id="order-email"
                      type="email"
                      placeholder="customer@example.com"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-total">Total Amount *</Label>
                    <Input
                      id="order-total"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={orderForm.total}
                      onChange={(e) => setOrderForm({ ...orderForm, total: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-items">Number of Items</Label>
                    <Input
                      id="order-items"
                      type="number"
                      placeholder="1"
                      value={orderForm.items}
                      onChange={(e) => setOrderForm({ ...orderForm, items: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-status">Status</Label>
                  <Select
                    value={orderForm.status}
                    onValueChange={(value) => setOrderForm({ ...orderForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleSubmit("order")}
                    disabled={!orderForm.customer || !orderForm.email || !orderForm.total || loading}
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                    Create Order
                  </Button>
                  <Button variant="outline" onClick={handleClose} className="bg-transparent">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
