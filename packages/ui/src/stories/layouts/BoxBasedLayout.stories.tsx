import type { Meta, StoryObj } from '@storybook/react';

const boxItems = [
  'Overview',
  'Metrics',
  'Gallery',
  'Signals',
  'Roadmap',
  'Team',
  'Quality',
  'Launch',
  'Review',
  'Support',
  'Archive',
  'Next',
];

const BoxBasedPage = ({ dense = false }: { dense?: boolean }) => {
  const visibleItems = dense ? boxItems : boxItems.slice(0, 8);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <section className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase text-primary">
            Box-based
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Give each content unit the same visual contract.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Box-based layouts support dashboards, galleries, and collections by
            making scanning and comparison feel consistent across breakpoints.
          </p>
        </section>

        <section
          className={`mt-10 grid gap-4 ${
            dense ? 'grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item}
              className="flex aspect-square flex-col justify-between rounded-lg border bg-card p-4"
            >
              <div
                role="img"
                aria-label={`${item} box visual placeholder`}
                className="h-12 rounded-lg bg-primary/10"
              />
              <div>
                <p className="text-sm font-semibold">{item}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Unit {index + 1}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

const meta = {
  title: 'Page/Layouts/BoxBased',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Box-Based Layout

Uses equal boxes to make a collection of independent content units easy to scan and compare.

**Quality characteristics:**
- ✅ Consistent alignment
- ✅ Balanced use of space

**Use cases:** Dashboards, portfolio galleries
        `,
      },
    },
  },
  render: () => <BoxBasedPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DenseGrid: Story = {
  render: () => <BoxBasedPage dense />,
};
