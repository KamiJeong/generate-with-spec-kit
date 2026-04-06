// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getTheme, initTheme, setTheme } from '../src/theme-utils';

const stubMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
};

describe('theme utils', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    stubMatchMedia(false);
  });

  it('returns system when no theme has been stored', () => {
    expect(getTheme()).toBe('system');
  });

  it('stores and resolves the selected dark theme', () => {
    setTheme('dark');

    expect(localStorage.getItem('theme')).toBe('dark');
    expect(getTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('initializes the theme from system preference when unset', () => {
    stubMatchMedia(true);

    expect(typeof initTheme).toBe('function');

    initTheme();

    expect(getTheme()).toBe('system');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('falls back to system when storage contains an invalid theme', () => {
    localStorage.setItem('theme', 'sepia');

    expect(getTheme()).toBe('system');
  });

  it('falls back to system when localStorage reads fail', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(getTheme()).toBe('system');
  });

  it('falls back to light when system theme cannot be queried', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: undefined
    });

    setTheme('system');

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('keeps applying the DOM theme when localStorage writes fail', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    setTheme('dark');

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('returns safely when the DOM globals are unavailable', () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('document', undefined);

    expect(getTheme()).toBe('system');
    expect(() => setTheme('dark')).not.toThrow();

    vi.unstubAllGlobals();
  });
});
