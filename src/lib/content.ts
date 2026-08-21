import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;
export type PostEntry = CollectionEntry<'posts'>;

const live = <T extends { data: { draft: boolean } }>(entries: T[]) =>
  entries.filter((e) => !e.data.draft);

/** Case studies and experiments, in canonical order: `order`, then newest. */
export async function allProjects(): Promise<ProjectEntry[]> {
  return live(await getCollection('projects')).sort(
    (a, b) =>
      (a.data.order ?? 999) - (b.data.order ?? 999) || b.data.year - a.data.year,
  );
}

export async function caseStudies(): Promise<ProjectEntry[]> {
  return (await allProjects()).filter((p) => p.data.depth === 'case-study');
}

export async function experiments(): Promise<ProjectEntry[]> {
  return (await allProjects()).filter((p) => p.data.depth === 'experiment');
}

export async function featuredProjects(): Promise<ProjectEntry[]> {
  return (await caseStudies()).filter((p) => p.data.featured);
}

export async function categories(): Promise<string[]> {
  return [...new Set((await caseStudies()).map((p) => p.data.category))].sort();
}

/**
 * The stack index: technologies aggregated from the projects themselves, with a
 * count of how many use each. Derived, never asserted — no skill bars, no
 * self-assigned percentages, nothing to maintain by hand.
 */
export async function stackIndex(): Promise<{ tech: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const p of await allProjects()) {
    for (const t of p.data.technologies) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts]
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count || a.tech.localeCompare(b.tech));
}

export async function sortedPosts(): Promise<PostEntry[]> {
  return live(await getCollection('posts')).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
}

/** Prev/next within the same depth, so a case study never links to a lab note. */
export async function neighbours(entry: ProjectEntry) {
  const pool =
    entry.data.depth === 'experiment' ? await experiments() : await caseStudies();
  const i = pool.findIndex((p) => p.id === entry.id);
  return { prev: i > 0 ? pool[i - 1] : undefined, next: i < pool.length - 1 ? pool[i + 1] : undefined };
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

/** ~220 wpm, computed from the body rather than stored in frontmatter. */
export const readingMinutes = (body: string) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
