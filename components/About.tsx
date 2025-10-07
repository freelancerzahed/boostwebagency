import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <section className="py-5 bg-white dark:bg-background transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="relative z-10 transform transition-all duration-700 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop&crop=center"
                alt="Creative Team working together"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {/* Background Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-100 dark:bg-pink-300/20 rounded-full -z-10 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 dark:bg-blue-300/20 rounded-full -z-10 animate-pulse"></div>

            {/* Floating icons */}
            <div className="absolute top-10 right-10 w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center animate-spin">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p
                className="text-pink-500 font-semibold mb-4 uppercase tracking-wide animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                ABOUT US
              </p>
              <h2
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up"
                style={{ animationDelay: "300ms" }}
              >
                Creative Team Dedicated to Building Exceptional Websites
              </h2>
              <p
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                At Boost Web Agency, our talented team is committed to creating outstanding websites tailored to your
                needs. We combine creativity with technical expertise to deliver innovative solutions that enhance your
                online presence. Our focus is on delivering high-quality results through strategic design and
                development.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {["Innovative Solutions", "Dedicated Team", "Commitment to Quality"].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 transform transition-all duration-500 hover:translate-x-2 animate-fade-in-up"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block bg-gradient-to-r from-pink-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${500 + 3 * 100}ms` }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
