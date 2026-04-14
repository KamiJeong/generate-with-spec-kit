import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const navItems = ['Product', 'Solutions', 'Resources', 'Company'];

const ImageBlock = ({
  className = '',
  label,
}: {
  className?: string;
  label: string;
}) => (
  <div
    role="img"
    aria-label={label}
    className={`rounded-lg border border-border bg-primary/10 ${className}`}
  />
);

const Header = () => (
  <header className="border-b bg-background">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">
          Z-pattern
        </p>
        <p className="text-sm text-muted-foreground">
          A diagonal scan path for focused campaign pages.
        </p>
      </div>
      <nav aria-label="Primary navigation">
        <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <li key={item}>
              <a href="/" className="transition-colors hover:text-foreground">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

const ZPatternPage = ({
  expandedImage = false,
}: {
  expandedImage?: boolean;
}) => (
  <div className="min-h-svh bg-background text-foreground">
    <Header />
    <main>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="space-y-6">
          <p className="text-sm font-medium text-primary">
            Plan the first scan
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Guide attention from promise to proof to action.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              The Z-pattern places the main message, supporting visual, proof
              points, and final action where readers naturally scan short pages.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Start the sequence</Button>
            <Button size="lg" variant="outline">
              Review proof
            </Button>
          </div>
        </div>
        <ImageBlock
          label="Hero image placeholder for the upper-right point of the Z-pattern"
          className={expandedImage ? 'aspect-[16/9]' : 'aspect-video'}
        />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="rounded-lg border bg-muted/40 p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Proof point
          </p>
          <p className="mt-3 text-2xl font-semibold">
            Teams understand the page path before they compare details.
          </p>
        </div>
        <div className="rounded-lg border bg-primary p-6 text-primary-foreground">
          <p className="text-sm font-medium text-primary-foreground/80">
            Final anchor
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-2xl font-semibold">
              End the diagonal path with one clear next step.
            </p>
            <Button variant="secondary">Compare variants</Button>
          </div>
        </div>
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/ZPattern',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Z-Pattern Layout

Uses a top-left to top-right, then lower-left to lower-right reading path for concise marketing and campaign pages.

**Quality characteristics:**
- ✅ Clear visual hierarchy
- ✅ Purposeful CTA placement

**Use cases:** Landing pages, marketing home pages
        `,
      },
    },
  },
  render: () => <ZPatternPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeroImage: Story = {
  render: () => <ZPatternPage expandedImage />,
};
