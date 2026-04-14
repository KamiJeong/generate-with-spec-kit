import { Badge, Button } from '@myorg/ui';

import { LatestArticles } from '@sfood/components/home/LatestArticles';
import { ProductCategoryGrid } from '@sfood/components/home/ProductCategoryGrid';
import { CertificationBadge } from '@sfood/components/shared/CertificationBadge';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import {
  certifications,
  getLatestArticles,
  heroImage,
  productCategories,
  siteConfig,
} from '@sfood/content/sfood-content';

export function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[560px] overflow-hidden bg-secondary text-secondary-foreground">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          loading={heroImage.loading}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        />
        <div className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            Premium Food Company
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/85">
            {siteConfig.description}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href={siteConfig.primaryCtaPath}>{siteConfig.primaryCtaLabel}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Mission"
            title={siteConfig.mission}
            description="품질 중심 생산, 파트너 맞춤 솔루션, 지속 가능한 식품 생태계를 하나의 기준으로 연결합니다."
          />
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader
            eyebrow="Products"
            title="제품 카테고리"
            description="외식 파트너와 소비자 식탁에 필요한 핵심 제품군을 안정적으로 제공합니다."
          />
          <ProductCategoryGrid categories={productCategories.slice(0, 4)} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader
            eyebrow="Quality"
            title="품질 인증"
            description="식품 안전과 품질 기준을 검증 가능한 인증 체계로 관리합니다."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {certifications.map((certification) => (
              <CertificationBadge
                key={certification.id}
                certification={certification}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-muted px-4 py-16 sm:px-6 lg:px-8"
        aria-label="최신 소식"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader
            eyebrow="News"
            title="최신 뉴스와 공지"
            description="SFood의 품질, 브랜드, 지속가능성 소식을 빠르게 확인합니다."
          />
          <LatestArticles articles={getLatestArticles(2)} />
        </div>
      </section>
    </>
  );
}
