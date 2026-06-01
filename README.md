# Beef Marketplace - Côte d'Ivoire

A full-stack e-commerce platform for buying and selling beef in Côte d'Ivoire, built with Next.js, Tailwind CSS, Prisma, PostgreSQL, NextAuth, Cloudinary, and deployed on Vercel.

## Features

- **User Authentication** (NextAuth):
  - Email/password, GitHub, Google providers
  - Role-based access (Buyer/Seller)
- **Seller Dashboard**:
  - Create beef listings with title, description, price per kg, weight, city, and multiple images (via Cloudinary)
  - Manage listings (view, edit, delete - not implemented in this MVP but can be added)
- **Buyer Experience**:
  - Browse listings with search and filters (city, price range)
  - View detailed listing with multiple images, seller info, and contact options (WhatsApp, phone)
  - Add to cart and checkout
- **Shopping Cart**:
  - Add/remove items, adjust quantities
  - Checkout with payment method selection
- **Payment Simulation**:
  - Mobile Money (Orange Money, MTN Mobile Money, Wave)
  - Cash on Delivery
- **Bonus Features**:
  - Seller location map (using latitude/longitude from user profile)
  - Direct WhatsApp contact
  - Seller rating system (placeholder - can be expanded)
- **Responsive Design**:
  - Modern UI inspired by Jumia, optimized for mobile and desktop
  - Tailwind CSS for utility-first styling

## Technology Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (for image uploads)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database (local or hosted)
- Cloudinary account (for image storage)
- Git

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here (generate with: openssl rand -hex 32)

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

# Cloudinary
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Optional: OAuth providers (for NextAuth)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Installation

1. Clone the repository (or copy the files):
   ```bash
   git clone <your-repo-url>
   cd beef-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database (e.g., `beef_marketplace`)
   - Update the `DATABASE_URL` in `.env.local` with your credentials
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev --name init
     ```
   - (Optional) Seed the database with sample data:
     ```bash
     npx prisma db seed
     ```
     *Note: You'll need to create a seed script in `prisma/seed.ts` if you want sample data.*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js 13+ app router components (pages, layouts, API routes)
- `src/lib`: Utility files (Prisma client singleton)
- `prisma`: Prisma schema and migrations
- `public`: Static assets (placeholder images, etc.)

### Key Directories

- `src/app/api`: API routes (listings, auth, etc.)
- `src/app/listings`: Listing browse and detail pages
- `src/app/sell`: Page for creating new listings
- `src/app/cart`: Shopping cart and checkout
- `src/app/auth`: Authentication pages (sign in, register)

## Deployment to Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Step-by-Step Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
3. Configure environment variables in Vercel:
   - In the Vercel dashboard, go to your project settings → Environment Variables
   - Add all the variables from your `.env.local` file (except `NEXTAUTH_URL` will be set automatically by Vercel)
   - Important: Set `NEXTAUTH_URL` to your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
4. Vercel will automatically detect it's a Next.js project and run `npm install` and `npm run build`
5. After deployment, visit your Vercel URL to see the live site.

### Vercel Build Output

Vercel will output the build logs. If you encounter issues:
- Ensure all required environment variables are set
- Check that your PostgreSQL database is accessible from Vercel (consider using a managed PostgreSQL service like Vercel's own PostgreSQL integration, Supabase, Neon, etc.)
- Make sure your Cloudinary credentials are correct

## Future Improvements (Ideas for Expansion)

- **Admin Dashboard**: For managing users, listings, and orders
- **Order Management**: View order history for buyers and sellers
- **Ratings & Reviews**: Full implementation of seller rating system
- **Real-time Notifications**: Using WebSockets or server-sent events
- **Advanced Search**: With ElasticSearch or similar
- **Payment Integration**: Actual mobile money APIs (Orange, MTN, Wave) or card payments (Stripe, PayPal)
- **Delivery Tracking**: Integrate with local delivery services
- **Multilingual Support**: French and local languages (Baoulé, Dioula, etc.)
- **Security Enhancements**: Rate limiting, input sanitization, CSP headers

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by e-commerce platforms like Jumia, Amazon, and local Ivorian marketplaces
- Built with the Next.js ecosystem and Vercel platform
- Special thanks to the open-source communities for Tailwind CSS, Prisma, NextAuth, Lucide, and Cloudinary

---

**Note**: This is a Minimum Viable Product (MVP) created for demonstration purposes. In a production environment, you would want to add:
- Comprehensive input validation and sanitization
- Proper error handling and logging
- Unit and integration tests
- Rate limiting and security headers
- Optimized database queries and indexing
- CI/CD pipeline with automated testing
- Monitoring and error tracking (Sentry, LogRocket, etc.)