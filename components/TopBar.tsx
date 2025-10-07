"use client"

import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function TopBar() {
  return (
    // This bar will now be fixed to the very top of the viewport on all screen sizes
    // Note: This component is no longer imported in the main layout to avoid overlap with the Header.
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-500 to-blue-600 text-white py-2 px-4 h-8">
      <div className="container mx-auto flex justify-between items-center text-xs md:text-sm h-full">
        <div className="flex items-center space-x-3 md:space-x-6">
          <a
            href="mailto:boostwebagency.info@gmail.com"
            className="flex items-center space-x-1 md:space-x-2 hover:text-pink-200 transition-colors"
          >
            <Mail size={14} className="md:w-4 md:h-4" />
            <span>boostwebagency.info@gmail.com</span>
          </a>
          <a
            href="tel:+8801603108425"
            className="flex items-center space-x-1 md:space-x-2 hover:text-pink-200 transition-colors"
          >
            <Phone size={14} className="md:w-4 md:h-4" />
            <span>+880 1603-108425</span>
          </a>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Added flex items-center justify-center to each anchor tag for precise icon centering */}
          <a
            href="https://www.facebook.com/BoostWebAgencyFb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:text-pink-200 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={16} className="md:w-4 md:h-4" />
          </a>
          <a
            href="https://x.com/boostwebagency"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:text-pink-200 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={16} className="md:w-4 md:h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/boostwebagency"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:text-pink-200 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} className="md:w-4 md:h-4" />
          </a>
          <a
            href="https://www.instagram.com/boostweb.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:text-pink-200 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} className="md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
