#!/bin/bash

# OrlaMarieCoach Preview Deployment Setup
# This script configures the project for stakeholder preview with feedback collection

echo "🌱 Setting up OrlaMarieCoach preview deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must be run from project root directory"
    exit 1
fi

# Create environment file for preview
echo "📝 Creating preview environment configuration..."
cat > .env.preview << EOF
# Preview Environment Configuration
NODE_ENV=production
NEXT_PUBLIC_PREVIEW_MODE=true
NEXT_PUBLIC_FEEDBACK_ENABLED=true

# Database (use development database for preview)
DATABASE_URL="postgresql://orla:orla@localhost:5432/orla_dev?schema=public"

# Analytics
ANALYTICS_PRIVACY_MODE=true
ANALYTICS_RETENTION_DAYS=365

# Obsidian Integration
OBSIDIAN_SYNC_ENABLED=true
OBSIDIAN_VAULT_PATH="/home/developer/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website"

# Preview Settings
PREVIEW_PASSWORD="orla-preview-2025"
EOF

# Initialize project status file
echo "📊 Initializing project status tracking..."
node -e "
const { projectStatus } = require('./src/lib/project-status.ts');
projectStatus.updateStatus({
  currentPhase: 'Preview & Feedback Collection',
  completionPercentage: 65,
  lastUpdated: new Date().toISOString()
});
console.log('Project status initialized');
"

# Create preview deployment script
echo "🚀 Creating deployment script..."
cat > scripts/deploy-preview.sh << 'EOF'
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
EOF

chmod +x scripts/deploy-preview.sh

# Create feedback monitoring script
echo "👀 Creating feedback monitoring script..."
cat > scripts/monitor-feedback.sh << 'EOF'
#!/bin/bash

echo "👀 Monitoring feedback for OrlaMarieCoach..."

# Check if feedback API is responding
curl -f http://localhost:3004/api/feedback > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Feedback API is responding"
else
    echo "❌ Feedback API is not responding"
    exit 1
fi

# Get feedback count
FEEDBACK_COUNT=$(curl -s http://localhost:3004/api/feedback | jq '.total' 2>/dev/null || echo "0")
echo "📊 Total feedback items: $FEEDBACK_COUNT"

# Check Obsidian sync
OBSIDIAN_PATH="/home/developer/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website"
if [ -d "$OBSIDIAN_PATH" ]; then
    echo "✅ Obsidian vault accessible"
    
    # Check for recent feedback files
    RECENT_FILES=$(find "$OBSIDIAN_PATH/06-Meetings/Stakeholder-Feedback" -name "*.md" -mtime -1 2>/dev/null | wc -l)
    echo "📁 Recent feedback files: $RECENT_FILES"
else
    echo "⚠️  Obsidian vault not found at: $OBSIDIAN_PATH"
fi

echo "🔗 Admin dashboard: http://localhost:3004/admin/status"
EOF

chmod +x scripts/monitor-feedback.sh

# Create Obsidian sync test script
echo "🔗 Creating Obsidian sync test..."
cat > scripts/test-obsidian-sync.sh << 'EOF'
#!/bin/bash

OBSIDIAN_PATH="/home/developer/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website"

echo "🔗 Testing Obsidian vault integration..."

# Check if vault exists
if [ ! -d "$OBSIDIAN_PATH" ]; then
    echo "❌ Obsidian vault not found at: $OBSIDIAN_PATH"
    echo "📋 Please ensure the vault is accessible at this path"
    exit 1
fi

echo "✅ Obsidian vault found"

# Check key files
KEY_FILES=(
    "📋 PROJECT-OVERVIEW.md"
    "🎯 CURRENT-FOCUS.md"
    "DEVELOPMENT-ROADMAP-2025.md"
    "PROJECT-REVIEW-CRITICAL-ANALYSIS.md"
)

for file in "${KEY_FILES[@]}"; do
    if [ -f "$OBSIDIAN_PATH/$file" ]; then
        echo "✅ Found: $file"
    else
        echo "⚠️  Missing: $file"
    fi
done

# Create test feedback directory if needed
mkdir -p "$OBSIDIAN_PATH/06-Meetings/Stakeholder-Feedback"
echo "📁 Ensured feedback directory exists"

# Test write permissions
TEST_FILE="$OBSIDIAN_PATH/06-Meetings/test-integration-$(date +%s).md"
if echo "# Test Integration" > "$TEST_FILE" 2>/dev/null; then
    echo "✅ Write permissions confirmed"
    rm "$TEST_FILE"
else
    echo "❌ No write permissions to Obsidian vault"
    exit 1
fi

echo "🎉 Obsidian integration test passed!"
EOF

chmod +x scripts/test-obsidian-sync.sh

# Create stakeholder instructions
echo "📋 Creating stakeholder instructions..."
cat > STAKEHOLDER-PREVIEW-INSTRUCTIONS.md << 'EOF'
# 🌱 OrlaMarieCoach Website Preview Instructions

Dear Orla,

Your website is ready for preview and feedback! Here's how to review it:

## 🔗 Preview URL
[Will be provided after deployment]

## 📱 What to Test
Please review the website on different devices:
- **Desktop/Laptop** - Main experience
- **Tablet** - Medium screen experience  
- **Mobile Phone** - Mobile experience

## 📝 How to Give Feedback

### 1. Look for the Blue Button
On every page, you'll see a blue circular button in the bottom-right corner with a speech bubble icon.

### 2. Click to Share Feedback
When you have thoughts about any page or element, click the feedback button.

### 3. Fill Out the Form
- **Page**: Automatically detected
- **Element**: Optional (e.g., "header image", "pricing table")
- **Type**: Choose what kind of feedback
  - **Design**: Colors, layout, appearance
  - **Content**: Text, wording, information
  - **Bug**: Something that doesn't work
  - **Enhancement**: Ideas for improvement
  - **General**: Other thoughts
- **Priority**: How important is this?
  - **Critical**: Must fix before launch
  - **High**: Important to address
  - **Medium**: Nice to have
  - **Low**: Minor suggestion
- **Description**: Explain what you like/don't like/want changed
- **Suggestion**: Ideas for how to improve (optional)

### 4. Submit Your Feedback
Click "Send Feedback" and you'll see a confirmation message.

## 🎯 What to Look For

### Content & Messaging
- Is the tone right for your brand?
- Does the content accurately represent your services?
- Are prices and information correct?
- Does it appeal to your target audience?

### Design & Visual Appeal
- Do you like the colors and overall look?
- Are the images appropriate and engaging?
- Does it feel professional and trustworthy?
- Is it easy to read and navigate?

### Functionality
- Do all buttons and links work?
- Can you navigate easily between pages?
- Does the audio player work for meditation samples?
- Are forms easy to fill out?

### Mobile Experience
- Is everything readable on your phone?
- Can you tap buttons easily?
- Does scrolling feel smooth?

## ⏰ Timeline
Please complete your review within **one week** of receiving the preview URL. The more detailed your feedback, the better we can refine the website to match your vision.

## 🤝 Next Steps
After you've provided feedback:
1. We'll review all your comments
2. Implement the most important changes
3. Share an updated preview if needed
4. Proceed with the analytics implementation and final launch

## 💌 Questions?
If you have any questions about the preview or how to give feedback, please reach out immediately.

Thank you for your time and input!

---
*This preview includes a feedback collection system that automatically organizes your comments for efficient implementation.*
EOF

echo "✅ Preview setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run: ./scripts/test-obsidian-sync.sh"
echo "2. Run: npm run dev (to test locally)"
echo "3. Run: ./scripts/deploy-preview.sh (to deploy)"
echo "4. Share STAKEHOLDER-PREVIEW-INSTRUCTIONS.md with Orla"
echo "5. Monitor feedback at: /admin/status"
echo ""
echo "🔗 Files created:"
echo "   - .env.preview"
echo "   - scripts/deploy-preview.sh"
echo "   - scripts/monitor-feedback.sh" 
echo "   - scripts/test-obsidian-sync.sh"
echo "   - STAKEHOLDER-PREVIEW-INSTRUCTIONS.md"