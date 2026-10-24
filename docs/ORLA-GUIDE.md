# Updating Your Website with Claude

## Day to day

1. Open **Claude** and go to the **Code** tab. Pick the `orlamariecoach` folder.
2. Type `/start`. Claude reads the to-do list and tells you where things stand.
3. Ask for what you want in your own words, for example:
   - "Change the About page intro to say …"
   - "Swap the photo in the Services section for this one" (drag the photo into the chat)
   - "Add a new testimonial from Mary in Buncrana: …"
4. Claude shows the change in the preview pane beside the chat. Ask for tweaks until it's right.
5. Type `/preview`. Claude puts it on the **staging site** and gives you a link. Open it on your phone and laptop and check it. Nobody else is looking at this site.
6. When you're happy, type `/publish`. Claude asks you to confirm, then puts it on **orlamariecoach.com**. It's live within about 10 minutes.
7. Type `/end` when you're finished. Claude updates the to-do list for next time.

## Good to know

- Nothing reaches the live site until you say `/publish`. Steps 1 to 5 are always safe.
- If you don't like something on staging, just say so ("put the old photo back") and run `/preview` again.
- Claude will sometimes ask permission before doing something. If you're not sure, say no and ask it what it's trying to do.
- If Claude mentions the server, the domain, DNS or payments being broken, ask Conal.

---

## One-time setup (Conal)

On Orla's Windows PC:

1. Install the Claude desktop app from claude.ai/download and sign in with her own Claude account (Pro or above, for the Code tab).
2. In **PowerShell**, install the tools. Git for Windows is required: Claude Code runs its commands in Git Bash.
   ```powershell
   winget install --id Git.Git -e
   winget install --id OpenJS.NodeJS.22 -e
   winget install --id GitHub.cli -e
   ```
   Close and reopen PowerShell so the new commands are on the PATH.
3. Add her GitHub account as a collaborator on `ffxxrr/orlamariecoach` and accept the invite, then:
   ```powershell
   gh auth login        # GitHub.com, HTTPS, "Login with a web browser", yes to git credentials
   ```
4. Clone the repo and set up local env:
   ```powershell
   cd $HOME\Documents
   gh repo clone ffxxrr/orlamariecoach
   cd orlamariecoach
   copy .env.example .env.local
   npm install
   git config user.name "Orla Marie Mullan"
   git config user.email "<her email>"
   ```
5. In Claude → Code, open `Documents\orlamariecoach`. Check that the preview pane starts the site, then run `/start` once together.

If Windows Defender asks about Node.js the first time the preview starts, allow it on private networks.
