import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  href?: string
  showText?: boolean
  textClassName?: string
}

export default function Logo({ className = "w-10 h-10", href = "/", showText = true, textClassName }: LogoProps) {
  const logoContent = (
    <div className="flex items-center space-x-2">
      <div
        className={`${className} rounded-lg flex items-center justify-center overflow-hidden`}
      >
        <Image 
          src="/logo.png" 
          alt="Boost Web Agency Logo" 
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold ${textClassName || "text-xl text-gray-900 dark:text-white"}`}>
            <span className="text-pink-600">Boost</span>{" "}
            <span className="text-blue-900 dark:text-blue-400">Web Agency</span>
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}