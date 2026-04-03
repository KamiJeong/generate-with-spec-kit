import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'desktop1280',
      viewports: {
        desktop1280: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
        tablet768: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        mobile375: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: ['wcag2a', 'wcag2aa'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);

      return <Story />;
    },
  ],
};

export default preview;
