import { getPosts, SITE_URL } from '@/lib/blog'

// RSS feed of published posts. The social posting tool (Make/Zapier) watches
// the live site's copy of this and shares each new post to Facebook,
// Instagram and LinkedIn. Images are JPEG because Instagram won't take WebP.
export const revalidate = 3600

function escape(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function GET() {
  const posts = getPosts().filter((p) => !p.isScheduled)

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const image = post.image ? `${SITE_URL}${post.image}` : ''
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T07:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.description)}</description>${
        image
          ? `
      <enclosure url="${image}" type="image/jpeg" length="0" />
      <media:content url="${image}" medium="image" type="image/jpeg" />`
          : ''
      }
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Orla Marie Coach: Notes from Donegal</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>A short weekly note on mindfulness from Donegal, every Tuesday.</description>
    <language>en-ie</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
