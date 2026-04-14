import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { HandHeart, Leaf, Scale } from 'lucide-react';

import { PageHero } from '@sfood/components/shared/PageHero';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import { SustainabilityMetrics } from '@sfood/components/sustainability/SustainabilityMetrics';
import { heroImage, sustainabilityMetrics } from '@sfood/content/sfood-content';

const esgSections = [
  {
    title: '환경 실천',
    description: '고효율 설비, 물류 최적화, 재활용 가능 포장재 전환을 단계적으로 확대합니다.',
    icon: Leaf,
  },
  {
    title: '사회 공헌',
    description: '지역 파트너와 함께 식품 나눔, 교육, 안전한 먹거리 접근성을 높입니다.',
    icon: HandHeart,
  },
  {
    title: '거버넌스',
    description: '품질과 안전 기준을 문서화하고 파트너에게 투명하게 공유합니다.',
    icon: Scale,
  },
];

export function SustainabilityPage() {
  return (
    <>
      <PageHero
        title="지속가능성"
        eyebrow="Sustainability"
        description="지속 가능한 식품 생태계를 위해 환경, 사회, 거버넌스 실행을 수치로 관리합니다."
        image={heroImage}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader title="ESG 실행 영역" description="제품 생산과 공급 과정에서 지속 가능한 선택을 늘립니다." />
          <div className="grid gap-4 md:grid-cols-3">
            {esgSections.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="rounded-lg">
                <CardHeader>
                  <Icon className="size-8 text-primary" aria-hidden="true" />
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader title="정량 지표" description="목표 대비 진행률을 지속적으로 확인합니다." />
          <SustainabilityMetrics metrics={sustainabilityMetrics} />
        </div>
      </section>
    </>
  );
}
