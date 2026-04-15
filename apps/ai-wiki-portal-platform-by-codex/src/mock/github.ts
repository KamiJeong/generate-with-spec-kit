import type { IntegrationStatus } from '@wiki/types';

export const integrationStatuses: Record<string, IntegrationStatus[]> = {
  'project-portal': [
    {
      serviceName: 'GitHub',
      availability: 'connected',
      lastCheckedLabel: '5분 전 확인',
      summary: '저장소가 등록되어 있고 최근 변경 내역이 확인되었습니다.',
      recoveryAction: '최근 변경 요약 보기',
    },
    {
      serviceName: 'Confluence',
      availability: 'connected',
      lastCheckedLabel: '오늘 확인',
      summary: '문서 원본과 포털 표시 상태가 연결되어 있습니다.',
      recoveryAction: '관련 Wiki 문서 열기',
    },
  ],
  'project-inventory': [
    {
      serviceName: 'GitHub',
      availability: 'unavailable',
      lastCheckedLabel: '확인 실패',
      summary: '저장소 상태를 확인할 수 없습니다.',
      recoveryAction: '담당자에게 저장소 권한 확인 요청',
    },
  ],
};
