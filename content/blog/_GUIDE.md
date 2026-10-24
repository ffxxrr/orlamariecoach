# Weekly blog: how posts are written

Files starting with `_` are not shown on the site.

Orla approves every post; Claude drafts them. One post per week, dated the
coming **Tuesday**. It appears on the live site at 7am Irish time that day and
the social posting tool shares it to Facebook, Instagram and LinkedIn.

## Each post has

- **A hook from this week**: something current (the season, the weather, news
  people are talking about, a festival or awareness day). Keep news light and
  kind; never political or tragic events.
- **Something Orla is doing**: a workshop, a school or workplace session, a
  visit to an ancient site, a course she's on. Only use what's in
  `private/blog-notes.md` or what Orla has said. Never invent events.
- **One simple tool** the reader can try today, in 3 to 5 steps.
- **Optionally, a reference** to a book, film or post Orla loves (from the
  notes file). Mention it briefly in her words; never quote more than a line.

## Voice

- Short and snappy: 250 to 400 words. Short paragraphs, plain words.
- Warm, Irish, first person ("I"). Irish phrasing is welcome ("mind yourself").
- Trauma-informed: invitational, never "you must"; offer an eyes-open option.
- No emojis, no hashtags in the post, no hard selling. End with
  "I'll be back next Tuesday" and sign off *Orla Marie*.
- Irish/British spelling (colour, favourite, practise as a verb).

## Avoid the AI tells

Write like a person who knows the subject, not a content generator.

- Output only the post: no "Certainly! Here's...", no "I hope this helps".
  No placeholders like [Insert image] or TODO. If something is missing, ask Orla.
- No em dashes (—), and no spaced dashes or hyphens as a sentence break. Use a
  comma, colon, full stop or brackets. Hyphens in words are fine (five-minute).
- Open with a real moment or a specific fact, never "In today's fast-paced
  world", "Have you ever wondered" or "Picture this". Don't announce the post
  ("In this post we'll explore..."), no "Let's dive in", and no "Conclusion" or
  "Key takeaways" heading.
- Plain words: no delve, tapestry, vibrant, realm, foster, embark, unlock,
  "plays a crucial role", "it's worth noting". "Journey" is fine when it means
  Turas or a real trip. "Holistic" and "resonate" are allowed but use sparingly.
- No "Whether you're X or Y". "Not just X, but Y" at most once. No "Here's the
  thing:" or "The best part?". Don't start two paragraphs in a row with "This".
- Vary sentence and paragraph length; avoid neat three-word lists.
- Be specific: names, places, dates, what actually happened. Vagueness is the
  biggest tell, and no checker catches it.

## Before Orla sees a draft

Run `npm run lint:blog` (or `node scripts/lint-blog.js <file>`). Fix every
"MUST FIX" item, and fix "Should fix" items by rewriting the whole sentence,
not swapping one word for another. Repeat until the post reads "Clean". If a
flagged word is genuinely right, it can be removed from the list at the top of
`scripts/lint-blog.js`.

## File format

`content/blog/YYYY-MM-DD-short-slug.md` with:

```
---
title: Short, specific, under 60 characters
date: YYYY-MM-DD   (a Tuesday)
description: One or two sentences for Google and social previews.
image: /images/blog/<name>.jpg   (1200x630 JPEG, Instagram needs JPEG)
imageAlt: What the photo shows
---
```

Make the image with sharp from a photo in `public/images` (crop so faces stay
in frame), or ask Orla for a new photo.
