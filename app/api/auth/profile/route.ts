import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database - replace with real database
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    phone: "+1234567890",
    avatar: "",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user-session")

    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const currentUser = JSON.parse(sessionCookie.value)
    const updateData = await request.json()

    // Find and update user in mock database
    const userIndex = MOCK_USERS.findIndex((u) => u.id === currentUser.id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Update user data
    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      name: updateData.name || MOCK_USERS[userIndex].name,
      email: updateData.email || MOCK_USERS[userIndex].email,
      phone: updateData.phone || MOCK_USERS[userIndex].phone,
      address: updateData.address || MOCK_USERS[userIndex].address,
    }

    // Update session
    const updatedUser = {
      id: MOCK_USERS[userIndex].id,
      name: MOCK_USERS[userIndex].name,
      email: MOCK_USERS[userIndex].email,
      phone: MOCK_USERS[userIndex].phone,
      avatar: MOCK_USERS[userIndex].avatar,
      address: MOCK_USERS[userIndex].address,
      createdAt: MOCK_USERS[userIndex].createdAt,
    }

    cookieStore.set("user-session", JSON.stringify(updatedUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
