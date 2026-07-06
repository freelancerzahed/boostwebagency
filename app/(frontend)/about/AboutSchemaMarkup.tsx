"use client"

export default function AboutSchemaMarkup() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://boostwebagency.com/#organization",
    name: "Boost Web Agency",
    description: "Professional web development and digital marketing agency specializing in custom web applications, e-commerce platforms, and digital marketing strategies.",
    url: "https://boostwebagency.com",
    image: "https://boostwebagency.com/logo.png",
    founder: {
      "@type": "Person",
      "@id": "https://boostwebagency.com/#founder",
      name: "Zahedul Islam",
      jobTitle: "Founder & CEO",
      description: "Web Application Developer and Digital Marketing Expert",
      url: "https://boostwebagency.com",
      workLocation: {
        "@type": "Place",
        name: "Bangladesh",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BD",
        },
      },
      knows: [
        "Web Development",
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Digital Marketing",
        "SEO",
        "Content Marketing",
      ],
    },
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
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    serviceType: [
      "Web Application Development",
      "Custom Website Design",
      "E-Commerce Solutions",
      "Digital Marketing",
      "SEO Optimization",
      "UI/UX Design",
      "Brand Strategy",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://boostwebagency.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://boostwebagency.com/about",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
