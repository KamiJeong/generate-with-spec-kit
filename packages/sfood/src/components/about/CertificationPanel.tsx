import { CertificationBadge } from '@sfood/components/shared/CertificationBadge';
import type { Certification } from '@sfood/content/sfood-content';

interface CertificationPanelProps {
  certifications: Certification[];
}

export function CertificationPanel({ certifications }: CertificationPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {certifications.map((certification) => (
        <CertificationBadge
          key={certification.id}
          certification={certification}
        />
      ))}
    </div>
  );
}
