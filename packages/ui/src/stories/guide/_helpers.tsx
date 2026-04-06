import { useEffect, useId, useState } from 'react';

type Palette = Record<string, string>;

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div
        className="mb-3 h-20 rounded-md border"
        style={{ backgroundColor: value }}
      />
      <div className="text-sm font-medium">{name}</div>
      <div className="font-mono text-xs text-muted-foreground">{value}</div>
    </div>
  );
}

function PrimitiveColorGroup({
  name,
  palette,
}: {
  name: string;
  palette: Palette;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold capitalize">{name}</h2>
        <p className="text-sm text-muted-foreground">
          {Object.keys(palette).length} tone scale
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(palette).map(([tone, value]) => (
          <ColorSwatch
            key={`${name}-${tone}`}
            name={`${name}-${tone}`}
            value={value}
          />
        ))}
      </div>
    </section>
  );
}

function SemanticColorTable({
  light,
  dark,
}: {
  light: Palette;
  dark: Palette;
}) {
  const tokenNames = Object.keys(light);

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid grid-cols-[minmax(10rem,1fr)_minmax(0,1fr)_minmax(0,1fr)] bg-muted/50 text-sm font-medium text-muted-foreground">
        <div className="border-r px-4 py-3">Token</div>
        <div className="border-r px-4 py-3">Light</div>
        <div className="px-4 py-3">Dark</div>
      </div>
      {tokenNames.map((name) => {
        const lightValue = `hsl(${light[name]})`;
        const darkValue = `hsl(${dark[name]})`;

        return (
          <div
            key={name}
            className="grid grid-cols-[minmax(10rem,1fr)_minmax(0,1fr)_minmax(0,1fr)] border-t"
          >
            <div className="border-r px-4 py-4 text-sm font-medium">{name}</div>
            <div className="border-r px-4 py-4">
              <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                <div
                  className="size-10 shrink-0 rounded-md border"
                  style={{ backgroundColor: lightValue }}
                />
                <code className="text-xs text-muted-foreground">
                  {light[name]}
                </code>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 rounded-lg border bg-foreground p-3 text-background">
                <div
                  className="size-10 shrink-0 rounded-md border border-background/20"
                  style={{ backgroundColor: darkValue }}
                />
                <code className="text-xs text-background/70">{dark[name]}</code>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SpacingBar({
  name,
  value,
  px,
}: {
  name: string;
  value: string;
  px: number;
}) {
  return (
    <div className="grid gap-2 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-[5rem_1fr_8rem] sm:items-center">
      <div className="text-sm font-medium">{name}</div>
      <div className="flex min-h-8 items-center rounded-md bg-muted px-2">
        <div
          className="h-3 rounded-full bg-primary"
          style={{ width: `${Math.max(px, 2)}px` }}
        />
      </div>
      <div className="text-sm text-muted-foreground">{`${value} / ${px}px`}</div>
    </div>
  );
}

function FontFamilySection({
  families,
}: {
  families: Record<string, readonly string[]>;
}) {
  return (
    <div className="grid gap-4">
      {Object.entries(families).map(([name, stack]) => (
        <section
          key={name}
          className="space-y-3 rounded-xl border bg-card p-5 shadow-sm"
        >
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="font-mono text-xs text-muted-foreground">
              {stack.join(', ')}
            </p>
          </div>
          <p
            style={{ fontFamily: stack.join(', ') }}
            className="text-2xl leading-snug"
          >
            가나다라마바사 ABC 123
          </p>
        </section>
      ))}
    </div>
  );
}

function FontWeightSection({ weights }: { weights: Record<string, string> }) {
  return (
    <div className="grid gap-4">
      {Object.entries(weights).map(([name, value]) => (
        <section key={name} className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold">{name}</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {value}
            </span>
          </div>
          <p style={{ fontWeight: value }} className="text-2xl leading-snug">
            가나다라마바사 ABC 123
          </p>
        </section>
      ))}
    </div>
  );
}

function MotionDemo({
  name,
  durationMs,
  cssEasing,
}: {
  name: string;
  durationMs: number;
  cssEasing: string;
}) {
  const [active, setActive] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActive(true);
    }, 100);

    const interval = window.setInterval(
      () => {
        setActive((current) => !current);
      },
      Math.max(durationMs * 2, 1400)
    );

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [durationMs]);

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="font-mono text-xs text-muted-foreground">
            {cssEasing}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{durationMs}ms</div>
      </div>
      <div className="overflow-hidden rounded-lg border bg-muted p-3">
        <div className="relative h-12">
          <svg className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--muted-foreground) / 0.2)"
                />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="24"
              x2="100%"
              y2="24"
              stroke={`url(#${gradientId})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div
            className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-primary shadow-sm"
            style={{
              left: active ? 'calc(100% - 1.25rem)' : '0px',
              transitionDuration: `${durationMs}ms`,
              transitionProperty: 'left',
              transitionTimingFunction: cssEasing,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export {
  ColorSwatch,
  FontFamilySection,
  FontWeightSection,
  MotionDemo,
  PrimitiveColorGroup,
  SemanticColorTable,
  SpacingBar,
};
