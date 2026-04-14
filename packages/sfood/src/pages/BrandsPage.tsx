import { BrandLineup } from '@sfood/components/brands/BrandLineup';
import { PageHero } from '@sfood/components/shared/PageHero';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import { brands, heroImage } from '@sfood/content/sfood-content';

export function BrandsPage() {
  return (
    <>
      <PageHero
        title="브랜드"
        eyebrow="Brands"
        description="B2B 파트너 솔루션과 소비자 식탁을 위한 브랜드를 목적별로 제공합니다."
        image={heroImage}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader
            title="브랜드 라인업"
            description="운영 채널과 사용 목적에 맞춰 브랜드와 대표 제품군을 선택할 수 있습니다."
          />
          <BrandLineup brands={brands} />
        </div>
      </section>
    </>
  );
}
