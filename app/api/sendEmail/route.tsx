import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const service = formData.get("service") as string
    const project_title = formData.get("project_title") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    // Prepare attachments
    const attachments = []
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      })
    }

    // Send email
    let emailSendSuccess = false
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #EC4899;">New Contact Form Submission</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service:</strong> ${service}</p>
              ${project_title ? `<p><strong>Project/Website:</strong> ${project_title}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
        attachments: attachments,
      })
      emailSendSuccess = true
    } catch (emailError) {
      console.error("Error sending email:", emailError)
    }

    if (emailSendSuccess) {
      return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Failed to send email." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ message: "Internal server error." }, { status: 500 })
  }
}
