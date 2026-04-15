import { Badge, Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SectionHeader } from '@sfood/components/sections/SectionHeader';
import { brandLines, pageContent } from '@sfood/content/site';

const audienceLabel = {
  consumer: 'Consumer Brand',
  business: 'Business Solution',
} as const;

export function BrandsPage() {
  return (
    <>
      <PageHero content={pageContent.brands} />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title="새로운 맛과 현장 솔루션을 함께 설계합니다"
          description="소비자에게는 프리미엄 식문화 경험을, 파트너에게는 안정적인 활용성과 메뉴 가능성을 제공합니다."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {brandLines.map((line) => (
            <Card key={line.name} className="border-border/70">
              <CardHeader className="space-y-4">
                <Badge variant={line.audience === 'consumer' ? 'default' : 'secondary'} className="w-fit">
                  {audienceLabel[line.audience]}
                </Badge>
                <div className="space-y-2">
                  <CardTitle>{line.name}</CardTitle>
                  <p className="text-sm font-medium text-primary">{line.positioning}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="leading-relaxed text-muted-foreground">{line.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {line.categories.map((category) => (
                    <Badge key={`${line.name}-${category}`} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {line.proofPoint}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
