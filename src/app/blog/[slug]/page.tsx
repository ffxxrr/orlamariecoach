import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import { getPosts, getPost, formatPostDate, SITE_URL } from '@/lib/blog'

export const revalidate = 3600
// Posts scheduled after the last release still render once their day arrives
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ['Orla Marie Mullan'],
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    url,
    author: { '@type': 'Person', name: 'Orla Marie Mullan', url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'Orla Marie Coach', url: SITE_URL },
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-pure-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article className="py-16 md:py-24">
          <Container className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-block text-xs uppercase tracking-[0.2em] text-sage-calm hover:text-forest-deep transition-colors mb-10"
            >
              All posts
            </Link>

            <header className="mb-10 md:mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-sage-calm mb-4">
                {formatPostDate(post.date)} · {post.readingMinutes} min read
                {post.isScheduled && (
                  <span className="ml-2 text-forest-deep">· Scheduled (not on live yet)</span>
                )}
              </p>
              <h1 className="font-crimson text-4xl md:text-5xl text-deep-text leading-tight">
                {post.title}
              </h1>
            </header>

            {post.image && (
              <div className="relative aspect-[1200/630] overflow-hidden rounded-md mb-12 bg-earth-warmth/40">
                <Image
                  src={post.image}
                  alt={post.imageAlt || ''}
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />

            <footer className="mt-16 pt-10 border-t border-earth-warmth">
              <p className="font-crimson text-2xl text-deep-text mb-3">
                Would you like to go deeper?
              </p>
              <p className="text-sage-calm leading-relaxed mb-6">
                I work with individuals, schools and workplaces, in person in Donegal and online.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-block bg-forest-deep text-pure-light px-8 py-4 rounded-sm text-sm uppercase tracking-[0.15em] hover:bg-forest-deep/90 transition-colors duration-300"
                >
                  Get in touch
                </Link>
                <div className="flex items-center gap-4 text-sm text-sage-calm">
                  <span>Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-forest-deep transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-forest-deep transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </footer>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  )
}
