import Link from "next/link"

interface CTABannerProps {
  title?: string
  description?: string
  buttonText?: string
  href?: string
}

export default function CTABanner({
  title = "Ready to Get Started?",
  description = "Let's discuss your project and create a solution that drives results.",
  buttonText = "Get Free Consultation",
  href = "/chat"
}: CTABannerProps) {
  return (
    <div className="mt-12 md:mt-16 text-center">
      <div className="bg-gradient-to-r from-pink-500 to-blue-600 p-6 md:p-8 rounded-3xl text-white dark:text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-white/90 dark:text-white/80 mb-6 text-sm md:text-base max-w-xl mx-auto">
          {description}
        </p>
        <Link
          href={href}
          className="inline-block bg-white text-pink-600 dark:bg-gray-900 dark:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}