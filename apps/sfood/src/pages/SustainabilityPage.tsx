import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SectionHeader } from '@sfood/components/sections/SectionHeader';
import { pageContent, sustainabilityThemes } from '@sfood/content/site';

export function SustainabilityPage() {
  return (
    <>
      <PageHero content={pageContent.sustainability} />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Better Food Ecosystem"
          title="더 좋은 식품으로 더 좋은 세상"
          description="책임 있는 선택과 즐거운 식문화가 함께 갈 때 지속 가능한 식품 생태계가 더 단단해집니다."
          align="center"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sustainabilityThemes.map((theme) => (
            <Card key={theme.title} className="border-border/70">
              <CardHeader>
                <CardTitle>{theme.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {theme.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
