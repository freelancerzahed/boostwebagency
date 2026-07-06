import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"

// Configure email transporter
const getTransporter = () => {
  // Check if we're in test mode
  if (process.env.EMAIL_TEST_MODE === "true" || !process.env.EMAIL_USER) {
    console.log("📧 Email Test Mode: Emails will be logged but not sent")
    return null
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const project_title = formData.get("project_title") as string
    const choose_service = formData.get("choose_service") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    // Validate required fields
    if (!name || !email || !phone || !choose_service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Prepare file attachment if provided
    let attachments: any[] = []
    if (file) {
      const buffer = await file.arrayBuffer()
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
      })
    }

    const transporter = getTransporter()
    const isTestMode = transporter === null

    // Email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER || "boostwebagency.info@gmail.com",
      to: email,
      subject: "Your FREE Digital Marketing Proposal - Boost Web Agency",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #2563eb 100%); color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="margin: 0;">Thank You, ${name}!</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for requesting your FREE Digital Marketing Proposal from <strong>Boost Web Agency</strong>!
            </p>

            <h2 style="color: #1f2937; margin-top: 20px;">Your Submission Details:</h2>
            <div style="background-color: white; border-left: 4px solid #ec4899; padding: 15px; margin: 15px 0; border-radius: 4px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service Requested:</strong> ${choose_service.replace(/-/g, " ").toUpperCase()}</p>
              ${project_title ? `<p><strong>Project:</strong> ${project_title}</p>` : ""}
            </div>

            <h2 style="color: #1f2937; margin-top: 20px;">What's Next?</h2>
            <ol style="color: #374151; line-height: 1.8; font-size: 14px;">
              <li>Our team will review your request within 24 hours</li>
              <li>We'll prepare a customized proposal based on your needs</li>
              <li>You'll receive the proposal via email with detailed recommendations</li>
              <li>We'll follow up to discuss and answer any questions</li>
            </ol>

            <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
              <p style="color: #92400e; font-weight: bold; margin: 0;">
                💡 In the meantime, check out our <strong>portfolio</strong> at <a href="https://boostwebagency.com" style="color: #ec4899; text-decoration: none;">boostwebagency.com</a>
              </p>
            </div>

            <h2 style="color: #1f2937; margin-top: 20px;">Quick Links:</h2>
            <ul style="color: #374151; font-size: 14px; line-height: 1.8;">
              <li>📞 Call us: <a href="tel:+8801603108425" style="color: #ec4899; text-decoration: none;">+880 1603-108425</a></li>
              <li>📧 Email us: <a href="mailto:boostwebagency.info@gmail.com" style="color: #ec4899; text-decoration: none;">boostwebagency.info@gmail.com</a></li>
              <li>🌐 Visit us: <a href="https://boostwebagency.com" style="color: #ec4899; text-decoration: none;">boostwebagency.com</a></li>
            </ul>
          </div>

          <div style="background-color: #1f2937; color: white; text-align: center; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px;">
              © 2024 Boost Web Agency. All rights reserved.
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">
              We look forward to helping your business grow!
            </p>
          </div>
        </div>
      `,
    }

    // Email to company
    const companyMailOptions = {
      from: process.env.EMAIL_USER || "boostwebagency.info@gmail.com",
      to: process.env.COMPANY_EMAIL || "boostwebagency.info@gmail.com",
      subject: `NEW Proposal Request: ${choose_service} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899 0%, #2563eb 100%); color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="margin: 0;">🎉 New Proposal Request Received!</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937;">Client Information:</h2>
            <div style="background-color: white; border-left: 4px solid #2563eb; padding: 15px; margin: 15px 0; border-radius: 4px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></p>
            </div>

            <h2 style="color: #1f2937;">Project Details:</h2>
            <div style="background-color: white; border-left: 4px solid #ec4899; padding: 15px; margin: 15px 0; border-radius: 4px;">
              <p><strong>Service:</strong> ${choose_service.replace(/-/g, " ").toUpperCase()}</p>
              ${project_title ? `<p><strong>Project URL/Title:</strong> ${project_title}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}?subject=Re: Your Digital Marketing Proposal" style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #2563eb 100%); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Reply to ${name}
              </a>
            </div>
          </div>

          <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              ${file ? `<strong>File attached:</strong> ${file.name}` : "No file attached"}
            </p>
          </div>
        </div>
      `,
      attachments: attachments,
    }

    // Send emails or log in test mode
    if (isTestMode) {
      console.log("📧 TEST MODE: Client Email:")
      console.log(clientMailOptions)
      console.log("\n📧 TEST MODE: Company Email:")
      console.log(companyMailOptions)

      return NextResponse.json(
        {
          message: "✅ Proposal request received (Test Mode)! In production, confirmation emails would be sent.",
          status: "sent",
          testMode: true,
        },
        { status: 200 }
      )
    } else {
      // Send both emails
      await transporter!.sendMail(clientMailOptions)
      await transporter!.sendMail(companyMailOptions)

      return NextResponse.json(
        {
          message: "✅ Emails sent successfully!",
          status: "sent",
        },
        { status: 200 }
      )
    }
  } catch (error: any) {
    console.error("Email error:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
