import { Badge, Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { ShieldCheck } from 'lucide-react';

import type { Certification } from '@sfood/content/sfood-content';

interface CertificationBadgeProps {
  certification: Certification;
}

export function CertificationBadge({ certification }: CertificationBadgeProps) {
  return (
    <Card className="h-full rounded-lg">
      <CardHeader>
        <Badge variant="secondary">{certification.badgeLabel}</Badge>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
          {certification.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {certification.description}
        </p>
      </CardContent>
    </Card>
  );
}
