import { CertificationPanel } from '@sfood/components/about/CertificationPanel';
import { TimelineSection } from '@sfood/components/about/TimelineSection';
import { PageHero } from '@sfood/components/shared/PageHero';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import {
  certifications,
  companyTimeline,
  cultureValues,
  heroImage,
  siteConfig,
} from '@sfood/content/sfood-content';

export function AboutPage() {
  return (
    <>
      <PageHero
        title="회사소개"
        eyebrow="About SFood"
        description="품질, 파트너십, 지속 가능한 성장을 기준으로 프리미엄 식품 경험을 만듭니다."
        image={heroImage}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Mission"
              title={siteConfig.mission}
              description="제품 개발부터 공급까지 고객이 신뢰할 수 있는 기준을 일관되게 운영합니다."
            />
          </div>
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">비전</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                좋은 식품을 더 많은 식탁과 비즈니스 현장에 연결하는 신뢰받는 파트너가 됩니다.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">핵심 가치</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {cultureValues.map((value) => (
                  <li
                    key={value}
                    className="rounded-lg border border-border bg-card p-4 font-medium"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader title="연혁 타임라인" description="SFood가 품질과 브랜드 경험을 확장해 온 주요 흐름입니다." />
          <TimelineSection items={companyTimeline} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader title="품질 인증" description="식품 안전과 품질 경쟁력을 객관적인 인증으로 확인합니다." />
          <CertificationPanel certifications={certifications} />
        </div>
      </section>
    </>
  );
}
