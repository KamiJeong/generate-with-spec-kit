import { Card, CardContent, CardHeader, CardTitle, Progress } from '@myorg/ui';

import type { SustainabilityMetric } from '@sfood/content/sfood-content';

interface SustainabilityMetricsProps {
  metrics: SustainabilityMetric[];
}

export function SustainabilityMetrics({ metrics }: SustainabilityMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => {
        const progressValue = Math.min(
          100,
          Math.round((metric.value / metric.targetValue) * 100)
        );

        return (
          <Card key={metric.id} className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {metric.value}
                {metric.unit}
              </p>
              <Progress
                value={progressValue}
                className="mt-4 bg-chart-2/20 [&_[data-slot=progress-indicator]]:bg-chart-1"
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
