export type TimelineKind =
  | 'education'
  | 'role'
  | 'project'
  | 'certification'
  | 'milestone';

export interface TimelineEntry {
  record: string;
  kind: TimelineKind;
  title: string;
  org?: string;
  start: string;
  end?: string;
  summary: string;
  /** Bullet lines. Used by /resume; the /about timeline shows the summary only. */
  detail?: string[];
  href?: string;
}

/**
 * SINGLE SOURCE OF TRUTH for both the Journey section on /about and the /resume
 * page. They cannot drift because they read the same array.
 *
 * Nothing here is invented. Every entry is a placeholder until you replace it.
 */
export const timeline: TimelineEntry[] = [
  {
    record: 'T-001',
    kind: 'role',
    title: '[ROLE OR TITLE]',
    org: '[ORGANISATION]',
    start: '2025',
    end: 'present',
    summary: '[REPLACE ME — what you actually do here, in one or two sentences.]',
    detail: [
      '[REPLACE ME — a specific thing you built or changed.]',
      '[REPLACE ME — a second one. Concrete beats impressive.]',
    ],
  },
  {
    record: 'T-002',
    kind: 'project',
    title: '[A PROJECT MILESTONE]',
    start: '2025',
    summary: '[REPLACE ME — what you shipped and why it mattered to you.]',
    href: '/work/example-case-study',
  },
  {
    record: 'T-003',
    kind: 'education',
    title: '[QUALIFICATION]',
    org: '[INSTITUTION]',
    start: '2022',
    end: '2026',
    summary: '[REPLACE ME — keep this short. Nobody reads it twice.]',
  },
];

export const sortedTimeline = [...timeline].sort((a, b) =>
  b.start.localeCompare(a.start),
);
