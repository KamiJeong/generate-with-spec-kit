import type {
  DocumentStatus,
  ExecutionStatus,
  IntegrationAvailability,
  RiskState,
} from '@wiki/types';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export function getExecutionStatusLabel(status: ExecutionStatus) {
  const labels: Record<ExecutionStatus, string> = {
    draft: '초안',
    available: '진행 가능',
    'not-started': '시작 전',
    'in-progress': '진행 중',
    blocked: '막힘',
    completed: '완료',
    'waiting-review': '검토 대기',
  };
  return labels[status];
}

export function getDocumentStatusLabel(status: DocumentStatus) {
  const labels: Record<DocumentStatus, string> = {
    draft: '초안',
    available: '사용 가능',
    updated: '업데이트됨',
    'needs-review': '검토 필요',
  };
  return labels[status];
}

export function getRiskLabel(risk: RiskState) {
  const labels: Record<RiskState, string> = {
    normal: '정상',
    attention: '주의',
    blocked: '막힘',
  };
  return labels[risk];
}

export function getIntegrationLabel(availability: IntegrationAvailability) {
  const labels: Record<IntegrationAvailability, string> = {
    connected: '연결됨',
    unavailable: '확인 실패',
    unknown: '확인 필요',
  };
  return labels[availability];
}

export function getStatusVariant(status: ExecutionStatus | DocumentStatus): BadgeVariant {
  if (status === 'blocked' || status === 'needs-review') return 'destructive';
  if (status === 'completed' || status === 'updated') return 'default';
  if (status === 'in-progress' || status === 'available') return 'secondary';
  return 'outline';
}

export function getRiskVariant(risk: RiskState): BadgeVariant {
  if (risk === 'blocked') return 'destructive';
  if (risk === 'attention') return 'secondary';
  return 'outline';
}

export function getIntegrationVariant(availability: IntegrationAvailability): BadgeVariant {
  if (availability === 'unavailable') return 'destructive';
  if (availability === 'connected') return 'default';
  return 'outline';
}
