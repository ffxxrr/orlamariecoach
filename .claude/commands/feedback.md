# Check Orla's Feedback

Fetch and analyze feedback from the production site.

## Tasks

1. **Fetch feedback** from the API:
   ```
   curl -s https://orlamariecoach.vercel.app/api/feedback
   ```

2. **Categorize** the feedback:
   - New/unprocessed items (priority)
   - Previously addressed items
   - Group by page or type if multiple items

3. **For new feedback**, provide:
   - The exact message
   - Which page it relates to
   - Suggested action/fix
   - Priority level (high/medium/low)

4. **If no new feedback**, just confirm the count of total feedback items and when the last one was submitted.

Keep output concise and actionable.
