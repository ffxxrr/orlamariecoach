# Publish to the Live Site

Put what is currently on staging onto https://orlamariecoach.com.

Only do this when Orla has asked for it to go live.

## Tasks

1. **Confirm what's going live** - List the changes since the last release in plain language:
   ```
   git fetch --tags
   git log --oneline $(git describe --tags --abbrev=0 --match 'v*' 2>/dev/null || git rev-list --max-parents=0 HEAD)..origin/main
   ```
   If nothing is listed, say so and stop. Otherwise ask Orla to confirm she's checked these on staging.

2. **Make sure staging is up to date** - `git status` should be clean and `main` pushed. If not, run `/preview` first.

3. **Tag the release** - Use today's date: `vYYYY.MM.DD`. If that tag already exists, add `-2`, `-3`, and so on.
   ```
   git tag v2026.10.24 origin/main
   git push origin v2026.10.24
   ```

4. **Watch the build** - `gh run watch $(gh run list --workflow deploy-production.yml --limit 1 --json databaseId -q '.[0].databaseId') --exit-status`. If it fails, show the error and suggest asking Conal.

5. **Tell Orla** - The build is done and the live site picks it up within about 5 minutes. Give her https://orlamariecoach.com and suggest a hard refresh (or checking on her phone) if she still sees the old version.

6. **Backlog** - Note the release in the Session Log in `docs/BACKLOG.md`.
