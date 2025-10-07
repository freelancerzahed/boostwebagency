# Installation Guide - Boost Web Agency

Complete step-by-step guide to install and set up the Boost Web Agency template.

## System Requirements

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher (or yarn/pnpm equivalent)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Quick Start (5 minutes)

### Step 1: Extract Files
Extract the downloaded ZIP file to your desired location.

### Step 2: Install Dependencies
Open terminal in the project directory and run:

\`\`\`bash
npm install
\`\`\`

Or if you prefer yarn:
\`\`\`bash
yarn install
\`\`\`

Or pnpm:
\`\`\`bash
pnpm install
\`\`\`

### Step 3: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### Step 4: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

**That's it!** Your site is now running locally.

## Optional Configuration

### Email Setup (for contact form)

1. Create a `.env.local` file in the root directory
2. Add your email configuration:

\`\`\`env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_TO=recipient@example.com
\`\`\`

**Note**: For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833).

### Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

\`\`\`bash
cp .env.example .env.local
\`\`\`

## Demo Credentials

### User Account
- **Email**: test@example.com
- **Password**: password123

### Admin Panel (access at `/admin/login`)
- **Super Admin**: jahed / 1234
- **Admin**: admin / admin123
- **Manager**: manager / manager456
- **Editor**: editor / editor123

## Building for Production

### Create Production Build
\`\`\`bash
npm run build
\`\`\`

### Start Production Server
\`\`\`bash
npm start
\`\`\`

### Test Production Build Locally
\`\`\`bash
npm run build && npm start
\`\`\`

Then open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables (if using email)
6. Click "Deploy"

### Deploy to Other Platforms

The template works with any platform that supports Next.js:
- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Use the Amplify console
- **Digital Ocean**: Use App Platform
- **Railway**: Connect and deploy
- **Render**: Connect GitHub and deploy

## Customization

### Change Logo
Edit `components/Logo.tsx` with your logo

### Update Colors
Modify CSS variables in `app/globals.css`:
\`\`\`css
:root {
  --primary: your-color;
  --secondary: your-color;
  /* ... other colors */
}
\`\`\`

### Update Site Metadata
Edit `app/layout.tsx`:
\`\`\`typescript
export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your description",
  // ... other metadata
}
\`\`\`

### Add/Remove Pages
- Add pages in `app/(frontend)/` directory
- Follow Next.js App Router conventions
- Update navigation in `components/Header.tsx`

## Troubleshooting

### Port Already in Use
If port 3000 is busy, use a different port:
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Module Not Found Errors
Delete `node_modules` and reinstall:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Build Errors
Clear Next.js cache:
\`\`\`bash
rm -rf .next
npm run build
\`\`\`

### TypeScript Errors
The project has `ignoreBuildErrors: true` for flexibility, but you can fix types:
\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
boost-web-agency/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── types/                # TypeScript types
└── services/             # API services
\`\`\`

## Support

For support:
1. Check this installation guide
2. Review README.md
3. Check CHANGELOG.md for updates
4. Contact through ThemeForest support

## Next Steps

1. ✅ Customize branding (logo, colors, content)
2. ✅ Configure email (optional)
3. ✅ Add your content
4. ✅ Test all features
5. ✅ Build for production
6. ✅ Deploy to your hosting

---

**Need Help?** Contact support through ThemeForest.

**Enjoy building with Boost Web Agency!** 🚀
