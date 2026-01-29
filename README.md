# Island Safaris Sri Lanka

Production-ready safari booking website built with Next.js 14, Supabase, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres)
- **Images**: Cloudinary
- **Emails**: Resend (Integration ready)
- **Validation**: Zod
- **Icons**: Lucide React

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd IslandSafaris
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.local` example and fill in your keys:
   ```bash
   cp .env.local.example .env.local
   ```
   Required keys:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (for Admin actions)
   - `ADMIN_PASSWORD_HASH`: Bcrypt hash of your admin password
   - `SESSION_SECRET`: Random string for session cookie signing
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary Cloud Name

4. **Database Setup (Supabase)**
   - Go to Supabase > SQL Editor.
   - Run the contents of `supabase/migrations/20240129000000_initial_schema.sql` to create tables and RLS policies.
   - Run `supabase/seed.sql` to populate initial destinations.

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Features

- **Booking Wizard**: Multi-step form with dynamic pricing (Jeep fees, Tickets, Extra hours).
- **Admin Dashboard**: Secure (password + cookie) dashboard to manage bookings and reviews.
- **Reviews**: Public review submission with Admin moderation/approval workflow.
- **Destinations**: Static content stored in DB for easy updates.
- **WhatsApp Integration**: Global floating button with pre-filled messages.

## Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. Add the Environment Variables in Vercel Project Settings.
3. Deploy!

## Admin Access

- URL: `/admin/login`
- Security: Protected by server-side middleware and HttpOnly cookies.
