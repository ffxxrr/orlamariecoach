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
