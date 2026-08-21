import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * CONTENT MODEL
 *
 * Adding a project or a post is ONE edit: drop a markdown file into the right
 * directory. There is no registry to update and no UI to touch. Schema errors
 * fail the build with a readable message rather than rendering a broken page.
 *
 * Long-form sections live in the markdown body as `## Headings`. A section you
 * have not written simply does not exist — nothing renders an empty shell, and
 * the on-page contents list is generated from the headings that are present.
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** Stable archive identifier, e.g. P-001. Never reused, never reordered. */
    record: z.string(),
    title: z.string(),
    /** One line. What it is and who it is for. Used in listings and metadata. */
    tagline: z.string(),
    /** case-study = substantial documented work. experiment = a question answered quickly. */
    depth: z.enum(['case-study', 'experiment']),
    category: z.string(),
    year: z.number().int(),
    status: z.enum(['shipped', 'active', 'archived', 'prototype']),
    featured: z.boolean().default(false),
    /** Lower sorts first on the index. Omit to sort by year. */
    order: z.number().int().optional(),
    technologies: z.array(z.string()).min(1),
    links: z
      .object({
        repo: z.url().optional(),
        demo: z.url().optional(),
        docs: z.url().optional(),
      })
      .default({}),
    /** Set true to keep a file in the repo but out of the build. */
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    record: z.string(),
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['article', 'note', 'breakdown', 'reflection']),
    tags: z.array(z.string()).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
