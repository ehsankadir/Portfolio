# Personal archive — Ehsan Kadir

A static site: engineering case studies, a lab log, and writing. Built with
Astro. No database, no CMS, no client framework. Content is markdown in this
repository, validated at build time.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
npx astro check  # typecheck
```

---

## Before you deploy

Four things, in order:

1. **`src/data/profile.ts`** — every `[REPLACE ME]` in it. This file is the only
   place your name, email, claim and location live; every page reads from it.
   The `claim` field is the largest text on the site and deserves an hour.
2. **`src/data/timeline.ts`** — replaces the placeholder journey. Feeds both
   `/about` and `/resume`, so they cannot disagree.
3. **`astro.config.mjs`** — set `site` to your real domain. Canonical URLs and
   the sitemap derive from it. Update the host in `public/robots.txt` to match.
4. **`src/content/`** — replace the five example files with real work.

`profile.links.github` is `null`. While it stays null the GitHub link is hidden
everywhere rather than rendered dead. Set it as soon as you have an account —
for engineering roles, a portfolio with no inspectable code is a claim without
evidence.

---

## Adding a project

One edit: create a file in `src/content/projects/`. The filename becomes the
URL, so `ingest-pipeline.md` is served at `/work/ingest-pipeline`. Nothing else
needs touching — no registry, no component, no route.

```markdown
---
record: P-003            # stable archive ID. Never reuse, never renumber.
title: 'Real title'
tagline: 'One line: what it does and who for.'
depth: case-study        # case-study → /work  |  experiment → /lab
category: Data Engineering
year: 2026
status: shipped          # shipped | active | archived | prototype
featured: true           # true → appears on the homepage index
order: 1                 # lower sorts first; omit to sort by year
technologies: ['Python', 'DuckDB']
links:
  repo: https://github.com/you/thing
  demo: https://thing.example.com
draft: false             # true keeps the file but excludes it from the build
---

## Overview

Body prose. Sections are just `## Headings` — write the ones you have and omit
the rest. Nothing renders an empty shell, and the on-page contents list is
generated from whatever headings exist.
```

A bad or missing field fails the build with a readable message rather than
shipping a broken page. The schema is in `src/content.config.ts`.

### Case study or experiment?

`depth: case-study` is substantial work you can write a thousand words about,
including what broke. It gets `/work`, a hero image slot, a contents rail, and
full case-study structure.

`depth: experiment` is a question you answered in an afternoon. It gets `/lab`,
a dense mono log entry, and a stripped detail page — no hero, no contents rail.
The distinction is structural on purpose: a lab note should not be dressed up as
a case study.

Test: if you cannot fill a "what broke" section with something specific and
slightly unflattering, it is an experiment.

### The Lab nav link

`/lab` only appears in the primary navigation once there are **four or more**
experiments. Below that it is reachable from the footer and from a cross-link at
the bottom of `/work`. A nav item pointing at a near-empty page reads as
neglect, not curiosity. The rule lives in `src/layouts/Base.astro`.

---

## Adding a post

Create a file in `src/content/posts/`. Filename becomes the URL.

```markdown
---
record: W-003
title: 'Real title'
summary: 'One sentence that makes the argument, not one that describes the post.'
kind: note               # article | note | breakdown | reflection
tags: ['systems']
published: 2026-08-01
updated: 2026-08-14      # optional
draft: false
---

Body.
```

Reading time is computed from the body at build time — there is no field to
maintain and it cannot go stale.

## Adding a journey or resume entry

Append to the array in `src/data/timeline.ts`. It renders in the Journey section
on `/about` and on `/resume`. The optional `detail` array of bullet lines is used
by `/resume` only.

## Images

Put them in `src/assets/` and reference them from markdown. Astro optimises and
lazy-loads anything it processes. Until you have real screenshots, case studies
show a labelled placeholder block at the correct aspect ratio.

---

## Structure

```
src/
  content.config.ts   collection schemas — the contract for all content
  content/
    projects/         case studies and experiments (one file each)
    posts/            writing
  data/
    profile.ts        who you are. The single source.
    timeline.ts       journey + resume. The single source.
  lib/content.ts      query helpers. All filtering and sorting lives here.
  layouts/Base.astro  head, metadata, nav, footer, theme, scroll reveal
  components/         RecordRow, SectionHead, Empty
  styles/global.css   the entire design system
  pages/              routes
```

Routes: `/` `/work` `/work/[slug]` `/lab` `/writing` `/writing/[slug]`
`/about` `/resume` `/contact` `/404`

## Design system

Everything visual is in `src/styles/global.css`. No component hardcodes a
colour; all of it comes from custom properties at the top of that file.

- **Type** — Bodoni Moda (display), Inter (text), JetBrains Mono (all metadata:
  dates, tags, record numbers, labels, captions).
- **Colour** — a cool paper, near-black ink, one ultramarine accent used only
  for things you can interact with. Dark mode is composed separately, not
  inverted.
- **Rules, not cards** — 1px hairlines, `border-radius: 0` globally, no shadows,
  no gradients. This single constraint is what keeps it from looking templated.
- **The record number** is the signature: every entry carries a stable ID from
  its frontmatter, shown in mono. It is a real identifier, not decoration.
- **Motion** — opacity plus a 6px lift, 180–260ms, on list items only. Fully
  disabled under `prefers-reduced-motion`.

Verified AA contrast in both themes for body text, muted metadata, and the
accent, against both the page and panel backgrounds.

To revert to the earlier direction (Instrument Serif, terracotta accent): change
`--font-display` and `--accent` in `global.css` and swap the Google Fonts link in
`Base.astro`. Two edits.

## Deploying

Static output, so anything works. Cloudflare Pages or Netlify free tier:

- Build command `npm run build`
- Output directory `dist`

Set `site` in `astro.config.mjs` first or canonical URLs and the sitemap will
point at `example.com`.

`/resume` prints to PDF via the browser (there is a button) using a dedicated
print stylesheet that drops the nav, footer and theme toggle. You may still want
a separately designed PDF for applicant tracking systems.

## Deliberately not built

GitHub activity integration, search, analytics, newsletter, RSS, an AI
assistant, tag archive pages. None of them improve a site with five entries in
it. RSS is the first one worth adding — it is short, and it is the only one that
matters at low content volume.
