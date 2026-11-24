/**
 * A 5×5 block font, drawn here rather than borrowed. Used for the masthead name.
 * Unknown characters render as a blank cell so a name with punctuation never throws.
 */
const GLYPHS: Record<string, string[]> = {
  A: [' ███ ', '█   █', '█████', '█   █', '█   █'],
  B: ['████ ', '█   █', '████ ', '█   █', '████ '],
  C: [' ████', '█    ', '█    ', '█    ', ' ████'],
  D: ['████ ', '█   █', '█   █', '█   █', '████ '],
  E: ['█████', '█    ', '████ ', '█    ', '█████'],
  F: ['█████', '█    ', '████ ', '█    ', '█    '],
  G: [' ████', '█    ', '█  ██', '█   █', ' ████'],
  H: ['█   █', '█   █', '█████', '█   █', '█   █'],
  I: ['█████', '  █  ', '  █  ', '  █  ', '█████'],
  J: ['  ███', '   █ ', '   █ ', '█  █ ', ' ██  '],
  K: ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
  L: ['█    ', '█    ', '█    ', '█    ', '█████'],
  M: ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
  N: ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
  O: [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
  P: ['████ ', '█   █', '████ ', '█    ', '█    '],
  Q: [' ███ ', '█   █', '█ █ █', '█  █ ', ' ██ █'],
  R: ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
  S: [' ████', '█    ', ' ███ ', '    █', '████ '],
  T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  U: ['█   █', '█   █', '█   █', '█   █', ' ███ '],
  V: ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
  W: ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
  X: ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
  Y: ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
  Z: ['█████', '   █ ', '  █  ', ' █   ', '█████'],
  ' ': ['   ', '   ', '   ', '   ', '   '],
};

const BLANK = ['     ', '     ', '     ', '     ', '     '];

/** Render one word as five lines of block characters. */
export function asciiWord(word: string): string {
  const rows = ['', '', '', '', ''];
  for (const ch of word.toUpperCase()) {
    const glyph = GLYPHS[ch] ?? BLANK;
    glyph.forEach((line, i) => {
      rows[i] += line + ' ';
    });
  }
  return rows.map((r) => r.trimEnd()).join('\n');
}

/**
 * The same glyphs as an SVG path: one inset square per lit cell, so the name
 * scales crisply at any size and reads as an LED matrix rather than text.
 */
export function bannerPath(word: string): { d: string; width: number; height: number } {
  const lines = asciiWord(word).split('\n');
  const inset = 0.08;
  const size = 1 - inset * 2;
  let d = '';
  lines.forEach((line, y) => {
    [...line].forEach((ch, x) => {
      if (ch === '█') d += `M${x + inset} ${y + inset}h${size}v${size}h-${size}z`;
    });
  });
  return { d, width: Math.max(...lines.map((l) => l.length)), height: lines.length };
}

/** Longest word that stays legible as dots on a 360px phone. */
const MAX_BANNER_LETTERS = 9;

/** True when every letter has a glyph and the word is short enough to stay readable. */
export function canBanner(word: string): boolean {
  return word.length > 0 && word.length <= MAX_BANNER_LETTERS && /^[A-Za-z]+$/.test(word);
}
