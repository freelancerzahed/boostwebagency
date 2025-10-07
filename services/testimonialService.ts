import type { Testimonial } from "@/types/testimonial"

// Static testimonial data to prevent JSON fetching issues
const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Inc.",
    content:
      "Working with this team transformed our online presence completely. Our website traffic increased by 300% within just 3 months of launch.",
    rating: 5,
    image: "/testimonials/sarah-johnson-ceo.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Marketing Director",
    company: "GrowthCorp",
    content:
      "The SEO optimization service exceeded our expectations. We're now ranking #1 for our main keywords and seeing consistent organic growth.",
    rating: 5,
    image: "/testimonials/michael-chen-marketing.jpg",
    featured: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Founder",
    company: "Creative Studio",
    content:
      "The brand identity design perfectly captured our vision. The logo and visual guidelines have helped us stand out in a crowded market.",
    rating: 5,
    image: "/testimonials/emily-rodriguez-founder.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "David Thompson",
    position: "E-commerce Manager",
    company: "RetailPlus",
    content:
      "Our new e-commerce platform has streamlined our operations and improved customer experience. Sales have increased by 150% since launch.",
    rating: 5,
    image: "/testimonials/david-thompson-ecommerce.jpg",
    featured: false,
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Operations Manager",
    company: "ServicePro",
    content:
      "The custom CMS makes updating our website content so easy. We can now keep our site fresh and engaging without technical expertise.",
    rating: 5,
    image: "/testimonials/lisa-wang-operations.jpg",
    featured: false,
  },
  {
    id: "6",
    name: "James Miller",
    position: "Small Business Owner",
    company: "Local Cafe",
    content:
      "The social media marketing strategy has helped us connect with our community and attract new customers. Our engagement rates have tripled!",
    rating: 5,
    image: "/testimonials/james-miller-business-owner.jpg",
    featured: false,
  },
]

export async function getTestimonials(): Promise<Testimonial[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TESTIMONIALS
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TESTIMONIALS.filter((testimonial) => testimonial.featured)
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TESTIMONIALS.find((testimonial) => testimonial.id === id) || null
}
