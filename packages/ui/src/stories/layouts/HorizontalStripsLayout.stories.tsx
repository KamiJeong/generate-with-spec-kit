import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const strips = [
  ['Plan', 'Align the story, owner, and expected user action.'],
  ['Build', 'Compose a full-width section with one focused message.'],
  ['Review', 'Check responsive behavior before adding the next strip.'],
  ['Ship', 'End with a clear action that completes the vertical rhythm.'],
];

const HorizontalStripsPage = ({
  alternating = false,
}: {
  alternating?: boolean;
}) => (
  <div className="min-h-svh bg-background text-foreground">
    <main className="flex flex-col">
      {strips.map(([title, description], index) => {
        const isAlternate = alternating && index % 2 === 1;

        return (
          <section
            key={title}
            className={`w-full border-b ${
              isAlternate ? 'bg-muted' : 'bg-background'
            }`}
          >
            <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-center lg:py-20">
              <div>
                <p className="text-sm font-semibold uppercase text-primary">
                  Strip {index + 1}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {title}
                </h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {description} Horizontal strip layouts turn each section into
                  a distinct step while keeping navigation and scanning simple.
                </p>
                <div
                  role="img"
                  aria-label={`${title} strip image placeholder`}
                  className="aspect-video rounded-lg border border-border bg-primary/10"
                />
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary-foreground/80">
              Final strip
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Close the sequence with one action.
            </h1>
          </div>
          <Button variant="secondary">Open the next section</Button>
        </div>
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/HorizontalStrips',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Horizontal Strips Layout

Stacks full-width sections so each content band carries one step in a longer page narrative.

**Quality characteristics:**
- ✅ Consistent alignment
- ✅ Intuitive navigation

**Use cases:** SaaS landing pages, feature overview pages
        `,
      },
    },
  },
  render: () => <HorizontalStripsPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlternatingStrips: Story = {
  render: () => <HorizontalStripsPage alternating />,
};
