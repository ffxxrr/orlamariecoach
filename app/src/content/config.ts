import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().optional(),
    duration: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const testimonialsCollection = defineCollection({
  schema: z.object({
    clientName: z.string(),
    quote: z.string(),
    role: z.string().optional(), // e.g., "CEO, Example Inc."
    image: z.string().optional(), // Path to client's image/avatar
    rating: z.number().min(1).max(5).optional(), // Optional star rating
    date: z.date().optional(), // Optional date of testimonial
    order: z.number().default(0), // For manual sorting
  }),
});

export const collections = {
  'blog': blogCollection,
  'services': servicesCollection,
  'testimonials': testimonialsCollection, // Add testimonials collection
};
