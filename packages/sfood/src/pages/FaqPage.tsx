import { FaqAccordion } from '@sfood/components/support/FaqAccordion';
import { PageHero } from '@sfood/components/shared/PageHero';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import { faqs, heroImage } from '@sfood/content/sfood-content';

export function FaqPage() {
  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <>
      <PageHero
        title="FAQ"
        eyebrow="Support"
        description="제품, 품질 인증, B2B 상담에 대한 자주 묻는 질문입니다."
        image={heroImage}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <SectionHeader
            title="자주 묻는 질문"
            description="카테고리별 질문을 확인하고 하나씩 답변을 펼쳐 볼 수 있습니다."
          />
          <div className="flex flex-wrap gap-2" aria-label="FAQ 카테고리">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-md border border-border bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {category}
              </span>
            ))}
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
