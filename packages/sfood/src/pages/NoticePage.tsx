import { Badge } from '@myorg/ui';

import { PageHero } from '@sfood/components/shared/PageHero';
import { getNoticeArticles, heroImage } from '@sfood/content/sfood-content';

export function NoticePage() {
  return (
    <>
      <PageHero
        title="공지사항"
        eyebrow="Support"
        description="파트너와 고객에게 필요한 주요 안내를 날짜순으로 확인합니다."
        image={heroImage}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <ul
          className="mx-auto grid max-w-4xl gap-4"
          aria-label="공지사항 목록"
        >
          {getNoticeArticles().map((article) => (
            <li
              key={article.id}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{article.category}</Badge>
                <time className="text-sm text-muted-foreground" dateTime={article.date}>
                  {article.date}
                </time>
              </div>
              <h2 className="text-xl font-semibold text-foreground">{article.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {article.summary}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
