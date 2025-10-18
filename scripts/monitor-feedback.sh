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
