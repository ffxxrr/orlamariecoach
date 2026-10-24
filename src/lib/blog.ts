import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

// Posts live in /content/blog as markdown files with a small header:
//
// ---
// title: Samhain and the thin places
// date: 2026-10-27
// description: One or two sentences for Google and social previews.
// image: /images/blog/samhain.jpg
// imageAlt: Misty Donegal hills at dusk
// ---
//
// A post only appears on the live site once its date has arrived (from 7am
// Irish time), so posts can be approved days ahead and go out on Tuesday.
// Staging and local preview show scheduled posts too, so they can be checked.

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLISH_HOUR_DUBLIN = 7

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app'
const isProduction = BASE_URL === 'https://orlamariecoach.com'

export type BlogPost = {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  description: string
  image?: string
  imageAlt?: string
  html: string
  readingMinutes: number
  isScheduled: boolean
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string>, body: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }
  return { data, body: match[2] }
}

// Publish moment for a post date, as a UTC timestamp. Ireland is UTC+1 in
// summer and UTC+0 in winter; using UTC+1 means it is never early.
function publishTime(date: string) {
  return Date.parse(`${date}T${String(PUBLISH_HOUR_DUBLIN - 1).padStart(2, '0')}:00:00Z`)
}

function readPost(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const slug = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: data.title || slug,
    date: data.date || file.slice(0, 10),
    description: data.description || '',
    image: data.image,
    imageAlt: data.imageAlt,
    html: marked.parse(body, { async: false }) as string,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    isScheduled: Date.now() < publishTime(data.date || file.slice(0, 10)),
  }
}

/** Posts visitors can see, newest first. */
export function getPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(readPost)
    .filter((p) => !isProduction || !p.isScheduled)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function formatPostDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Dublin',
  })
}

export { BASE_URL as SITE_URL }
