#!/bin/bash

echo "🎓 AI Lesson Notes - Quick Deploy Script"
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Initialize git if not already
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: AI Lesson Notes app"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "🚀 Ready to deploy!"
echo ""
echo "Choose your deployment method:"
echo "1. Deploy with Vercel CLI (recommended)"
echo "2. Manual deployment instructions"
echo ""
read -p "Enter your choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "Installing Vercel CLI..."
    npm install -g vercel
    
    echo ""
    echo "Starting Vercel deployment..."
    echo "Follow the prompts to deploy your app!"
    echo ""
    vercel
    
    echo ""
    echo "🎉 Deployment initiated!"
    echo ""
    echo "Next steps:"
    echo "1. Go to your Vercel dashboard"
    echo "2. Add Postgres database in Storage tab"
    echo "3. Set JWT_SECRET in Environment Variables"
    echo "4. Visit your-app.vercel.app/api/init-db"
    echo "5. Register and start using the app!"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "📝 Manual Deployment Steps:"
    echo ""
    echo "1. Go to https://vercel.com and sign up"
    echo "2. Click 'Add New' → 'Project'"
    echo "3. Import this git repository or upload the folder"
    echo "4. Vercel will auto-detect Next.js"
    echo "5. Click 'Deploy'"
    echo "6. After deployment:"
    echo "   - Add Postgres storage"
    echo "   - Set JWT_SECRET environment variable"
    echo "   - Visit /api/init-db endpoint"
    echo "   - Register your account!"
    echo ""
    echo "📄 See README.md for detailed instructions"
    echo "📄 See DEPLOYMENT_KH.md for Khmer instructions"
else
    echo "❌ Invalid choice"
    exit 1
fi

echo ""
echo "For more help, read:"
echo "  - README.md (English)"
echo "  - DEPLOYMENT_KH.md (Khmer)"
