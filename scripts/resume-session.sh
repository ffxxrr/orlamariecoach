#!/bin/bash

# Resume Session Script - OrlaMarieCoach Website
# Run this at the start of each session to get up to speed

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         OrlaMarieCoach - Session Resume                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Navigate to project directory
cd /home/developer/Documents/orlamariecoach || exit 1

echo "📂 Project Directory: $(pwd)"
echo ""

# Git Status
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔀 GIT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git status --short
echo ""

# Recent commits
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 RECENT COMMITS (Last 5)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git log --oneline --decorate -5
echo ""

# Current branch
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌿 BRANCH INFO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Current branch: $(git branch --show-current)"
echo "Ahead of remote: $(git rev-list --count @{u}..HEAD 2>/dev/null || echo '0') commits"
echo "Behind remote: $(git rev-list --count HEAD..@{u} 2>/dev/null || echo '0') commits"
echo ""

# New feedback check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💬 FEEDBACK STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if jq is available
if command -v jq &> /dev/null; then
    NEW_COUNT=$(curl -s https://orlamariecoach.vercel.app/api/feedback 2>/dev/null | jq '.feedback | map(select(.status == "new")) | length' 2>/dev/null || echo "Error")
    TOTAL_COUNT=$(curl -s https://orlamariecoach.vercel.app/api/feedback 2>/dev/null | jq '.feedback | length' 2>/dev/null || echo "Error")

    if [ "$NEW_COUNT" != "Error" ]; then
        echo "Total feedback items: $TOTAL_COUNT"
        echo "New (unprocessed): $NEW_COUNT"

        if [ "$NEW_COUNT" -gt 0 ]; then
            echo ""
            echo "⚠️  YOU HAVE NEW FEEDBACK FROM ORLA! ⚠️"
            echo ""
            echo "Latest feedback items:"
            curl -s https://orlamariecoach.vercel.app/api/feedback 2>/dev/null | jq -r '.feedback | map(select(.status == "new")) | .[] | "  📌 \(.page) - \(.type): \(.message[0:60])..."' 2>/dev/null | head -5
        else
            echo "✅ No new feedback - waiting for Orla's response"
        fi
    else
        echo "⚠️  Unable to fetch feedback (check internet connection)"
    fi
else
    echo "⚠️  jq not installed - install with: sudo apt-get install jq"
    echo "Manual check: curl -s https://orlamariecoach.vercel.app/api/feedback"
fi
echo ""

# Latest deployment
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 DEPLOYMENT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v vercel &> /dev/null; then
    echo "Latest deployment:"
    vercel ls 2>/dev/null | head -5 | tail -1 || echo "Unable to fetch deployment info"
else
    echo "⚠️  Vercel CLI not available"
fi
echo ""
echo "Production URL: https://orlamariecoach.vercel.app"
echo ""

# Session state summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 SESSION STATE SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "SESSION-STATE.md" ]; then
    echo "Last updated: $(grep 'Last Updated:' SESSION-STATE.md | head -1 | cut -d':' -f2-)"
    echo "Current phase: $(grep 'Current Phase:' SESSION-STATE.md | head -1 | cut -d':' -f2-)"
    echo ""
    echo "📖 Read full state: cat SESSION-STATE.md"
else
    echo "⚠️  SESSION-STATE.md not found"
fi
echo ""

# Next steps
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ READY TO WORK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Quick actions:"
echo "  1. Review session state:    cat SESSION-STATE.md"
echo "  2. Check detailed feedback: curl -s https://orlamariecoach.vercel.app/api/feedback | jq"
echo "  3. Start dev server:        npm run dev"
echo "  4. View Obsidian tracker:   cat /home/developer/Documents/Obsidian\\ Vault/01-Projects/Personal/OrlaMarieCoach-Website/STAKEHOLDER-FEEDBACK-TRACKER.md"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "Ready to continue! Ask Claude to review the session state."
echo "═══════════════════════════════════════════════════════════════"
echo ""
