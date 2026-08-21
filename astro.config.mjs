import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio.ehsankadir413.workers.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Monochrome code. No rainbow syntax theme by design.
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
