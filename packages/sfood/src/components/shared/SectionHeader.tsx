interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl text-left'
      }
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold leading-tight text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
