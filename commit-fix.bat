@echo off
echo Committing changes to fix rendering issues...
git add .
git commit -m "fix: resolve image rendering and navbar visibility issues

- Fixed image sizing in FreeMeditationSection component
- Corrected z-index conflicts between components
- Added PostCSS configuration for proper Tailwind processing
- Created server restart script for easier debugging
- Added documentation in RENDERING-ISSUE-FIX.md
- Updated project status in Obsidian documentation"

echo Pushing changes to remote repository...
git push

echo Done!
