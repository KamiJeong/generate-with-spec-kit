import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { colors, semantic } from '../src/index';

describe('palette completeness', () => {
  it('includes at least seven gray steps and five primary steps', () => {
    expect(Object.keys(colors.gray)).toHaveLength(11);
    expect(Object.keys(colors.primary).length).toBeGreaterThanOrEqual(5);
  });

  it('includes all 19 semantic tokens', () => {
    expect(Object.keys(semantic)).toHaveLength(19);
  });

  it('documents the palette catalog', () => {
    const contents = readFileSync(join(process.cwd(), 'TOKENS.md'), 'utf8');

    expect(contents).toContain('gray-50');
    expect(contents).toContain('gray-950');
    expect(contents).toContain('primary-50');
    expect(contents).toContain('primary-950');
    expect(contents).toContain('--background');
    expect(contents).toContain('--ring');
  });
});
