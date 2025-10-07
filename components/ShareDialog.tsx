"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Facebook,
  Twitter,
  Linkedin,
  PhoneIcon as Whatsapp,
  LinkIcon,
  Check,
  Mail,
  RssIcon as Reddit,
} from "lucide-react"

interface ShareDialogProps {
  url: string
  title: string
  description: string
  children: React.ReactNode // To allow the trigger button to be passed as a child
}

export function ShareDialog({ url, title, description, children }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
    )
  }

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        title,
      )}&summary=${encodeURIComponent(description)}`,
      "_blank",
    )
  }

  const shareOnWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${url}`)}`, "_blank")
  }

  const shareOnReddit = () => {
    window.open(
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank",
    )
  }

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
      description,
    )}%0A%0A${encodeURIComponent(url)}`
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      alert("Failed to copy link. Please copy it manually: " + url)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Product</DialogTitle>
          <DialogDescription>Share this product with your friends and family.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2 py-4">
          <Button
            onClick={shareOnFacebook}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Facebook className="h-6 w-6 text-blue-600 mb-1" />
            <span className="text-xs">Facebook</span>
          </Button>
          <Button
            onClick={shareOnTwitter}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Twitter className="h-6 w-6 text-blue-400 mb-1" />
            <span className="text-xs">Twitter</span>
          </Button>
          <Button
            onClick={shareOnLinkedin}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Linkedin className="h-6 w-6 text-blue-700 mb-1" />
            <span className="text-xs">LinkedIn</span>
          </Button>
          <Button
            onClick={shareOnWhatsapp}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Whatsapp className="h-6 w-6 text-green-500 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button
            onClick={shareOnReddit}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Reddit className="h-6 w-6 text-orange-500 mb-1" />
            <span className="text-xs">Reddit</span>
          </Button>
          <Button
            onClick={shareViaEmail}
            className="flex flex-col items-center justify-center h-20 w-20 p-0 bg-transparent"
            variant="outline"
          >
            <Mail className="h-6 w-6 text-gray-600 mb-1" />
            <span className="text-xs">Email</span>
          </Button>
          {/* Placeholder buttons to fill the row if needed, or adjust grid-cols based on total items */}
          <div className="h-20 w-20"></div> {/* Empty div to fill grid space */}
          <div className="h-20 w-20"></div> {/* Empty div to fill grid space */}
        </div>
        <Button onClick={copyLink} className="w-full justify-center bg-transparent" variant="outline">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-600" /> Copied!
            </>
          ) : (
            <>
              <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
