import type { TeamMember } from "@/types/team-member"

// Static team data to prevent JSON fetching issues
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "CEO & Founder",
    bio: "With over 10 years of experience in digital marketing and web development, Alex leads our team with vision and expertise.",
    image: "/team/alex-johnson-ceo.jpg",
    email: "alex@company.com",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    skills: ["Leadership", "Strategy", "Digital Marketing"],
    featured: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    position: "Lead Developer",
    bio: "Sarah is a full-stack developer with expertise in modern web technologies and a passion for creating exceptional user experiences.",
    image: "/team/sarah-chen-developer.jpg",
    email: "sarah@company.com",
    linkedin: "https://linkedin.com/in/sarahchen",
    github: "https://github.com/sarahchen",
    skills: ["React", "Node.js", "TypeScript", "Next.js"],
    featured: true,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    position: "Creative Director",
    bio: "Michael brings creativity and innovation to every project, ensuring our designs are both beautiful and functional.",
    image: "/team/michael-rodriguez-creative.jpg",
    email: "michael@company.com",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
    behance: "https://behance.net/michaelrodriguez",
    skills: ["UI/UX Design", "Branding", "Adobe Creative Suite"],
    featured: true,
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "SEO Specialist",
    bio: "Emily specializes in search engine optimization and helps our clients achieve top rankings and increased organic traffic.",
    image: "/team/emily-davis-seo.jpg",
    email: "emily@company.com",
    linkedin: "https://linkedin.com/in/emilydavis",
    skills: ["SEO", "Analytics", "Content Strategy"],
    featured: true,
  },
  {
    id: "5",
    name: "David Kim",
    position: "Marketing Manager",
    bio: "David develops and executes comprehensive marketing strategies that drive growth and engagement for our clients.",
    image: "/team/david-kim-marketing.jpg",
    email: "david@company.com",
    linkedin: "https://linkedin.com/in/davidkim",
    skills: ["Digital Marketing", "Social Media", "PPC"],
    featured: false,
  },
  {
    id: "6",
    name: "Jessica Thompson",
    position: "Project Manager",
    bio: "Jessica ensures all projects are delivered on time and within budget while maintaining the highest quality standards.",
    image: "/team/jessica-thompson-pm.jpg",
    email: "jessica@company.com",
    linkedin: "https://linkedin.com/in/jessicathompson",
    skills: ["Project Management", "Agile", "Client Relations"],
    featured: false,
  },
]

export async function getTeamMembers(): Promise<TeamMember[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TEAM_MEMBERS
}

export async function getFeaturedTeamMembers(): Promise<TeamMember[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TEAM_MEMBERS.filter((member) => member.featured)
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return TEAM_MEMBERS.find((member) => member.id === id) || null
}
