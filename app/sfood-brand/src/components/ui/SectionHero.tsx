interface SectionHeroProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
}

export function SectionHero({
  title,
  subtitle,
  bgColor = 'bg-sfood-red',
}: SectionHeroProps) {
  return (
    <section className={`${bgColor} py-20 text-white`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/80">{subtitle}</p>}
      </div>
    </section>
  );
}
