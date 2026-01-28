# 🎓 AI Lesson Notes - Full Stack Application

A complete full-stack application for recording, transcribing, and summarizing lessons with AI, including user authentication and cloud storage.

## ✨ Features

### Authentication
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ Protected API routes

### Note Management
- ✅ Create manual notes
- ✅ Record voice notes
- ✅ AI transcription and summarization
- ✅ View, edit, and delete notes
- ✅ Cloud storage in Vercel Postgres

### User Interface
- ✅ Beautiful, modern design
- ✅ Responsive layout
- ✅ Real-time recording timer
- ✅ User dashboard

## 🚀 Deployment to Vercel

### Prerequisites
- A Vercel account (free tier works)
- Git installed on your computer

### Step 1: Prepare Your Project

```bash
# Navigate to the project directory
cd lesson-notes-fullstack

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? ai-lesson-notes (or your choice)
# - Directory? ./
# - Override settings? No
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Step 3: Add Vercel Postgres Database

1. Go to your project dashboard on Vercel
2. Click on "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name and region
6. Click "Create"

Vercel will automatically set these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### Step 4: Set Environment Variables

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following:

```
JWT_SECRET=your-super-secret-random-string-here
ANTHROPIC_API_KEY=your-anthropic-api-key (optional)
```

To generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Initialize Database

After deployment, visit:
```
https://your-app.vercel.app/api/init-db
```

This will create the necessary database tables.

### Step 6: Test Your App

Visit your app URL and:
1. Register a new account
2. Login
3. Create some notes
4. Test recording features

## 📁 Project Structure

```
lesson-notes-fullstack/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js       # Login endpoint
│   │   │   └── register.js    # Registration endpoint
│   │   └── notes/
│   │       ├── index.js        # Create/List notes
│   │       └── [id].js         # Get/Update/Delete note
│   └── index.js                # Main app page
├── lib/
│   ├── db.js                   # Database queries
│   └── auth.js                 # Authentication utilities
├── package.json
├── next.config.js
├── vercel.json
└── .env.example
```

## 🔧 Local Development

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Initialize Local Database

If using a local Postgres database:

```bash
# Set POSTGRES_URL in .env.local
# Then visit: http://localhost:3000/api/init-db
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT tokens for authentication
- ✅ Protected API routes
- ✅ SQL injection prevention
- ✅ User data isolation

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  summary TEXT,
  note_type VARCHAR(50),
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all notes for authenticated user
- `POST /api/notes` - Create new note
- `GET /api/notes/[id]` - Get specific note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

## 🎨 Customization

### Change Colors
Edit the gradient colors in `pages/index.js`:
```javascript
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Add AI Features
Integrate Anthropic API for:
- Voice transcription
- Content summarization
- Smart note organization

Example:
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
    messages: [{ role: "user", content: "Summarize: " + noteContent }]
  })
});
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure Postgres storage is added in Vercel
- Check environment variables are set
- Visit `/api/init-db` to initialize tables

### Authentication Not Working
- Verify JWT_SECRET is set
- Clear browser localStorage
- Check token expiration (7 days default)

### Deployment Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Next.js version compatibility

## 📝 Future Enhancements

- [ ] Audio file upload to cloud storage
- [ ] Real-time AI transcription
- [ ] Note sharing between users
- [ ] Export notes to PDF/DOCX
- [ ] Mobile app version
- [ ] Voice commands
- [ ] Note categories and tags
- [ ] Search functionality

## 📄 License

MIT License - Feel free to use this project for learning and production!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

For issues or questions:
- Check the troubleshooting section
- Review Vercel documentation
- Check Next.js documentation

---

Made with ❤️ for students and educators
