# 🔧 Troubleshooting Guide

## Most Common Errors & Solutions

### 1. Port Already in Use
**Error:** `EADDRINUSE :::3000`
**Solution:**
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
\`\`\`

### 2. Module Not Found
**Error:** `Cannot resolve module '@/components/...'`
**Solution:**
\`\`\`bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 3. Configuration Error
**Error:** `Supabase is not properly configured`
**Solution:**
1. Create `.env.local` in project root
2. Add Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://nmwjplpffvhoabwnyxmt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`
3. Restart server: `npm run dev`

### 4. TypeScript Errors
**Error:** Type checking failed
**Solution:**
\`\`\`bash
# Check types
npm run type-check

# Skip lib check if needed
npx tsc --noEmit --skipLibCheck
\`\`\`

### 5. Build Errors
**Error:** Build failed
**Solution:**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Or test build
npm run build
\`\`\`

### 6. Node.js Version Issues
**Error:** Unsupported Node.js version
**Solution:**
- Update to Node.js 18+ from [nodejs.org](https://nodejs.org)
- Check version: `node --version`

## Nuclear Option - Complete Reset
If nothing else works:
\`\`\`bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
\`\`\`

## Getting Help
1. Visit `/error-help` page for automated diagnostics
2. Check the exact error message in terminal
3. Ensure all prerequisites are met:
   - Node.js 18+
   - npm or yarn
   - .env.local file with correct credentials

## Environment Setup Checklist
- [ ] Node.js 18+ installed
- [ ] .env.local file exists in project root
- [ ] Supabase credentials are correct
- [ ] Dependencies installed (`npm install`)
- [ ] No other process using port 3000
\`\`\`
