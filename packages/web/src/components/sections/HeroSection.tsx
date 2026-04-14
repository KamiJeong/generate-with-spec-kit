import { ArrowRight, Sparkles } from 'lucide-react';

import { Badge, Button, Card, CardContent } from '@myorg/ui';

import { siteConfig, stats } from '@web/content/site';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      <img
        src="https://images.unsplash.com/photo-1758873269117-d5845126928a?auto=format&fit=crop&fm=jpg&q=80&w=1800"
        alt="팀이 화이트보드 앞에서 서비스 계획을 검토하는 장면"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />

      <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-7xl flex-col justify-center gap-8 px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="gap-2 px-3 py-1">
              <Sparkles className="size-3.5" aria-hidden="true" />
              서비스 소개
            </Badge>
            <p className="text-sm font-semibold text-primary">
              {siteConfig.name}
            </p>
            <h1
              id="hero-heading"
              className="text-4xl font-bold text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              {siteConfig.tagline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
              <a href="#contact" aria-label="문의 폼으로 이동">
                {siteConfig.ctaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#features">강점 보기</a>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3" aria-label="핵심 지표">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-lg border-border/70 bg-card/90"
            >
              <CardContent className="space-y-1 p-4">
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
