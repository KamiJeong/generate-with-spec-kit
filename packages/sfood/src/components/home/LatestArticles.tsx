import { Badge } from '@myorg/ui';

import type { Article } from '@sfood/content/sfood-content';

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {articles.map((article) => (
        <article
          key={article.id}
          className="rounded-lg border border-border bg-card p-5 text-card-foreground"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{article.category}</Badge>
            <time dateTime={article.date}>{article.date}</time>
          </div>
          <h3 className="text-xl font-semibold leading-snug text-foreground">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {article.summary}
          </p>
        </article>
      ))}
    </div>
  );
}
