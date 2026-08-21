import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Replace with your real domain before deploying — canonical URLs and the
// sitemap are both derived from it.
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Monochrome code. No rainbow syntax theme by design.
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
