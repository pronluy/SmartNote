# 🎓 AI Lesson Notes - Complete Setup Guide

## 📦 What You Have

A full-stack web application with:
- ✅ User Authentication (Login/Register)
- ✅ Cloud Database Storage (Vercel Postgres)
- ✅ Voice Recording
- ✅ Manual Note Taking
- ✅ AI Summarization (ready to integrate)
- ✅ Secure & Scalable

---

## 🚀 DEPLOYMENT OPTIONS

### Option 1: Vercel (RECOMMENDED) ⭐
**Best for:** Production deployment, free hosting, automatic SSL

**Steps:**
1. Create account at https://vercel.com (free)
2. Install Vercel CLI: `npm install -g vercel`
3. Run: `./deploy.sh` (in project folder)
4. Follow prompts
5. Add Postgres database in Vercel dashboard
6. Set environment variables
7. Initialize database

**Time:** 10-15 minutes
**Cost:** FREE (with limits)

### Option 2: Local Development
**Best for:** Testing, development

**Steps:**
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your settings
npm run dev
```

Visit: http://localhost:3000

---

## 📋 DETAILED DEPLOYMENT STEPS

### Step 1: Upload to Vercel

**Method A: Using CLI**
```bash
# In project folder
vercel login
vercel
# Answer the prompts
```

**Method B: Using Dashboard**
1. Go to https://vercel.com/new
2. Click "Upload"
3. Select the `lesson-notes-fullstack` folder
4. Click "Deploy"

### Step 2: Add Database

1. In Vercel dashboard, go to your project
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., "lesson-notes-db")
6. Click "Create"

**Environment variables are set automatically!**

### Step 3: Configure Environment Variables

1. Go to Settings → Environment Variables
2. Add:
   - Name: `JWT_SECRET`
   - Value: Any long random string (example below)

**Generate JWT_SECRET:**
```bash
# Method 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: Random text (at least 32 characters)
my-super-secret-jwt-key-12345678901234567890
```

3. Click "Save"
4. Redeploy (Vercel → Deployments → Redeploy)

### Step 4: Initialize Database

1. Wait for deployment to complete
2. Click "Visit" to open your site
3. Add `/api/init-db` to the URL
   - Example: `https://your-app.vercel.app/api/init-db`
4. You should see: "Database initialized successfully!"

### Step 5: Start Using!

1. Go to homepage
2. Click "Register"
3. Create your account
4. Login
5. Start creating notes!

---

## 🔐 SECURITY CHECKLIST

Before going live:
- [ ] Change JWT_SECRET to a secure random string
- [ ] Don't share your environment variables
- [ ] Use strong passwords for accounts
- [ ] Keep your Vercel account secure with 2FA

---

## 📱 FEATURES OVERVIEW

### Authentication
- User registration with email/password
- Secure login system
- JWT-based sessions (7 days)
- Password hashing with bcrypt

### Note Management
- Create manual notes with title and content
- Voice recording (browser-based)
- View all your notes in one place
- Delete notes you don't need
- Each user sees only their own notes

### Cloud Storage
- All data stored in Vercel Postgres
- Automatic backups
- Secure and scalable
- Free tier: 256MB storage

### User Interface
- Clean, modern design
- Responsive (works on mobile)
- Real-time recording timer
- Easy navigation

---

## 🛠️ CUSTOMIZATION

### Change Colors
Edit `pages/index.js`:
```javascript
// Find this line:
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// Change to your colors:
background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)'
```

### Add AI Features
Get Anthropic API key from https://console.anthropic.com

Add to environment variables:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Use in code:
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ 
      role: "user", 
      content: `Summarize these notes: ${noteContent}` 
    }]
  })
});
```

---

## 🐛 TROUBLESHOOTING

### "Database not initialized"
**Solution:** Visit `/api/init-db` endpoint

### "Unauthorized" errors
**Solution:** 
- Clear browser localStorage
- Login again
- Check JWT_SECRET is set

### "Cannot connect to database"
**Solution:**
- Verify Postgres storage is added in Vercel
- Check deployment logs for errors
- Redeploy the application

### Recording not working
**Solution:**
- Allow microphone in browser settings
- Use Chrome/Edge for best compatibility
- Check browser console for errors

### Build fails on Vercel
**Solution:**
- Check all files are uploaded
- Verify package.json is correct
- Check build logs in Vercel dashboard

---

## 📊 DATABASE SCHEMA

```sql
-- Users table
users (
  id: Serial Primary Key
  email: String (unique)
  password: String (hashed)
  name: String
  created_at: Timestamp
)

-- Notes table
notes (
  id: Serial Primary Key
  user_id: Integer (FK → users.id)
  title: String
  content: Text
  summary: Text
  note_type: String ('manual' or 'recording')
  audio_url: String
  created_at: Timestamp
  updated_at: Timestamp
)
```

---

## 🔄 UPDATING YOUR APP

### Update code:
```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
vercel --prod
```

Vercel will automatically:
- Build your new code
- Deploy to production
- Keep database data intact

---

## 💰 COST BREAKDOWN

### Free Tier (Vercel)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Postgres: 256MB storage
- ✅ Custom domain support
- ✅ HTTPS/SSL included

**Perfect for:**
- Personal use
- Small teams (up to 5 users)
- Educational projects
- Portfolios

### Upgrade If Needed
- More storage: $20/month
- More bandwidth: Hobby plan $20/month
- Team features: Pro plan $20/user/month

---

## 📚 RESOURCES

### Documentation
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Postgres: https://vercel.com/docs/storage/vercel-postgres

### Support
- Vercel Community: https://github.com/vercel/vercel/discussions
- Next.js Discord: https://nextjs.org/discord

### Learning
- Next.js Tutorial: https://nextjs.org/learn
- React Docs: https://react.dev

---

## ✨ WHAT'S NEXT?

### Recommended Improvements:
1. Add AI transcription for voice recordings
2. Export notes to PDF/DOCX
3. Add note categories/tags
4. Implement search functionality
5. Add note sharing between users
6. Mobile app version
7. Dark mode
8. Email verification

---

## 📞 SUPPORT

**Questions?**
- Check README.md
- Check DEPLOYMENT_KH.md (Khmer)
- Review this guide
- Check Vercel documentation

**Found a bug?**
- Check browser console for errors
- Review deployment logs
- Verify all steps were followed

---

## 🎉 SUCCESS CHECKLIST

Before considering deployment complete:
- [ ] App accessible at your Vercel URL
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can create manual notes
- [ ] Can view saved notes
- [ ] Can delete notes
- [ ] Recording button appears (even if mic blocked)
- [ ] Database persists data after refresh
- [ ] JWT_SECRET is set and secure
- [ ] Postgres storage is connected

---

**Congratulations! You now have a fully functional, cloud-hosted lesson notes application!** 🎊

Share your app URL with friends and start taking better notes! 📝
