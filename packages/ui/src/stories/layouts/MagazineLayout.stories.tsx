import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const articleTitles = [
  'Designing the top story for quick editorial judgment',
  'Balancing secondary reads with compact metadata',
  'Using rhythm to keep dense pages from feeling noisy',
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

const MagazinePage = ({ featuredPost = false }: { featuredPost?: boolean }) => (
  <div className="min-h-svh bg-background text-foreground">
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <section className="space-y-4 border-b pb-8">
        <p className="text-sm font-semibold uppercase text-primary">Magazine</p>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Build an editorial front page with one unmistakable lead story.
        </h1>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-12">
        <article
          className={`space-y-5 rounded-lg border bg-card p-5 ${
            featuredPost ? 'lg:col-span-12' : 'lg:col-span-8'
          }`}
        >
          <ImageBlock
            label="Featured magazine article image placeholder"
            className={featuredPost ? 'aspect-[21/9]' : 'aspect-video'}
          />
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium text-primary">Featured story</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Create a strong lead story before asking readers to browse.
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Magazine layouts depend on scale contrast, clear metadata, and
              adaptive grids that keep the lead story readable on smaller
              screens.
            </p>
            <Button>Read feature</Button>
          </div>
        </article>

        <aside
          className={`grid gap-4 ${
            featuredPost ? 'lg:col-span-12 lg:grid-cols-3' : 'lg:col-span-4'
          }`}
        >
          {articleTitles.map((title, index) => (
            <article key={title} className="rounded-lg border bg-muted/30 p-4">
              <ImageBlock
                label={`Secondary magazine article ${
                  index + 1
                } image placeholder`}
                className="aspect-video"
              />
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Column {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
            </article>
          ))}
        </aside>
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/Magazine',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Magazine Layout

Combines a dominant feature story with secondary article blocks in an adaptive editorial grid.

**Quality characteristics:**
- ✅ Clear visual hierarchy
- ✅ Adaptive layout styles

**Use cases:** Online magazines, news portals
        `,
      },
    },
  },
  render: () => <MagazinePage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FeaturedPost: Story = {
  render: () => <MagazinePage featuredPost />,
};
