# Sharing Each Blog Post to Facebook, Instagram and LinkedIn

Every Tuesday at 7am a new post appears on the blog. A free Make.com account
watches the blog's feed and shares each new post to Orla's social accounts, so
she doesn't have to.

Orla does this setup herself (it takes about 45 minutes, once), with Claude
walking her through it a step at a time. It has to be her because each social
account asks its owner to log in and say yes. Claude can open the pages in
Chrome and point to what to click. Orla types any passwords herself.

## Before starting (10 minutes)

1. **Instagram must be a Professional account** (Business or Creator) and
   **linked to the Facebook page**. In the Instagram app: Settings, Account
   type and tools, Switch to professional account. Then on Facebook: the
   page, Settings, Linked accounts, Instagram, Connect.
2. Orla must be an **admin of the Facebook page** (she will be if she made it).
3. **LinkedIn: personal profile or a company page?** Make can post to either.
   A company page needs Orla to be its admin. Ask her which.

## Build it in Make

1. Go to make.com and sign up free with admin@orlamariecoach.com (or her
   usual email). The free plan is plenty: one post a week uses about
   4 operations, and the limit is 1,000 a month.
2. **Create a new scenario.** Add the **RSS** app, **Watch RSS feed items**:
   - URL: `https://orlamariecoach.com/blog/feed.xml`
   - Maximum number of returned items: 1
3. Add a **Router** after it, with three routes:
   - **Facebook Pages, Create a Post.** Connect her Facebook (she logs in and
     ticks the page and the Instagram account when asked). Pick the page.
     Message: the item's **Description**. Link: the item's **URL**.
   - **LinkedIn, Create a Link Post** (user or organisation, depending on
     what she chose). Connect LinkedIn. Content: **Description**.
     URL: the item's **URL**. Title: **Title**.
   - **Instagram for Business, Create a Photo Post.** Use the same Facebook
     connection. Pick her Instagram account. Photo URL: the image from the
     feed (Make shows it under **Enclosures, URL**). Caption:
     ```
     {Title}

     {Description}

     Read the full post: link in bio.
     ```
4. **Schedule:** set it to run every hour (or "Every day" at 08:00). Posts go
   live at 7am Irish time and the feed updates within the hour, so 8am is safe.
5. Save, and switch the scenario **ON**. When Make asks where to start, choose
   **From now on**.

Before Tuesday 27 October the live feed is empty, so the first run there is
nothing to share. That's expected.

## First post (Tuesday 27 October)

Facebook, Instagram and LinkedIn have no "test" mode: anything shared is real.
So the Samhain post itself is the test.

After 8am on the 27th, check the Facebook page, Instagram and LinkedIn. If a
post is missing, open the scenario in Make, click **History**, and open the
red run to see the message. Usual causes:

- Instagram "not a business account" or "no Instagram account found":
  step 1 of "Before starting" isn't done, or the Instagram box wasn't ticked
  when connecting Facebook. Reconnect the Facebook connection in Make.
- Facebook "permissions": reconnect and tick the page.
- Image errors on Instagram: the image must be a JPEG (see the blog guide).

To re-run after fixing: right-click the RSS module, **Choose where to start**,
**All**, then **Run once**. It shares the newest post again, so delete any copy
that already went out on the accounts that worked.

## Linking in Instagram bio

Instagram captions can't hold clickable links. Put
`https://orlamariecoach.com/blog` in the Instagram bio (Edit profile, Links)
once, and it stays right for every post.
