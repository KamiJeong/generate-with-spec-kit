import type { HiringStep } from '@sfood/content/sfood-content';

interface HiringProcessProps {
  steps: HiringStep[];
}

export function HiringProcess({ steps }: HiringProcessProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-4" aria-label="채용 프로세스">
      {steps.map((step) => (
        <li
          key={step.step}
          className="min-h-48 rounded-lg border border-border bg-card p-5"
        >
          <p className="flex size-10 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">
            {step.step}
          </p>
          <h3 className="mt-5 text-xl font-semibold text-foreground">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
