export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'theme';

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const resolveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme !== 'system') {
    return theme;
  }

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', resolveTheme(theme));
};

export const getTheme = (): Theme => getStoredTheme() ?? 'system';

export const setTheme = (theme: Theme): void => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures and still update the DOM state.
    }
  }

  applyTheme(theme);
};

export const initTheme = (): void => {
  applyTheme(getTheme());
};
