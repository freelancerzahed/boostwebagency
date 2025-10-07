import { NextResponse } from "next/server"

// Mock data for subscribers/contacts
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    choose_service: "Web Development",
    project_title: "E-commerce Website",
    message: "I need a modern e-commerce platform with payment integration and inventory management.",
    hasAttachment: false,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "new",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@techstartup.com",
    phone: "+1 (555) 234-5678",
    choose_service: "Mobile App Development",
    project_title: "Fitness Tracking App",
    message: "Looking for a cross-platform mobile app with real-time data sync and social features.",
    hasAttachment: true,
    attachmentName: "app-mockup.pdf",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "contacted",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@designstudio.com",
    phone: "+1 (555) 345-6789",
    choose_service: "UI/UX Design",
    project_title: "SaaS Dashboard Redesign",
    message: "Need a complete UI/UX overhaul for our analytics dashboard. Focus on data visualization.",
    hasAttachment: false,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in_progress",
  },
  {
    id: "4",
    name: "David Thompson",
    email: "d.thompson@retailco.com",
    phone: "+1 (555) 456-7890",
    choose_service: "Digital Marketing",
    project_title: "SEO Campaign",
    message: "Want to improve our search rankings and increase organic traffic by 50%.",
    hasAttachment: false,
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@fooddelivery.com",
    phone: "+1 (555) 567-8901",
    choose_service: "Web Development",
    project_title: "Restaurant Ordering System",
    message: "Building a food delivery platform with real-time order tracking and driver management.",
    hasAttachment: true,
    attachmentName: "requirements.docx",
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: "new",
  },
  {
    id: "6",
    name: "James Miller",
    email: "james.m@consulting.com",
    phone: "+1 (555) 678-9012",
    choose_service: "Branding",
    project_title: "Complete Brand Identity",
    message: "Need logo design, brand guidelines, and marketing materials for new consulting firm.",
    hasAttachment: false,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "contacted",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ contacts: mockContacts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
