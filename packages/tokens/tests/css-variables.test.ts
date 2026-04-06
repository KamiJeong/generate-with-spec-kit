import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const css = readFileSync(join(process.cwd(), 'src/css/base.css'), 'utf8');

const variableNames = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--destructive-foreground',
  '--border',
  '--input',
  '--ring'
];

const fontVariableNames = ['--font-sans', '--font-heading', '--font-mono'];

describe('css variables', () => {
  it('defines all 19 shadcn variables', () => {
    for (const name of variableNames) {
      expect(css).toContain(name);
    }
  });

  it('defines the shared radius token', () => {
    const match = css.match(/--radius:\s*([^;]+);/);

    expect(match?.[1]?.trim()).toBe('0.5rem');
  });

  it('uses bare HSL values for every color variable', () => {
    for (const name of variableNames) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = css.match(new RegExp(`${escaped}:\\s*([^;]+);`));

      expect(match?.[1]?.trim()).toMatch(/^\d+\s+\d+%\s+\d+%$/);
    }
  });

  it('defines the font family variables', () => {
    for (const name of fontVariableNames) {
      expect(css).toContain(name);
    }
  });

  it('defines full dark-mode semantic overrides', () => {
    expect(css).toContain('.dark,');
    expect(css).toContain("[data-theme='dark']");
    expect(css).toContain('--background: 240 6% 4%');
    expect(css).toContain('--destructive: 22 95% 62%');
  });
});
