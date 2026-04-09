import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];

    config.resolve ??= {};
    const existingAlias = Array.isArray(config.resolve.alias)
      ? config.resolve.alias
      : Object.entries(config.resolve.alias ?? {}).map(
          ([find, replacement]) => ({
            find,
            replacement,
          })
        );

    config.resolve.alias = [
      ...existingAlias,
      {
        find: /^@myorg\/tokens$/,
        replacement: path.resolve(dirname, '../../tokens/src/index.ts'),
      },
      {
        find: /^@myorg\/tokens\/css$/,
        replacement: path.resolve(dirname, '../../tokens/src/css/base.css'),
      },
      {
        find: /^@myorg\/tokens\/tailwind$/,
        replacement: path.resolve(
          dirname,
          '../../tokens/src/tailwind/preset.ts'
        ),
      },
      {
        find: '@',
        replacement: path.resolve(dirname, '../src'),
      },
    ];

    return config;
  },
};

export default config;
