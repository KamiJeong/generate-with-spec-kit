import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.resolve(dirname, '.storybook').replace(/\\/g, '/');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test-setup.ts'],
          include: ['src/components/**/*.test.tsx'],
          coverage: {
            provider: 'v8',
            include: ['src/components/**/*.tsx'],
            exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
            reporter: ['text', 'html', 'lcov'],
          },
        },
      },
      {
        extends: true,
        plugins: [storybookTest({ configDir: storybookConfigDir })],
        test: {
          name: `storybook:${storybookConfigDir}`,
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
