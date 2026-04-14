import { Card, CardDescription, CardHeader, CardTitle } from '@myorg/ui';

import { features } from '@web/content/site';

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-muted/30"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-primary">핵심 강점</p>
          <h2 id="features-heading" className="text-3xl font-semibold">
            팀이 빠르게 이해하고 바로 검토할 수 있는 구조입니다.
          </h2>
          <p className="text-muted-foreground">
            각 강점은 스펙 기반 작업 흐름에서 반복적으로 필요한 판단 기준을
            카드 단위로 정리합니다.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="rounded-lg border-border/70">
              <CardHeader className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
