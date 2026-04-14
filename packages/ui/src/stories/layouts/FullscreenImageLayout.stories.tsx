import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const FullscreenImagePage = ({
  darkOverlay = false,
}: {
  darkOverlay?: boolean;
}) => (
  <div className="min-h-svh bg-background text-foreground">
    <main
      className={`relative flex min-h-svh items-center justify-center overflow-hidden ${
        darkOverlay ? 'bg-foreground/80 text-background' : 'bg-secondary'
      }`}
    >
      <div
        role="img"
        aria-label="Fullscreen image placeholder background"
        className={`absolute inset-0 ${
          darkOverlay ? 'bg-foreground/80' : 'bg-primary/10'
        }`}
      />
      <div className="absolute inset-0 bg-background/20" />
      <section className="relative z-10 mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
        <p
          className={`text-sm font-semibold uppercase ${
            darkOverlay ? 'text-background/80' : 'text-primary'
          }`}
        >
          Fullscreen image
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Let a single visual moment carry the first impression.
        </h1>
        <p
          className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
            darkOverlay ? 'text-background/80' : 'text-muted-foreground'
          }`}
        >
          Fullscreen image layouts work best when the message is short, the
          action is singular, and the background area supports the content
          instead of competing with it.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            variant={darkOverlay ? 'secondary' : 'default'}
            className={darkOverlay ? 'bg-background text-foreground' : ''}
          >
            View campaign
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={
              darkOverlay
                ? 'border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background'
                : ''
            }
          >
            See details
          </Button>
        </div>
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/FullscreenImage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Fullscreen Image Layout

Uses the full viewport as the primary image field with centered copy and a focused CTA cluster.

**Quality characteristics:**
- ✅ Balanced use of space
- ✅ Purposeful CTA placement

**Use cases:** Brand campaigns, portfolio heroes
        `,
      },
    },
  },
  render: () => <FullscreenImagePage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkOverlay: Story = {
  render: () => <FullscreenImagePage darkOverlay />,
};
