import { Button, Card, CardContent } from '@myorg/ui';
import { pageContent, siteIdentity, homeStats } from '@sfood/content/site';

export function HeroSection() {
  const content = pageContent.home;

  return (
    <section className="bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:py-16">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-primary">
              {content.eyebrow}
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {content.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="/brands">브랜드 보기</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/about">회사소개 보기</a>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {homeStats.map((stat) => (
              <Card key={stat.label} className="border-border/70 bg-card/80">
                <CardContent className="space-y-1 p-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border bg-card">
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="space-y-2 p-5">
            <p className="text-sm font-semibold text-primary">SFood {siteIdentity.koreanName}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteIdentity.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
