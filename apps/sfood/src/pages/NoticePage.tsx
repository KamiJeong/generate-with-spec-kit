import { Badge, Card, CardContent } from '@kamijeong/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SupportNav } from '@sfood/components/sections/SupportNav';
import { contentEntries, pageContent } from '@sfood/content/site';

interface NoticePageProps {
  currentPath: string;
}

export function NoticePage({ currentPath }: NoticePageProps) {
  const notices = contentEntries.filter((entry) => entry.type === 'notice');

  return (
    <>
      <PageHero content={pageContent.notice} />
      <SupportNav currentPath={currentPath} />
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4">
          {notices.map((entry) => (
            <Card key={entry.title} role="article" className="border-border/70">
              <CardContent className="grid gap-4 p-5 md:grid-cols-[11rem_minmax(0,1fr)]">
                <div className="space-y-2">
                  <Badge variant="secondary">{entry.category}</Badge>
                  <p className="text-sm text-muted-foreground">{entry.dateLabel}</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-normal">{entry.title}</h2>
                  <p className="leading-relaxed text-muted-foreground">{entry.summary}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
