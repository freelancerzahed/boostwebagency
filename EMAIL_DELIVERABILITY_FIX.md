# Email Deliverability Fix Guide

## Problem: Emails Going to Spam

Your transactional emails are being filtered to spam by Gmail, Outlook, and other providers. This is due to missing email authentication.

## Solutions Applied (Code-Level)

✅ **Simplified HTML templates** - Removed gradients, emojis, and excessive styling that trigger spam filters  
✅ **Added proper email headers** - X-Priority, X-Mailer, and Importance headers for better classification  
✅ **Improved text formatting** - Clean, plain text versions for better deliverability  
✅ **Removed suspicious elements** - Removed envelope configuration that caused SMTP rejection

## Critical: Configure Your Gmail Account (Mandatory)

### Option 1: Enable "Less Secure Apps" (⚠️ Not recommended for production)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character app password
4. Update `config/email.config.ts`:
```typescript
EMAIL_PASSWORD: "xxxx xxxx xxxx xxxx"  // The 16-char app password
```

### Option 2: Set Up Gmail App Password (✅ Recommended)

1. Enable 2-factor authentication on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy the 16-character password generated
5. Update `config/email.config.ts` with this password

## Domain-Level Setup (Most Important for Production)

To significantly improve deliverability, configure these DNS records for your domain:

### 1. SPF Record (Sender Policy Framework)

Add this TXT record to your domain's DNS:

```
v=spf1 include:gmail.com ~all
```

For custom domains:
```
v=spf1 include:aspmx.l.google.com include:gmail.com ~all
```

### 2. DKIM Record (DomainKeys Identified Mail)

Generate DKIM in Gmail:
1. Go to: https://mail.google.com/mail/u/0/#settings/fwdandpop
2. Look for "DKIM" section and enable it
3. Copy the DKIM record provided
4. Add it as a TXT record in your domain's DNS

Format typically looks like:
```
v=DKIM1; k=rsa; p=MIGfMA0BgkqhkiG9w0BA...
```

### 3. DMARC Record (Domain-based Message Authentication)

Add this TXT record:

```
v=DMARC1; p=quarantine; rua=mailto:admin@yourdomain.com; ruf=mailto:admin@yourdomain.com; fo=1; aspf=r; adkim=r
```

## Step-by-Step Implementation

### Step 1: Update Gmail App Password
```bash
# In config/email.config.ts
EMAIL_PASSWORD: "your-16-char-app-password"
```

### Step 2: Configure DNS Records

Access your domain's DNS provider (GoDaddy, Namecheap, Google Domains, etc.):

**Add these TXT records:**

1. **SPF Record:**
   - Name: `@`
   - Type: `TXT`
   - Value: `v=spf1 include:gmail.com ~all`

2. **DKIM Record:**
   - Name: `google._domainkey`
   - Type: `TXT`
   - Value: `v=DKIM1; k=rsa; p=[your-public-key]`
   - (Get this from Gmail settings)

3. **DMARC Record:**
   - Name: `_dmarc`
   - Type: `TXT`
   - Value: `v=DMARC1; p=quarantine; rua=mailto:admin@yourdomain.com; fo=1`

### Step 3: Verify SPF/DKIM/DMARC

Use these tools to verify:
- https://mxtoolbox.com/spf.aspx
- https://mxtoolbox.com/dkim.aspx
- https://mxtoolbox.com/dmarc.aspx

Wait 24-48 hours for DNS propagation.

## Alternative: Use Professional Email Service

For production environments, consider these services (much better deliverability):

### SendGrid (Recommended)
```bash
npm install @sendgrid/mail
```

### Mailgun
```bash
npm install mailgun.js
```

### AWS SES
```bash
npm install aws-sdk
```

## Testing Email Delivery

### Test 1: Send a test email
1. Open http://localhost:3000/chat
2. Fill the form with your email address
3. Check inbox AND spam folder

### Test 2: Check email headers
When you receive the email, view the full headers to see:
- Authentication-Results
- DKIM-Signature
- SPF result

### Test 3: Use Gmail's Security Check
1. Go to: https://myaccount.google.com/security-checkup
2. Review "Apps with account access"
3. Ensure your app is connected properly

## Expected Timeline

- **Immediately after fixes:** Some improvement
- **After DNS propagation (24-48 hrs):** Significant improvement with SPF/DKIM/DMARC
- **After 7-14 days:** Gmail learns your sending patterns, better deliverability
- **After 30 days:** Optimal reputation with proper setup

## Troubleshooting

### Emails still going to spam?

1. **Check Gmail sending reputation:**
   - https://support.google.com/mail/answer/81126
   - Your IP might be blacklisted

2. **Verify SPF/DKIM/DMARC:**
   ```bash
   nslookup -type=TXT yourdomain.com
   ```

3. **Check SMTP authentication:**
   - Server logs will show if emails are rejected by SMTP

4. **Review email content:**
   - Avoid spam trigger words
   - Don't use too many links
   - Avoid ALL CAPS text
   - Use plain text + HTML (already done)

### Still having issues?

Switch to SendGrid or Mailgun - they handle all authentication automatically.

## Code Changes Made

The following improvements were implemented:

1. **Simplified HTML emails** - Removed gradients and emojis
2. **Added proper headers** - X-Priority, X-Mailer, Importance
3. **Improved text versions** - Clean fallback text
4. **Removed SMTP envelope** - Preventing Gmail filtering
5. **Better content formatting** - Less aggressive styling

## Next Steps

1. ✅ Update your Gmail app password in `config/email.config.ts`
2. ✅ Add SPF, DKIM, DMARC records to your domain DNS
3. ✅ Wait 24-48 hours for DNS propagation
4. ✅ Test email delivery
5. ✅ Monitor delivery for 7-14 days
6. ⚠️ If issues persist, migrate to SendGrid/Mailgun

---

**Note:** Authentication headers alone won't prevent spam filtering. Domain reputation takes time to build. For immediate production use, use a professional email service.
