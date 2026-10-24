import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { getPosts, formatPostDate } from '@/lib/blog'

// Re-check hourly so Tuesday's post appears without a new release
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'A short weekly note from Donegal every Tuesday: a simple mindfulness tool to try, what Orla Marie is up to, and the books, films and Irish seasons that inspire her practice.',
  alternates: {
    types: { 'application/rss+xml': '/blog/feed.xml' },
  },
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-pure-light">
        <Section padding="standard">
          <Container className="max-w-4xl">
            <header className="text-center mb-16 md:mb-20">
              <p className="text-xs uppercase tracking-[0.25em] text-sage-calm mb-4">
                Every Tuesday
              </p>
              <h1 className="font-crimson text-4xl md:text-6xl text-forest-deep mb-6">
                Notes from Donegal
              </h1>
              <p className="text-lg text-sage-calm max-w-xl mx-auto leading-relaxed">
                A short weekly read: one simple tool to try, what I&apos;m up to, and the
                books, films and seasons that shape my practice.
              </p>
            </header>

            {posts.length === 0 ? (
              <p className="text-center text-sage-calm">The first post is on its way.</p>
            ) : (
              <ul className="space-y-14 md:space-y-16">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid md:grid-cols-[2fr_3fr] gap-6 md:gap-10 items-center"
                    >
                      {post.image && (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-earth-warmth/40">
                          <Image
                            src={post.image}
                            alt={post.imageAlt || ''}
                            fill
                            sizes="(min-width: 768px) 320px, 100vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-sage-calm mb-3">
                          {formatPostDate(post.date)} · {post.readingMinutes} min read
                          {post.isScheduled && (
                            <span className="ml-2 text-forest-deep">· Scheduled (not on live yet)</span>
                          )}
                        </p>
                        <h2 className="font-crimson text-2xl md:text-3xl text-deep-text mb-3 group-hover:text-forest-deep transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-sage-calm leading-relaxed mb-4">{post.description}</p>
                        <span className="text-sm uppercase tracking-[0.15em] text-forest-deep">
                          Read
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
