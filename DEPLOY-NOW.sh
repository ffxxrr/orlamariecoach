#!/bin/bash

echo "🚀 OrlaMarieCoach Vercel Deployment Script"
echo "=========================================="
echo ""

# Check if logged in
if ! vercel whoami 2>/dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "📋 Please run: vercel login"
    echo ""
    exit 1
fi

echo "✅ Logged in to Vercel as: $(vercel whoami)"
echo ""

# Check if project is linked
if [ ! -d ".vercel" ]; then
    echo "🔗 Linking project to Vercel..."
    echo ""
    vercel link
    echo ""
fi

# Deploy to production
echo "🚀 Deploying to production..."
echo ""
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "📋 Check your deployment at the URL above"
