import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const ImagePanel = ({ label }: { label: string }) => (
  <div
    role="img"
    aria-label={label}
    className="min-h-[320px] border-border bg-primary/10 lg:min-h-svh"
  />
);

const CopyPanel = () => (
  <section className="flex min-h-[420px] items-center bg-background px-4 py-14 sm:px-6 lg:min-h-svh lg:px-12">
    <div className="mx-auto max-w-xl space-y-6">
      <p className="text-sm font-semibold uppercase text-primary">
        Split screen
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Compare two equally important ideas without hierarchy drift.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Split screen layouts give product comparisons, onboarding flows, and
          sign-in pages a balanced frame that adapts to a single column on
          smaller screens.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button size="lg">Continue</Button>
        <Button size="lg" variant="outline">
          Compare options
        </Button>
      </div>
    </div>
  </section>
);

const SplitScreenPage = ({ reversed = false }: { reversed?: boolean }) => (
  <div className="min-h-svh bg-background text-foreground">
    <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      {reversed ? (
        <>
          <ImagePanel label="Image placeholder on the left side of the reversed split screen" />
          <CopyPanel />
        </>
      ) : (
        <>
          <CopyPanel />
          <ImagePanel label="Image placeholder on the right side of the split screen" />
        </>
      )}
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/SplitScreen',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Split Screen Layout

Divides the viewport into two balanced regions so copy and visual content share equal weight on desktop.

**Quality characteristics:**
- ✅ Balanced use of space
- ✅ Consistent alignment

**Use cases:** Login and signup flows, product comparisons
        `,
      },
    },
  },
  render: () => <SplitScreenPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Reversed: Story = {
  render: () => <SplitScreenPage reversed />,
};
