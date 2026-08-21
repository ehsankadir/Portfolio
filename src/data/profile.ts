/**
 * THE ONE PLACE YOUR IDENTITY LIVES.
 * Every page, page title, and structured-data block reads from here.
 * Nothing about you is hardcoded anywhere else.
 */
export const profile = {
  name: 'Ehsan Kadir',
  email: 'fathurehsan19@gmail.com',

  /**
   * One line, in your own words. Not a job title — a claim about what you do.
   * This is the largest text on the site. It is worth an hour of your time.
   */
  claim: '[REPLACE ME — one line. What you build, and what you do with what you learn.]',

  /** Short version, used in meta descriptions and the resume header. */
  positioning: '[REPLACE ME — one sentence for search results and link previews.]',

  location: '[REPLACE ME — city, country]',

  /** Shown on /contact. Set false when you are not looking. */
  openToWork: true,
  availability: '[REPLACE ME — what you are open to right now, stated plainly.]',

  /**
   * Set `github` once you have an account. While it is null the link is hidden
   * everywhere rather than rendered dead.
   */
  links: {
    github: null as string | null,
    linkedin: null as string | null,
  },

  /** Front matter for the homepage colophon. Three lines, kept current. */
  currently: [
    { label: 'Building', value: '[REPLACE ME — what is open in your editor]' },
    { label: 'Learning', value: '[REPLACE ME — what you are deliberately bad at]' },
    { label: 'Reading', value: '[REPLACE ME — title, author]' },
  ],
};

export const socialLinks: { label: string; href: string }[] = [
  { label: 'GitHub', href: profile.links.github },
  { label: 'LinkedIn', href: profile.links.linkedin },
].flatMap(({ label, href }) => (href ? [{ label, href }] : []));
