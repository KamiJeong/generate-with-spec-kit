import type { TimelineItem } from '@sfood/content/sfood-content';

interface TimelineSectionProps {
  items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2" aria-label="연혁 타임라인">
      {items.map((item) => (
        <li key={item.year} className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm font-semibold text-primary">{item.year}</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
