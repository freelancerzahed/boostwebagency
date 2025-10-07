import type { FAQ } from "@/types/faq"

// Static FAQ data to prevent JSON fetching issues
const FAQS: FAQ[] = [
  {
    id: "1",
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of digital services including web design and development, SEO optimization, social media marketing, brand identity design, e-commerce solutions, and custom CMS development.",
    category: "Services",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    question: "How long does it take to complete a website project?",
    answer:
      "Project timelines vary depending on complexity and requirements. A basic website typically takes 2-4 weeks, while more complex projects like e-commerce sites can take 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
    category: "Timeline",
    featured: true,
    order: 2,
  },
  {
    id: "3",
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages to keep your website secure, updated, and performing optimally. Our support includes regular backups, security updates, content updates, and technical assistance.",
    category: "Support",
    featured: true,
    order: 3,
  },
  {
    id: "4",
    question: "What is your pricing structure?",
    answer:
      "Our pricing varies based on project scope and requirements. We offer both fixed-price packages and custom quotes for larger projects. Contact us for a free consultation and personalized quote based on your specific needs.",
    category: "Pricing",
    featured: true,
    order: 4,
  },
  {
    id: "5",
    question: "Do you work with small businesses?",
    answer:
      "We work with businesses of all sizes, from startups and small local businesses to large enterprises. We have packages and solutions tailored to different budgets and requirements.",
    category: "Business",
    featured: false,
    order: 5,
  },
  {
    id: "6",
    question: "Can you help improve my existing website's SEO?",
    answer:
      "Yes, we offer comprehensive SEO audits and optimization services for existing websites. We'll analyze your current performance, identify opportunities for improvement, and implement strategies to boost your search engine rankings.",
    category: "SEO",
    featured: false,
    order: 6,
  },
  {
    id: "7",
    question: "Do you provide content creation services?",
    answer:
      "Yes, we offer content creation services including copywriting, blog posts, product descriptions, and marketing materials. Our content is optimized for both users and search engines to maximize engagement and visibility.",
    category: "Content",
    featured: false,
    order: 7,
  },
  {
    id: "8",
    question: "What platforms do you work with?",
    answer:
      "We work with various platforms including custom HTML/CSS, WordPress, Shopify, React, Next.js, and other modern web technologies. We'll recommend the best platform based on your specific needs and goals.",
    category: "Technology",
    featured: false,
    order: 8,
  },
]

export async function getFAQs(): Promise<FAQ[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return FAQS.sort((a, b) => a.order - b.order)
}

export async function getFeaturedFAQs(): Promise<FAQ[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return FAQS.filter((faq) => faq.featured).sort((a, b) => a.order - b.order)
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return FAQS.filter((faq) => faq.category.toLowerCase() === category.toLowerCase()).sort((a, b) => a.order - b.order)
}

export async function getFAQById(id: string): Promise<FAQ | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return FAQS.find((faq) => faq.id === id) || null
}
