import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const contentRows = [
  'Lead with the strongest section title so the first horizontal scan has a clear anchor.',
  'Repeat aligned content blocks so readers can move down the left edge without re-learning the structure.',
  'Keep supporting media smaller than the text spine when the page is content-heavy.',
];

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
    className={`rounded-lg border border-border bg-muted ${className}`}
  />
);

const FPatternPage = ({ contentHeavy = false }: { contentHeavy?: boolean }) => {
  const rows = contentHeavy ? contentRows : contentRows.slice(0, 2);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-sm font-semibold uppercase text-primary">
            F-pattern
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Structure long-form pages around repeatable scanning rows.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The F-pattern gives content-heavy pages a predictable top band and a
            strong left content spine.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <section className="rounded-lg border bg-primary/10 p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-primary">
                Full-width top banner
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Put the main context where readers begin the first scan.
              </h2>
            </div>
            <Button className="w-fit">Open reading path</Button>
          </div>
        </section>

        <section className="mt-8 grid gap-6">
          {rows.map((row, index) => (
            <article
              key={row}
              className="grid gap-5 rounded-lg border bg-card p-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-center"
            >
              <div className="max-w-3xl space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Row {index + 1}
                </p>
                <h3 className="text-2xl font-semibold">
                  {index === 0
                    ? 'Start each row with a clear left-edge heading.'
                    : index === 1
                      ? 'Use consistent text width for easy vertical scanning.'
                      : 'Let depth increase without shifting the reading spine.'}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{row}</p>
              </div>
              <ImageBlock
                label={`Supporting image placeholder for F-pattern row ${
                  index + 1
                }`}
                className={contentHeavy ? 'aspect-[4/3]' : 'aspect-video'}
              />
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

const meta = {
  title: 'Page/Layouts/FPattern',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## F-Pattern Layout

Supports readers scanning across the top of the page and then down a strong left-aligned content column.

**Quality characteristics:**
- ✅ Clear visual hierarchy
- ✅ Consistent alignment

**Use cases:** News sites, blogs, documentation pages
        `,
      },
    },
  },
  render: () => <FPatternPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContentHeavy: Story = {
  render: () => <FPatternPage contentHeavy />,
};
