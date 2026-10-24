# Start Development Session

Begin a new development session for OrlaMarieCoach.

## Tasks

1. **Read project context** - Load project state from `docs/BACKLOG.md`

2. **Check for new feedback** via the API:
   ```
   curl -s https://orlamariecoach.vercel.app/api/feedback
   ```
   Report if there's any new/unprocessed feedback.

3. **Git status** - Show current branch, uncommitted changes, and last 5 commits.

4. **Summarize** - Give me a brief summary of:
   - What was done last session (from Session Log in BACKLOG.md)
   - What's in "Next Session" or "In Progress"
   - Any blockers or items waiting on Orla or Conal
   - Any new feedback requiring attention

5. **Ask** what I want to work on today.

Keep the summary concise - bullet points, not paragraphs.
