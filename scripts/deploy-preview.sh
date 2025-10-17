#!/bin/bash

echo "🚀 Deploying OrlaMarieCoach preview..."

# Copy preview environment
cp .env.preview .env.local

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel --prod=false --env-file=.env.preview

echo "✅ Preview deployed! Check Vercel dashboard for URL."
echo "📋 Don't forget to:"
echo "   1. Share preview URL with Orla"
echo "   2. Monitor feedback in /admin/status"
echo "   3. Check Obsidian sync in vault"
