# 🚀 BevRate Setup Guide

Your Supabase credentials have been configured! Follow these steps to complete the setup.

## ✅ Environment Configuration

Your `.env.local` file is now configured with:
- **Supabase URL**: `https://nmwjplpffvhoabwnyxmt.supabase.co`
- **Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📋 Database Setup Checklist

### 1. Run SQL Scripts in Order

Go to your [Supabase SQL Editor](https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/sql) and run these scripts:

- [ ] `scripts/01-create-tables.sql` - Creates core database tables
- [ ] `scripts/02-create-policies.sql` - Sets up Row Level Security
- [ ] `scripts/03-create-functions.sql` - Adds database functions and triggers
- [ ] `scripts/04-create-storage.sql` - Configures file storage for images
- [ ] `scripts/05-update-reviews-table.sql` - Adds enhanced review fields

### 2. Verify Setup

After running the scripts, check that:
- [ ] All tables are created (profiles, reviews, friendships, comments)
- [ ] RLS policies are active
- [ ] Storage bucket `beverage-images` exists
- [ ] Functions and triggers are working

### 3. Test the Application

- [ ] Start the development server: `npm run dev`
- [ ] Visit [http://localhost:3000/setup](http://localhost:3000/setup)
- [ ] Check the database status dashboard
- [ ] Create a test account
- [ ] Add your first beverage review

## 🎯 Quick Commands

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run with Docker
npm run docker:dev
\`\`\`

## 🔗 Important Links

- **Supabase Dashboard**: https://nmwjplpffvhoabwnyxmt.supabase.co/project/default
- **SQL Editor**: https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/sql
- **Storage**: https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/storage/buckets
- **Authentication**: https://nmwjplpffvhoabwnyxmt.supabase.co/project/default/auth/users

## 🆘 Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and API key
- Check that your project is not paused
- Ensure RLS policies allow access

### Storage Issues
- Make sure the `beverage-images` bucket exists
- Check storage policies allow uploads
- Verify file size limits

### Authentication Problems
- Check email confirmation settings
- Verify redirect URLs in Supabase Auth settings
- Test with different browsers/incognito mode

## 📞 Need Help?

1. Check the [Setup Status Page](http://localhost:3000/setup)
2. Review the database health checks
3. Consult the Supabase documentation
4. Open an issue on GitHub

---

**Ready to start rating beverages! 🍹**
