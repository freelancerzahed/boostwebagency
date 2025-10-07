"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  MoreHorizontal,
  Loader2,
  X,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive" | "out_of_stock"
  sales: number
  image: string
  description?: string
  createdAt: string
}

interface ProductFormData {
  name: string
  category: string
  price: string
  stock: string
  description: string
  image: string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  })

  const [formErrors, setFormErrors] = useState<Partial<ProductFormData>>({})

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 99.99,
      stock: 45,
      status: "active",
      sales: 234,
      image: "/placeholder.svg?height=50&width=50&text=Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 199.99,
      stock: 23,
      status: "active",
      sales: 156,
      image: "/placeholder.svg?height=50&width=50&text=Smartwatch",
      description: "Advanced fitness tracking with heart rate monitor",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      price: 29.99,
      stock: 0,
      status: "out_of_stock",
      sales: 89,
      image: "/placeholder.svg?height=50&width=50&text=T-Shirt",
      description: "Comfortable organic cotton t-shirt in various colors",
      createdAt: "2024-01-13",
    },
  ])

  const stats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      change: "+12%",
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Active Products",
      value: products.filter((p) => p.status === "active").length.toString(),
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Revenue",
      value: `$${products.reduce((sum, p) => sum + p.price * p.sales, 0).toLocaleString()}`,
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Out of Stock Items",
      value: products.filter((p) => p.stock === 0).length.toString(),
      change: "-5%",
      icon: AlertTriangle,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const validateForm = (data: ProductFormData): boolean => {
    const errors: Partial<ProductFormData> = {}

    if (!data.name.trim()) {
      errors.name = "Product name is required"
    }

    if (!data.category) {
      errors.category = "Category is required"
    }

    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
      errors.price = "Valid price is required"
    }

    if (!data.stock || isNaN(Number(data.stock)) || Number(data.stock) < 0) {
      errors.stock = "Valid stock quantity is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
    })
    setFormErrors({})
    setEditingProduct(null)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(formData)) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: Number(formData.stock) > 0 ? "active" : "out_of_stock",
        sales: 0,
        image: formData.image.trim() || `/placeholder.svg?height=50&width=50&text=${encodeURIComponent(formData.name)}`,
        description: formData.description.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      }

      setProducts((prev) => [newProduct, ...prev])
      resetForm()
      setIsAddModalOpen(false)

      toast({
        title: "Success!",
        description: `Product "${newProduct.name}" has been added successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(formData) || !editingProduct) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedProduct: Product = {
        ...editingProduct,
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: Number(formData.stock) > 0 ? "active" : "out_of_stock",
        image: formData.image.trim() || editingProduct.image,
        description: formData.description.trim(),
      }

      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
      resetForm()
      setIsEditModalOpen(false)

      toast({
        title: "Success!",
        description: `Product "${updatedProduct.name}" has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (product: Product) => {
    setIsDeleting(product.id)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setProducts((prev) => prev.filter((p) => p.id !== product.id))

      toast({
        title: "Success!",
        description: `Product "${product.name}" has been deleted successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      image: product.image,
    })
    setIsEditModalOpen(true)
  }

  const handleViewClick = (product: Product) => {
    setViewingProduct(product)
    setIsViewModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
            Inactive
          </Badge>
        )
      case "out_of_stock":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
            Out of Stock
          </Badge>
        )
      default:
        return <Badge className="dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">{status}</Badge>
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "text-red-600 dark:text-red-400"
    if (stock < 20) return "text-orange-600 dark:text-orange-400"
    return "text-green-600 dark:text-green-400"
  }

  const MobileModal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
  }: {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    children: React.ReactNode
  }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="dark:hover:bg-gray-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
        </div>
      </div>
    )
  }

  const ProductForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="dark:text-gray-200">
            Product Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className={`${formErrors.name ? "border-red-500" : ""} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100`}
          />
          {formErrors.name && <p className="text-sm text-red-500 dark:text-red-400">{formErrors.name}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category" className="dark:text-gray-200">
            Category *
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger
              className={`${formErrors.category ? "border-red-500" : ""} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100`}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="Electronics" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Electronics
              </SelectItem>
              <SelectItem value="Clothing" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Clothing
              </SelectItem>
              <SelectItem value="Home & Garden" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Home & Garden
              </SelectItem>
              <SelectItem value="Sports" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Sports
              </SelectItem>
              <SelectItem value="Books" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Books
              </SelectItem>
            </SelectContent>
          </Select>
          {formErrors.category && <p className="text-sm text-red-500 dark:text-red-400">{formErrors.category}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price" className="dark:text-gray-200">
              Price ($) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              className={`${formErrors.price ? "border-red-500" : ""} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100`}
            />
            {formErrors.price && <p className="text-sm text-red-500 dark:text-red-400">{formErrors.price}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock" className="dark:text-gray-200">
              Stock Quantity *
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              value={formData.stock}
              onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
              className={`${formErrors.stock ? "border-red-500" : ""} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100`}
            />
            {formErrors.stock && <p className="text-sm text-red-500 dark:text-red-400">{formErrors.stock}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image" className="dark:text-gray-200">
            Image URL
          </Label>
          <Input
            id="image"
            placeholder="https://example.com/image.jpg (optional)"
            value={formData.image}
            onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className="dark:text-gray-200">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Product description..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 dark:bg-blue-600 dark:hover:bg-blue-700">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Updating..." : "Adding..."}
            </>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetForm()
            setIsAddModalOpen(false)
            setIsEditModalOpen(false)
          }}
          className="flex-1 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Cancel
        </Button>
      </div>
    </form>
  )

  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Products</h1>
            <p className="text-pink-50 text-sm md:text-base">Manage your product inventory and catalog</p>
          </div>
          {isDesktop ? (
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-white text-pink-600 hover:bg-pink-50 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-gray-100">Add New Product</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Create a new product in your inventory. Fill in the details below.
                  </DialogDescription>
                </DialogHeader>
                <ProductForm onSubmit={handleAddProduct} />
              </DialogContent>
            </Dialog>
          ) : (
            <>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full sm:w-auto bg-white text-pink-600 hover:bg-pink-50 shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <MobileModal
                isOpen={isAddModalOpen}
                onClose={() => {
                  resetForm()
                  setIsAddModalOpen(false)
                }}
                title="Add New Product"
                description="Create a new product in your inventory. Fill in the details below."
              >
                <ProductForm onSubmit={handleAddProduct} />
              </MobileModal>
            </>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {isDesktop ? (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Edit Product</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Update the product information below.
              </DialogDescription>
            </DialogHeader>
            <ProductForm onSubmit={handleEditProduct} isEdit />
          </DialogContent>
        </Dialog>
      ) : (
        <MobileModal
          isOpen={isEditModalOpen}
          onClose={() => {
            resetForm()
            setIsEditModalOpen(false)
          }}
          title="Edit Product"
          description="Update the product information below."
        >
          <ProductForm onSubmit={handleEditProduct} isEdit />
        </MobileModal>
      )}

      {/* View Product Modal */}
      {isDesktop ? (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Product Details</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                View detailed information about this product.
              </DialogDescription>
            </DialogHeader>
            {viewingProduct && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={viewingProduct.image || "/placeholder.svg"}
                    alt={viewingProduct.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{viewingProduct.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ID: {viewingProduct.id}</p>
                    {getStatusBadge(viewingProduct.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</Label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingProduct.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Price</Label>
                    <p className="text-gray-900 dark:text-gray-100">${viewingProduct.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Stock</Label>
                    <p className={getStockStatus(viewingProduct.stock)}>{viewingProduct.stock} units</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Sales</Label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingProduct.sales} sold</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Created Date</Label>
                  <p className="text-gray-900 dark:text-gray-100">{viewingProduct.createdAt}</p>
                </div>

                {viewingProduct.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</Label>
                    <p className="text-gray-900 dark:text-gray-100">{viewingProduct.description}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      setIsViewModalOpen(false)
                      handleEditClick(viewingProduct)
                    }}
                    className="flex-1 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsViewModalOpen(false)}
                    className="flex-1 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <MobileModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Product Details"
          description="View detailed information about this product."
        >
          {viewingProduct && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={viewingProduct.image || "/placeholder.svg"}
                  alt={viewingProduct.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg truncate">{viewingProduct.name}</div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {viewingProduct.category} • ID: {viewingProduct.id}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">${viewingProduct.price.toFixed(2)}</span>
                    <span className={getStockStatus(viewingProduct.stock)}>{viewingProduct.stock} units</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {getStatusBadge(viewingProduct.status)}
                    <span className="text-sm text-muted-foreground">{viewingProduct.sales} sold</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg"
                  >
                    <DropdownMenuItem
                      className="flex items-center gap-2 rounded-lg"
                      onClick={() => handleViewClick(viewingProduct)}
                    >
                      <Eye className="h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 rounded-lg"
                      onClick={() => handleEditClick(viewingProduct)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 rounded-lg"
                      onClick={() => handleDeleteProduct(viewingProduct)}
                      disabled={isDeleting === viewingProduct.id}
                    >
                      {isDeleting === viewingProduct.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </MobileModal>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const gradients = [
            "from-pink-500 to-rose-500",
            "from-emerald-500 to-teal-500",
            "from-amber-500 to-orange-500",
            "from-blue-500 to-indigo-500",
          ]
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${gradients[index]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-8 w-8 text-white/90" />
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-pink-500"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-pink-500">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all" className="dark:text-gray-100 dark:hover:bg-gray-700">
                All Categories
              </SelectItem>
              <SelectItem value="Electronics" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Electronics
              </SelectItem>
              <SelectItem value="Clothing" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Clothing
              </SelectItem>
              <SelectItem value="Home & Garden" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Home & Garden
              </SelectItem>
              <SelectItem value="Sports" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Sports
              </SelectItem>
              <SelectItem value="Books" className="dark:text-gray-100 dark:hover:bg-gray-700">
                Books
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList className="w-full md:w-auto flex-wrap h-auto dark:bg-gray-800">
            <TabsTrigger
              value="all"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              All Products
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              Inactive
            </TabsTrigger>
            <TabsTrigger
              value="out_of_stock"
              className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              Out of Stock
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle>Product Inventory ({filteredProducts.length})</CardTitle>
              <CardDescription>
                A list of all products in your inventory with their current status and stock levels.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {searchTerm || selectedCategory !== "all" ? "No Products Found" : "No Products Yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory !== "all"
                      ? "Adjust your search or filters to find products."
                      : "Get started by adding your first product to the inventory."}
                  </p>
                  {!searchTerm && selectedCategory === "all" && (
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Product
                    </Button>
                  )}
                </div>
              ) : isDesktop ? (
                <div className="rounded-2xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-0">
                        <TableHead className="text-white font-semibold">Product</TableHead>
                        <TableHead className="text-white font-semibold">Category</TableHead>
                        <TableHead className="text-white font-semibold">Price</TableHead>
                        <TableHead className="text-white font-semibold">Stock</TableHead>
                        <TableHead className="text-white font-semibold">Sales</TableHead>
                        <TableHead className="text-white font-semibold">Status</TableHead>
                        <TableHead className="text-right text-white font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-950/20 dark:hover:to-rose-950/20 transition-all duration-200 border-b border-gray-100 dark:border-gray-800"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-xl object-cover shadow-md"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">{product.name}</div>
                                <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="rounded-lg font-medium">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span className={getStockStatus(product.stock)}>{product.stock} units</span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{product.sales} sold</TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                title="View Product"
                                onClick={() => handleViewClick(product)}
                                className="h-9 w-9 p-0 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 rounded-lg transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Edit Product"
                                onClick={() => handleEditClick(product)}
                                className="h-9 w-9 p-0 hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-950 dark:hover:text-amber-400 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 rounded-lg transition-colors"
                                title="Delete Product"
                                onClick={() => handleDeleteProduct(product)}
                                disabled={isDeleting === product.id}
                              >
                                {isDeleting === product.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 p-4">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0"
                    >
                      <CardContent className="flex items-center space-x-4 p-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-lg truncate">{product.name}</div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {product.category} • ID: {product.id}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                            <span className={getStockStatus(product.stock)}>{product.stock} units</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            {getStatusBadge(product.status)}
                            <span className="text-sm text-muted-foreground">{product.sales} sold</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg"
                          >
                            <DropdownMenuItem
                              className="flex items-center gap-2 rounded-lg"
                              onClick={() => handleViewClick(product)}
                            >
                              <Eye className="h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 rounded-lg"
                              onClick={() => handleEditClick(product)}
                            >
                              <Edit className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-600 dark:text-red-400 rounded-lg"
                              onClick={() => handleDeleteProduct(product)}
                              disabled={isDeleting === product.id}
                            >
                              {isDeleting === product.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Active Products</CardTitle>
              <CardDescription className="dark:text-gray-400">Products currently available for sale</CardDescription>
            </CardHeader>
            <CardContent>
              {products.filter((p) => p.status === "active").length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Active Products</h3>
                  <p className="text-gray-600 dark:text-gray-400">Add products with stock to see them here.</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Active Products</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {products.filter((p) => p.status === "active").length} active products in your inventory
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Inactive Products</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Products currently not available for sale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Inactive Products</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {products.filter((p) => p.status === "inactive").length} inactive products
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="out_of_stock">
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Out of Stock Alert</CardTitle>
              <CardDescription className="dark:text-gray-400">Products with zero inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              {products.filter((p) => p.stock === 0).length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">All Products In Stock</h3>
                  <p className="text-gray-600 dark:text-gray-400">Great! No products are currently out of stock.</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Out of Stock Items</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {products.filter((p) => p.stock === 0).length} products need restocking
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
