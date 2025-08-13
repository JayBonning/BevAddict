# 🍹 Bev Addict - Beverage Rating Application

A modern, full-featured beverage rating and review platform built with Next.js, Supabase, and shadcn/ui.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure signup/login with Supabase Auth
- **Beverage Reviews** - Comprehensive rating system (0-10 scale)
- **Photo Uploads** - Image storage with Supabase Storage
- **Friend System** - Connect with other beverage enthusiasts
- **Advanced Search** - Find beverages by type, location, rating
- **Real-time Updates** - Live feed of community reviews

### 🎨 Modern UI/UX
- **shadcn/ui Design System** - Professional, accessible components
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Automatic theme switching
- **Custom Themes** - Build and share your own color schemes
- **Smooth Animations** - Polished user interactions
- **Toast Notifications** - Real-time feedback with Sonner
- **Glass Morphism** - Modern backdrop blur effects
- **Premium Backgrounds** - Copper brewing equipment and barrel cellar imagery

### 📊 Advanced Features
- **11 Beverage Categories** - Coffee, Tea, Beer, Wine, Cocktails, etc.
- **Location Tracking** - Where you enjoyed each beverage
- **Date Tracking** - When you consumed each beverage
- **Price Tracking** - Cost analysis and budgeting
- **Tag System** - Organize reviews with custom tags
- **Recommendation Engine** - Would you recommend this beverage?
- **Progress Tracking** - Upload progress with visual feedback

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **React Hook Form** - Advanced form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection
- **Real-time Subscriptions** - Live updates
- **File Storage** - Image uploads

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **SASS** - Advanced CSS preprocessing
- **Docker** - Containerization support

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd beverage-rating-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Database setup**
   - Go to your Supabase dashboard
   - Run the SQL scripts in `/scripts/` folder in order:
     - `01-create-tables.sql`
     - `02-create-policies.sql` 
     - `03-create-functions.sql`
     - `04-create-storage.sql`

5. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
beverage-rating-app/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── reviews/           # Review management
│   ├── friends/           # Social features
│   ├── themes/            # Theme customization
│   └── setup/             # Setup and health checks
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utilities and configurations
│   ├── supabase/         # Database client
│   ├── themes/           # Theme system
│   └── utils.ts          # Helper functions
├── scripts/              # Database setup scripts
├── styles/               # SASS stylesheets
└── public/               # Static assets
\`\`\`

## 🎨 Theme System

Bev Addict includes a powerful theme customization system:

- **Pre-built Themes**: Default, Beverage Orange, Coffee Brown, Mint Fresh
- **Theme Builder**: Create custom themes with live preview
- **SASS Integration**: Component-based styling architecture
- **Export/Import**: Share themes with the community
- **Glass Morphism**: Modern backdrop blur effects throughout

## 🖼️ Visual Design

### Background Images
- **Authentication Pages**: Warm copper brewing equipment imagery
- **Main Application**: Traditional barrel cellar with aging barrels
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Responsive Design**: Optimized for all screen sizes

## 🐳 Docker Support

Run with Docker for easy deployment:

\`\`\`bash
# Development
npm run docker:dev

# Production
npm run docker:prod
\`\`\`

## 📊 Database Schema

### Core Tables
- `profiles` - User information
- `reviews` - Beverage reviews and ratings
- `friendships` - Social connections
- `comments` - Review discussions

### Features
- Row Level Security (RLS) enabled
- Real-time subscriptions
- Automatic timestamps
- Data validation constraints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📞 Support

If you have any questions or need help:

1. Check the [Setup Guide](http://localhost:3000/setup)
2. Review the [Database Scripts](./scripts/)
3. Open an issue on GitHub
4. Join our community discussions

---

**Happy Rating! 🍹 Welcome to Bev Addict!**
