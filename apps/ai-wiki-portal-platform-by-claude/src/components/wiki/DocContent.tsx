import type { WikiDocument } from '@wiki/types';

interface DocContentProps {
  document: WikiDocument;
}

export function DocContent({ document }: DocContentProps) {
  return (
    <article className="prose prose-sm max-w-none dark:prose-invert">
      <div
        // HTML은 mock data에서만 옴 — XSS 위험 없음
        // biome-ignore lint/security/noDangerouslySetInnerHtml: mock data only
        dangerouslySetInnerHTML={{ __html: document.contentHtml }}
      />
    </article>
  );
}
