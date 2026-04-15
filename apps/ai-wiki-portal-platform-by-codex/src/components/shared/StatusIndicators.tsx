import { Badge, Progress } from '@myorg/ui';
import {
  getDocumentStatusLabel,
  getExecutionStatusLabel,
  getIntegrationLabel,
  getIntegrationVariant,
  getRiskLabel,
  getRiskVariant,
  getStatusVariant,
} from '@wiki/lib/status';
import type {
  DocumentStatus,
  ExecutionStatus,
  IntegrationAvailability,
  RiskState,
} from '@wiki/types';

export function ExecutionStatusBadge({ status }: { status: ExecutionStatus }) {
  return <Badge variant={getStatusVariant(status)}>{getExecutionStatusLabel(status)}</Badge>;
}

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  return <Badge variant={getStatusVariant(status)}>{getDocumentStatusLabel(status)}</Badge>;
}

export function RiskBadge({ risk }: { risk: RiskState }) {
  return <Badge variant={getRiskVariant(risk)}>{getRiskLabel(risk)}</Badge>;
}

export function IntegrationBadge({ availability }: { availability: IntegrationAvailability }) {
  return <Badge variant={getIntegrationVariant(availability)}>{getIntegrationLabel(availability)}</Badge>;
}

export function ProgressSummary({ value, label }: { value: number; label: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} aria-label={`${label} ${value}%`} />
    </div>
  );
}
