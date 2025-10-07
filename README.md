# Boost Web Agency - Professional Web Development & Digital Marketing

A modern, full-featured web agency template built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Perfect for web agencies, digital marketing firms, and freelancers.

## Features

### Frontend Features
- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Homepage**: Hero section, services showcase, about section, portfolio, testimonials, contact form
- **Services Pages**: Detailed pages for web development, digital marketing, e-commerce, logo design, Facebook ads, and lead generation
- **E-commerce**: Complete shop with product catalog, filtering, cart, wishlist, and checkout
- **User Account**: Profile management, order history, wishlist, support tickets
- **Authentication**: Secure login/register system with password recovery
- **Dark Mode**: Full dark mode support with smooth theme switching
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

### Admin Dashboard
- **Dashboard Overview**: Analytics, quick stats, recent activities
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View and manage customer orders
- **User Management**: Manage users and roles
- **Blog Management**: Create and manage blog posts
- **Testimonials**: Manage customer testimonials
- **Media Library**: Upload and manage media files
- **Settings**: Site configuration and preferences
- **Analytics**: Detailed analytics and reports
- **Notifications**: System notifications and alerts
- **Subscribers**: Manage newsletter subscribers

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Animations**: Tailwind CSS Animate
- **Email**: Nodemailer
- **Authentication**: Custom JWT-based auth with bcrypt
- **Carousel**: Swiper.js
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation

1. **Clone or extract the project**:
\`\`\`bash
cd boost-web-agency
\`\`\`

2. **Install dependencies**:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Set up environment variables** (optional for contact form):

Create a `.env.local` file in the root directory:
\`\`\`env
# Email Configuration (for contact form)
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-specific-password
EMAIL_TO=recipient@example.com
\`\`\`

4. **Run the development server**:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

### User Account
- **Email**: test@example.com
- **Password**: password123

### Admin Panel
Access at `/admin/login`:

- **Super Admin**: 
  - Username: `jahed`
  - Password: `1234`

- **Admin**: 
  - Username: `admin`
  - Password: `admin123`

- **Manager**: 
  - Username: `manager`
  - Password: `manager456`

- **Editor**: 
  - Username: `editor`
  - Password: `editor123`

## Project Structure

\`\`\`
boost-web-agency/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Frontend routes (with layout)
│   │   ├── about/               # About page
│   │   ├── account/             # User account pages
│   │   │   ├── orders/          # Order history
│   │   │   ├── support/         # Support tickets
│   │   │   └── wishlist/        # User wishlist
│   │   ├── auth/                # Authentication pages
│   │   │   ├── login/           # Login page
│   │   │   ├── register/        # Registration page
│   │   │   └── forgot-password/ # Password recovery
│   │   ├── chat/                # Live chat feature
│   │   ├── contact/             # Contact page
│   │   ├── faq/                 # FAQ page
│   │   ├── services/            # Service pages
│   │   ├── shop/                # E-commerce pages
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout process
│   │   │   ├── product/[id]/    # Product details
│   │   │   └── wishlist/        # Wishlist page
│   │   ├── team/                # Team showcase
│   │   ├── layout.tsx           # Frontend layout
│   │   └── page.tsx             # Homepage
│   ├── admin/                   # Admin dashboard
│   │   ├── (dashboard)/         # Dashboard routes
│   │   │   ├── analytics/       # Analytics page
│   │   │   ├── blog/            # Blog management
│   │   │   ├── media/           # Media library
│   │   │   ├── notifications/   # Notifications
│   │   │   ├── orders/          # Order management
│   │   │   ├── products/        # Product management
│   │   │   ├── settings/        # Settings
│   │   │   ├── subscribers/     # Subscriber management
│   │   │   ├── testimonials/    # Testimonial management
│   │   │   ├── users/           # User management
│   │   │   └── page.tsx         # Dashboard home
│   │   └── login/               # Admin login
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   ├── auth/                # Auth API endpoints
│   │   ├── chat/                # Chat API
│   │   ├── getSubscribers/      # Subscriber API
│   │   └── sendEmail/           # Email API
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root page
│   ├── error.tsx                # Error page
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── admin/                   # Admin components
│   ├── About.tsx                # About section
│   ├── Footer.tsx               # Footer component
│   ├── Header.tsx               # Header/navigation
│   ├── Hero.tsx                 # Hero section
│   ├── Portfolio.tsx            # Portfolio gallery
│   ├── Services.tsx             # Services section
│   ├── Testimonials.tsx         # Testimonials carousel
│   └── ...                      # Other components
├── hooks/                       # Custom React hooks
│   ├── useAuth.tsx              # Authentication hook
│   ├── useCart.tsx              # Shopping cart hook
│   └── useWishlist.tsx          # Wishlist hook
├── lib/                         # Utility functions
│   ├── auth.ts                  # Auth utilities
│   └── utils.ts                 # General utilities
├── services/                    # API services
│   ├── productService.ts        # Product service
│   └── reviewService.ts         # Review service
├── types/                       # TypeScript types
│   ├── product.ts               # Product types
│   └── user.ts                  # User types
├── public/                      # Static assets
├── .env.example                 # Environment variables example
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.mjs              # Next.js config
├── README.md                    # This file
├── LICENSE.md                   # License information
└── CHANGELOG.md                 # Version history
\`\`\`

## Customization

### Branding

1. **Logo**: Update `components/Logo.tsx` with your logo
2. **Colors**: Modify CSS variables in `app/globals.css`
3. **Metadata**: Update site info in `app/layout.tsx`
4. **Favicon**: Replace files in `public/` directory

### Content

1. **Homepage**: Edit sections in `components/` directory
2. **Services**: Modify pages in `app/(frontend)/services/`
3. **About**: Update `app/(frontend)/about/page.tsx`
4. **Contact**: Configure email in `.env.local`

### Styling

- **Theme Colors**: Edit CSS variables in `app/globals.css`
- **Dark Mode**: Colors automatically adapt via CSS variables
- **Components**: Use Tailwind utility classes for styling
- **Animations**: Configured in Tailwind CSS Animate

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- Render

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Optimized with tree shaking
- **Loading States**: Skeleton loaders throughout
- **Lazy Loading**: Components loaded on demand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For support, please:
1. Check the documentation
2. Review the code comments
3. Contact through ThemeForest

## License

This project is licensed for commercial use on ThemeForest. See `LICENSE.md` for details.

## Credits

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives

## Changelog

See `CHANGELOG.md` for version history and updates.

---

**Made with ❤️ for ThemeForest**

For questions or custom development, please contact through ThemeForest.
