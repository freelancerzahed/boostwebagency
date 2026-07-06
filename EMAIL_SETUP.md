# Email Setup Guide - Digital Marketing Proposal Form

This guide helps you set up email notifications for the "Get Your FREE Digital Marketing Proposal" form at `/contact`.

## Overview
The contact form sends:
1. **Confirmation email** to the user
2. **Proposal request email** to your company

## Setup Instructions

### 1. Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Select **Security** from the left menu
3. Under **How you sign in to Google**, enable **2-Step Verification** (if not already enabled)
4. After 2FA is set up, go back to Security settings
5. Under **App passwords**, select:
   - App: **Mail**
   - Device: **Other (custom name)** → type "Boost Web Agency"
6. Click **Generate**
7. Google will show a 16-character password

### 2. Configure Environment Variables

1. Create or edit `.env.local` in your project root:

```bash
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
COMPANY_EMAIL=boostwebagency.info@gmail.com
```

**Important:**
- Use your Gmail address for `EMAIL_USER`
- Use the 16-character app password (without spaces) for `EMAIL_PASSWORD`
- `COMPANY_EMAIL` is where proposal requests are sent

### 3. Test the Form

1. Start your dev server: `npm run dev`
2. Navigate to http://localhost:3000/contact
3. Fill out the form and submit
4. Check:
   - Your email inbox for the confirmation email
   - Company email inbox for the proposal request

## Email Templates

### Client Email
- Subject: "Your FREE Digital Marketing Proposal - Boost Web Agency"
- Includes: Submission summary, next steps, quick links
- Auto-sent immediately after form submission

### Company Email
- Subject: "NEW Proposal Request: [SERVICE] - [CLIENT NAME]"
- Includes: All client info, project details, message, file attachment
- Helps you respond quickly to leads

## Troubleshooting

### Emails not sending
- ✅ Check `.env.local` has correct credentials
- ✅ Verify Gmail 2FA is enabled
- ✅ Check browser console for error messages
- ✅ Look at server logs for detailed errors

### Gmail denies connection
- ✅ Make sure you're using **App Password**, not your Gmail password
- ✅ Remove spaces from the 16-character password
- ✅ Verify the email address matches your Gmail account

### File upload not working
- ✅ Check file size (under 5MB recommended)
- ✅ Try different file formats (.pdf, .doc, .jpg)
- ✅ Check browser console for upload errors

## Alternative Email Services

To use a different email service instead of Gmail:

### SendGrid
```javascript
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Mailgun
```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_EMAIL,
    pass: process.env.MAILGUN_PASSWORD,
  },
});
```

## Security Notes

- ✅ Never commit `.env.local` to git (it's in `.gitignore`)
- ✅ App passwords are safer than your main Gmail password
- ✅ Restrict app password to "Mail" access only
- ✅ Consider using a dedicated business email account

## Production Deployment

For production (Vercel, Railway, etc.):

1. Set environment variables in your hosting dashboard
2. Add these variables:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `COMPANY_EMAIL`

3. Test on staging first before going live

## Contact Form Features

✅ Name, Email, Phone fields (required)
✅ Service selection dropdown
✅ Project URL/Website optional field
✅ Message textarea
✅ File upload (optional)
✅ Real-time validation
✅ Loading state indicator
✅ Success/Error messaging
✅ Auto-clear form on success

## Related Files

- Form Component: `components/ContactForm.tsx`
- API Endpoint: `app/api/sendEmail/route.ts`
- Config Template: `.env.example`
- Contact Page: `app/(frontend)/contact/page.tsx`
