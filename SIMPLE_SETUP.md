# 🚀 Simple Setup (No Docker Required!)

## Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Supabase account** (free at [supabase.com](https://supabase.com))

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Environment Setup

Your `.env.local` is already configured with:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://nmwjplpffvhoabwnyxmt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 3. Database Setup

1. Go to [Supabase SQL Editor](https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/sql)
2. Run these scripts in order:
   - `scripts/01-create-tables.sql`
   - `scripts/02-create-policies.sql`
   - `scripts/03-create-functions.sql`
   - `scripts/04-create-storage.sql`
   - `scripts/05-update-reviews-table.sql`

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

### 5. Open Your App

Visit [http://localhost:3000](http://localhost:3000)

## Available Commands

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier

# CSS (Optional - Tailwind works without this)
npm run build:css    # Build SASS to CSS
npm run watch:css    # Watch SASS changes
npm run dev:css      # Run CSS watch + dev server
\`\`\`

## What You Get

✅ **No Docker complexity** - Just Node.js and npm
✅ **Hot reload** - Changes update instantly
✅ **TypeScript** - Full type safety
✅ **Tailwind CSS** - Utility-first styling
✅ **shadcn/ui** - Beautiful components
✅ **Supabase** - Database and auth handled
✅ **SASS support** - Advanced styling (optional)

## Folder Structure

\`\`\`
your-project/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utilities
├── scripts/         # Database setup
├── styles/          # SASS files (optional)
├── public/          # Static files
└── package.json     # Dependencies
\`\`\`

## Troubleshooting

### Port Already in Use?
\`\`\`bash
npm run dev -- -p 3001  # Use different port
\`\`\`

### Node Version Issues?
\`\`\`bash
node --version  # Should be 18+
\`\`\`

### Dependencies Issues?
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Production Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
\`\`\`bash
npm run build
npm run start
\`\`\`

---

**That's it! No Docker, no complexity - just a modern web app! 🎉**
