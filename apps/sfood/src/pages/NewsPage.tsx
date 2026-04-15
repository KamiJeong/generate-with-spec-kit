import { Badge, Card, CardContent } from '@myorg/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SupportNav } from '@sfood/components/sections/SupportNav';
import { contentEntries, pageContent } from '@sfood/content/site';

interface NewsPageProps {
  currentPath: string;
}

export function NewsPage({ currentPath }: NewsPageProps) {
  const news = contentEntries.filter((entry) => entry.type === 'news');

  return (
    <>
      <PageHero content={pageContent.news} />
      <SupportNav currentPath={currentPath} />
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((entry) => (
            <Card key={entry.title} role="article" className="border-border/70">
              <CardContent className="space-y-4 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{entry.category}</Badge>
                  <span className="text-sm text-muted-foreground">{entry.dateLabel}</span>
                </div>
                <h2 className="text-xl font-bold tracking-normal">{entry.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{entry.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
