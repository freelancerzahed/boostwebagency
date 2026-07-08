import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server"
import emailConfig from "../../../config/email.config"

// Configure email transporter
const getTransporter = async () => {
  // Support both environment variables and a local config file
  const EMAIL_TEST_MODE = (emailConfig.EMAIL_TEST_MODE === "true" || emailConfig.EMAIL_TEST_MODE === true)
  const EMAIL_USER = emailConfig.EMAIL_USER
  const EMAIL_PASSWORD = emailConfig.EMAIL_PASSWORD

  if (EMAIL_TEST_MODE) {
    console.log("📧 Email Test Mode: Emails will be logged but not sent")
    return null
  }

  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    throw new Error("Missing SMTP credentials. Set EMAIL_USER and EMAIL_PASSWORD.")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    // Improve email authentication and deliverability
    connectionUrl: process.env.SMTP_CONNECTION_URL,
  })

  try {
    await transporter.verify()
    console.log("📧 SMTP transporter verified successfully")
  } catch (verifyError) {
    console.error("SMTP verification failed:", verifyError)
    throw verifyError
  }

  return transporter
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
    if (!name || !email || !choose_service || !message) {
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

    const transporter = await getTransporter()
    const isTestMode = transporter === null

    if (isTestMode) {
      throw new Error("Email Test Mode is enabled or SMTP credentials are missing. Set proper Gmail credentials to send real email.")
    }

    const fromEmail = emailConfig.EMAIL_USER || "boostwebagency.info@gmail.com"
    const replyToEmail = emailConfig.EMAIL_USER || "boostwebagency.info@gmail.com"

    // Email to client
    const clientMailOptions = {
      from: fromEmail,
      to: email,
      subject: `Contact form submission confirmation`,
      headers: {
        'X-Priority': '3',
      },
      text: `Hello ${name},

Thank you for your message. We have received your request and will respond within 24 hours.

Service: ${choose_service.replace(/-/g, " ")}
${project_title ? `Project: ${project_title}` : ""}

You can also reach us:
Website: https://boostwebagency.com
WhatsApp: +880 1603-108425

Best regards,
Boost Web Agency`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr><td style="padding: 20px;">
      <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background-color: white;">
        <tr><td style="background-color: #ec4899; padding: 40px 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 800;">Boost Web Agency</h1>
          <p style="margin: 8px 0 0 0; font-size: 15px; color: rgba(255,255,255,0.95);">Thank You for Your Interest!</p>
        </td></tr>
        <tr><td style="height: 4px; background-color: #a855f7;"></td></tr>
        <tr><td style="padding: 40px 30px; font-size: 16px; line-height: 1.6; color: #1f2937;">
          <p style="margin: 0 0 20px 0;">👋 Hello <strong style="color: #ec4899;">${name}</strong>,</p>
          <p style="margin: 0 0 25px 0; color: #4b5563;">We've received your request and are excited to help! Our team is reviewing your submission and will get back to you within <strong>24 hours</strong>.</p>
          
          <table role="presentation" width="100%" style="background-color: #fdf2f8; border: 1px solid #f3e8ff; margin: 25px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 15px 0; color: #a855f7; font-size: 12px; text-transform: uppercase; font-weight: 700;">📋 YOUR REQUEST</p>
              <table width="100%">
                <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td><td style="padding: 8px 0; color: #ec4899; font-weight: 600;">${choose_service.replace(/-/g, " ")}</td></tr>
                ${project_title ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Project:</strong></td><td style="padding: 8px 0;">${project_title}</td></tr>` : ""}
                <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Status:</strong></td><td style="padding: 8px 0; color: #16a34a; font-weight: 600;">✓ Received</td></tr>
              </table>
            </td></tr>
          </table>

          <table role="presentation" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #2563eb; margin: 25px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #1e40af; font-weight: 700;">⏭️ What Happens Next</p>
              <ol style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.8;">
                <li style="margin-bottom: 6px;">Our team reviews your request</li>
                <li style="margin-bottom: 6px;">We prepare a personalized proposal</li>
                <li>You'll hear from us within 24 hours</li>
              </ol>
            </td></tr>
          </table>

          <table role="presentation" width="100%" style="margin: 30px 0;">
            <tr><td align="center"><a href="https://boostwebagency.com" style="display: inline-block; background-color: #ec4899; color: white; padding: 14px 32px; border-radius: 6px; font-weight: 600; text-decoration: none;">Explore Our Services</a></td></tr>
          </table>

          <table role="presentation" width="100%" style="background-color: #f9f5ff; margin: 25px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #7c3aed; font-size: 12px; text-transform: uppercase; font-weight: 700;">⚡ Need Help Fast?</p>
              <table width="100%">
                <tr><td style="padding: 8px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/8801603108425" style="color: #ec4899;">+880 1603-108425</a></td></tr>
                <tr><td style="padding: 8px 0;"><strong>Email:</strong> <a href="mailto:boostwebagency.contact@gmail.com" style="color: #ec4899;">boostwebagency.contact@gmail.com</a></td></tr>
              </table>
            </td></tr>
          </table>

          <p style="margin: 25px 0 0 0; color: #4b5563;">Best regards,<br><strong style="color: #ec4899;">Boost Web Agency Team</strong></p>
        </td></tr>
        <tr><td style="background-color: #1f2937; padding: 25px 30px; text-align: center; color: rgba(255,255,255,0.8); font-size: 12px;">
          <p style="margin: 0 0 8px 0;">© 2024 Boost Web Agency. All rights reserved.</p>
          <p style="margin: 0; color: rgba(255,255,255,0.6);">Dhaka, Bangladesh | <a href="https://boostwebagency.com" style="color: #ec4899; text-decoration: none;">boostwebagency.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }

    // Email to company
    const companyMailOptions = {
      from: fromEmail,
      to: emailConfig.COMPANY_EMAIL || "boostwebagency.info@gmail.com",
      subject: `New contact form: ${name}`,
      headers: {
        'X-Priority': '2',
      },
      text: `New message from ${name}

Email: ${email}
${phone ? `Phone: ${phone}` : ""}
Service: ${choose_service.replace(/-/g, " ")}
${project_title ? `Project: ${project_title}` : ""}

Message:
${message}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr><td style="padding: 20px;">
      <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background-color: white;">
        <tr><td style="background-color: #ec4899; padding: 40px 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 800;">🎯 NEW LEAD</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.95);">Contact Form Submission</p>
        </td></tr>
        <tr><td style="height: 4px; background-color: #a855f7;"></td></tr>
        <tr><td style="padding: 40px 30px; color: #1f2937;">
          <p style="margin: 0 0 5px 0; font-size: 16px;"><strong>${name}</strong> just submitted a request</p>
          <p style="margin: 0 0 25px 0; color: #6b7280; font-size: 13px;">${new Date().toLocaleString()}</p>

          <table role="presentation" width="100%" style="background-color: #f0f9ff; border: 1px solid #bfdbfe; margin: 20px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 12px; text-transform: uppercase; font-weight: 700;">👤 CLIENT INFO</p>
              <table width="100%">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 35%;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; font-weight: 600;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb; font-weight: 600;">${phone}</a></td></tr>` : ""}
              </table>
            </td></tr>
          </table>

          <table role="presentation" width="100%" style="background-color: #fef2f8; border: 1px solid #fbcfe8; margin: 20px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #ec4899; font-size: 12px; text-transform: uppercase; font-weight: 700;">🎨 SERVICE</p>
              <table width="100%">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 35%;"><strong>Service:</strong></td><td style="padding: 8px 0; color: #be185d; font-weight: 600;">${choose_service.replace(/-/g, " ").toUpperCase()}</td></tr>
                ${project_title ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Project:</strong></td><td style="padding: 8px 0;">${project_title}</td></tr>` : ""}
              </table>
            </td></tr>
          </table>

          <table role="presentation" width="100%" style="background-color: #f3f4f6; border-left: 4px solid #a855f7; margin: 20px 0;">
            <tr><td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; color: #4b5563; font-size: 12px; text-transform: uppercase; font-weight: 700;">💬 MESSAGE</p>
              <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
            </td></tr>
          </table>

          <table role="presentation" width="100%" style="margin: 30px 0;">
            <tr>
              <td style="width: 48%; padding-right: 4%;">
                <table width="100%"><tr><td align="center" style="background-color: #ec4899; padding: 12px; border-radius: 6px;"><a href="mailto:${email}?subject=Re: Your Service Request" style="color: white; font-weight: 600; text-decoration: none;">📧 Reply</a></td></tr></table>
              </td>
              <td style="width: 48%;">
                <table width="100%"><tr><td align="center" style="background-color: #25d366; padding: 12px; border-radius: 6px;"><a href="https://wa.me/${phone?.replace(/[^0-9]/g, '') || '8801603108425'}" style="color: white; font-weight: 600; text-decoration: none;">💬 WhatsApp</a></td></tr></table>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" style="background-color: #fffbeb; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <tr><td style="padding: 15px 20px;">
              <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600;">⏱️ Respond within 24 hours for best results!</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="background-color: #1f2937; padding: 25px 30px; text-align: center; color: rgba(255,255,255,0.6); font-size: 12px;">
          <p style="margin: 0;">Lead ID: ${Date.now()} • Boost Web Agency</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
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
      // Send the client email first and verify it was accepted by SMTP
      try {
        const clientResult = await transporter!.sendMail(clientMailOptions)
        console.log("✅ Email sent to client:", {
          recipient: email,
          messageId: clientResult.messageId,
          accepted: clientResult.accepted,
          rejected: clientResult.rejected,
          response: clientResult.response
        })

        if (clientResult.rejected.length > 0) {
          console.error("❌ Client email was rejected by SMTP:", clientResult.rejected)
          throw new Error(`Client email rejected: ${clientResult.rejected.join(", ")}`)
        }
      } catch (clientError) {
        console.error("❌ Error sending client email:", clientError)
        throw new Error(`Failed to send client email: ${(clientError as any).message}`)
      }

      // Send the company notification email next
      try {
        const companyResult = await transporter!.sendMail(companyMailOptions)
        console.log("✅ Email sent to company:", {
          recipient: emailConfig.COMPANY_EMAIL || "boostwebagency.info@gmail.com",
          messageId: companyResult.messageId,
          accepted: companyResult.accepted,
          rejected: companyResult.rejected,
          response: companyResult.response
        })

        if (companyResult.rejected.length > 0) {
          console.error("❌ Company email was rejected by SMTP:", companyResult.rejected)
          throw new Error(`Company email rejected: ${companyResult.rejected.join(", ")}`)
        }
      } catch (companyError) {
        console.error("❌ Error sending company email:", companyError)
        throw new Error(`Failed to send company email: ${(companyError as any).message}`)
      }

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
