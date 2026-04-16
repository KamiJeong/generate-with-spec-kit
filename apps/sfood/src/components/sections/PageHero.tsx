import { Badge } from '@kamijeong/ui';
import type { PageContent } from '@sfood/content/site';

interface PageHeroProps {
  content: PageContent;
}

export function PageHero({ content }: PageHeroProps) {
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:py-14">
        <div className="space-y-5">
          <Badge variant="secondary" className="w-fit">
            {content.eyebrow}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl">
              {content.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.description}
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <li
                key={item}
                className="rounded-lg border bg-background px-4 py-3 text-sm font-medium text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg border bg-card">
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
