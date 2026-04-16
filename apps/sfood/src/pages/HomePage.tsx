import { Badge, Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { HeroSection } from '@sfood/components/sections/HeroSection';
import { SectionHeader } from '@sfood/components/sections/SectionHeader';
import { homePillars, pageContent } from '@sfood/content/site';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Food Expertise"
          title="프리미엄 육가공에서 Meal Solution까지"
          description="SFood는 정통 육제품의 깊은 맛을 기반으로 브랜드, 파트너, 소비자가 함께 즐길 수 있는 식품 경험을 설계합니다."
          align="center"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {homePillars.map((pillar) => (
            <Card key={pillar.title} className="border-border/70">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  품질 신뢰
                </Badge>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3">
          {pageContent.home.highlights.map((highlight) => (
            <div key={highlight} className="space-y-2">
              <p className="text-sm font-semibold text-primary">SFood Point</p>
              <h2 className="text-2xl font-bold tracking-normal">{highlight}</h2>
              <p className="leading-relaxed text-muted-foreground">
                밝고 힘찬 브랜드 카피로 SFood가 만드는 맛있는 변화를 한눈에 전합니다.
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
