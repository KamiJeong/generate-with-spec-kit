import type { DocumentHeading } from '@wiki/types';

interface TableOfContentsProps {
  headings: DocumentHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="목차" className="space-y-1">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        목차
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
            <a
              href={`#${h.id}`}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
