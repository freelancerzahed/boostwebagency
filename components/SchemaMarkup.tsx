export default function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://boostwebagency.com",
    name: "Boost Web Agency",
    description: "Professional web development and digital marketing agency specializing in custom web applications, e-commerce platforms, and digital marketing strategies.",
    url: "https://boostwebagency.com",
    image: "https://boostwebagency.com/logo.png",
    founder: {
      "@type": "Person",
      name: "Zahedul Islam",
      jobTitle: "Founder & CEO",
      description: "Web Application Developer and Digital Marketing Expert",
    },
    foundingDate: "2023",
    areaServed: ["BD", "Global"],
    serviceType: [
      "Web Development",
      "Digital Marketing",
      "E-Commerce Solutions",
      "SEO Optimization",
      "UI/UX Design",
    ],
    sameAs: [
      "https://www.facebook.com/boostwebagency",
      "https://www.linkedin.com/company/boostwebagency",
      "https://twitter.com/boostwebagency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@boostwebagency.com",
      availableLanguage: ["en", "bn"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressRegion: "Bangladesh",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
