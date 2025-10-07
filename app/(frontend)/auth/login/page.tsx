"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Eye, EyeOff, ArrowRight, Lock, Mail, User, Shield } from "lucide-react"
import Logo from "@/components/Logo"
import { useAuth } from "@/hooks/useAuth"

export default function UnifiedLoginPage() {
  const [loginType, setLoginType] = useState<"user" | "admin">("user")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  // Initialize dummy user in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const users = localStorage.getItem("app_users")
      if (!users) {
        const dummyUsers = [
          {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            phone: "1234567890",
            avatar: "/profiles/john-doe-profile.jpg",
          },
        ]
        localStorage.setItem("app_users", JSON.stringify(dummyUsers))
      }
    }
  }, [])

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      router.push("/account")
    } else {
      setError(result.message || "Invalid email or password")
    }

    setIsLoading(false)
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        window.location.href = "/admin"
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillUserCredentials = () => {
    setEmail("test@example.com")
    setPassword("password123")
    setError("")
  }

  const fillAdminCredentials = (username: string, password: string) => {
    setUsername(username)
    setPassword(password)
    setError("")
  }

  const adminCredentials = [
    { username: "jahed", password: "1234", role: "Super Admin" },
    { username: "admin", password: "admin123", role: "Admin" },
    { username: "manager", password: "manager456", role: "Manager" },
    { username: "editor", password: "editor123", role: "Editor" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[520px] space-y-6">
          {/* Header with brand logo */}
          <div className="text-center space-y-4">
            <Logo size="lg" showText={true} className="mx-auto" />
            <p className="text-muted-foreground text-lg">Welcome back! Sign in to continue</p>
          </div>

          {/* Login form card with tabs */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
            <Tabs defaultValue="user" className="w-full" onValueChange={(v) => setLoginType(v as "user" | "admin")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              {/* User Login Tab */}
              <TabsContent value="user" className="space-y-6">
                <form onSubmit={handleUserLogin} className="space-y-6">
                  {/* Email field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-foreground flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4 text-pink-500" />
                      <span>Email address</span>
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="h-12 pl-4 pr-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-pink-500 dark:focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 dark:group-hover:border-pink-700"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="user-password"
                        className="text-sm font-semibold text-foreground flex items-center space-x-2"
                      >
                        <Lock className="w-4 h-4 text-blue-500" />
                        <span>Password</span>
                      </Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs font-medium bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative group">
                      <Input
                        id="user-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="h-12 pl-4 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <Alert variant="destructive" className="py-3 rounded-xl animate-in fade-in-0 slide-in-from-top-2">
                      <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-xl font-semibold text-base hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to your account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo credentials for user */}
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-950/20 dark:to-blue-950/20 border-2 border-pink-200 dark:border-pink-800/50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Demo User Account</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 text-pink-500" />
                          <code className="font-mono text-foreground">test@example.com</code>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Lock className="w-3 h-3 text-blue-500" />
                          <code className="font-mono text-foreground">password123</code>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={fillUserCredentials}
                        size="sm"
                        className="w-full mt-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white hover:shadow-lg"
                      >
                        Use Demo Credentials
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Register link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="font-semibold bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                      Create a free account
                    </Link>
                  </p>
                </div>
              </TabsContent>

              {/* Admin Login Tab */}
              <TabsContent value="admin" className="space-y-6">
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  {/* Username field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-semibold text-foreground flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-pink-500" />
                      <span>Username</span>
                    </Label>
                    <div className="relative group">
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        className="h-12 pl-4 pr-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-pink-500 dark:focus:border-pink-500 transition-all duration-300 group-hover:border-pink-300 dark:group-hover:border-pink-700"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="admin-password"
                      className="text-sm font-semibold text-foreground flex items-center space-x-2"
                    >
                      <Lock className="w-4 h-4 text-blue-500" />
                      <span>Password</span>
                    </Label>
                    <div className="relative group">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="h-12 pl-4 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-10 w-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <Alert variant="destructive" className="py-3 rounded-xl animate-in fade-in-0 slide-in-from-top-2">
                      <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-xl font-semibold text-base hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to Admin Panel
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo credentials for admin */}
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-950/20 dark:to-blue-950/20 border-2 border-pink-200 dark:border-pink-800/50 rounded-xl p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-pink-500" />
                      <h4 className="font-semibold text-sm text-foreground">Demo Admin Accounts</h4>
                    </div>
                    <div className="space-y-2">
                      {adminCredentials.map((cred, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 text-xs">
                              <code className="font-mono font-semibold text-foreground">{cred.username}</code>
                              <span className="text-gray-400">/</span>
                              <code className="font-mono text-foreground">{cred.password}</code>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{cred.role}</div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fillAdminCredentials(cred.username, cred.password)}
                            className="text-xs h-7 px-2"
                          >
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
