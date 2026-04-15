import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SectionHeader } from '@sfood/components/sections/SectionHeader';
import { aboutValues, pageContent } from '@sfood/content/site';

export function AboutPage() {
  return (
    <>
      <PageHero content={pageContent.about} />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Company Identity"
          title="B2B와 B2C를 함께 키우는 식품 전문 기업"
          description="SFood는 육가공 및 Meal Solution 전문성을 바탕으로 파트너의 현장과 소비자의 식탁을 함께 바라봅니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {aboutValues.map((value) => (
            <Card key={value.title} className="border-border/70">
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-3xl font-bold tracking-normal">좋은 식품은 신뢰에서 시작합니다</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-primary-foreground/90">
            SFood는 원료 확인, 생산 위생, 맛 평가, 출고 전 점검을 연결해 매일 같은 기준으로 더 나은 식품을 준비합니다.
          </p>
        </div>
      </section>
    </>
  );
}
