import { Badge, Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';

import { PageHero } from '@sfood/components/shared/PageHero';
import { getNewsArticles, heroImage } from '@sfood/content/sfood-content';

export function NewsPage() {
  return (
    <>
      <PageHero
        title="회사소식"
        eyebrow="Support"
        description="SFood의 브랜드 활동, 제품 출시, 지속가능성 실행 소식을 전합니다."
        image={heroImage}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {getNewsArticles().map((article) => (
            <Card key={article.id} className="overflow-hidden rounded-lg">
              {article.image ? (
                <img
                  src={article.image.src}
                  alt={article.image.alt}
                  loading={article.image.loading}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <time className="text-sm text-muted-foreground" dateTime={article.date}>
                    {article.date}
                  </time>
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {article.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
