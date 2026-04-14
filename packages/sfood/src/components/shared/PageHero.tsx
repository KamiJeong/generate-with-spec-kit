import type { ImageAsset } from '@sfood/content/sfood-content';

interface PageHeroProps {
  title: string;
  description: string;
  image?: ImageAsset;
  eyebrow?: string;
}

export function PageHero({ title, description, image, eyebrow }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary text-secondary-foreground">
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={image.loading}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
      ) : null}
      <div className="mx-auto flex min-h-[320px] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow ? <p className="mb-3 text-sm font-semibold">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/85">
          {description}
        </p>
      </div>
    </section>
  );
}
