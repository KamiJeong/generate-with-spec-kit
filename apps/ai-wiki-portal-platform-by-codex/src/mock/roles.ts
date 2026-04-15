import type { UserRolePerspective } from '@wiki/types';

export const rolePerspectives: UserRolePerspective[] = [
  {
    id: 'non-developer',
    label: '비개발자',
    description: '문서를 따라 실제 결과물을 만들고 싶은 업무 담당자',
    primaryGoals: ['시작 가이드 확인', 'Blueprint 생성', '오류 해결 요청'],
    recommendedDocumentIds: ['doc-platform-intro', 'doc-get-started', 'doc-blueprint'],
    projectEmphasis: '내가 다음에 실행할 단계',
    preferredSupportPath: 'AI Agent에게 현재 단계 질문하기',
  },
  {
    id: 'stakeholder',
    label: '프로젝트 이해관계자',
    description: '팀 프로젝트 현황과 병목을 빠르게 파악해야 하는 관리자',
    primaryGoals: ['진행 상태 확인', '막힌 프로젝트 찾기', '배포 준비도 확인'],
    recommendedDocumentIds: ['doc-dashboard', 'doc-github', 'doc-deployment'],
    projectEmphasis: '프로젝트 진행률과 위험 상태',
    preferredSupportPath: '담당자에게 진행 상태 문의하기',
  },
  {
    id: 'support',
    label: '지원 담당자',
    description: '문서 개선과 사용자 문제 해결을 지원하는 협업 담당자',
    primaryGoals: ['문의 맥락 확인', '관련 문서 추천', '문서 개선 의견 검토'],
    recommendedDocumentIds: ['doc-troubleshooting', 'doc-ai-agent', 'doc-feedback'],
    projectEmphasis: '막힘 상태와 최근 문의 맥락',
    preferredSupportPath: '문서와 AI Agent 답변을 함께 확인하기',
  },
];

export const defaultRoleId = 'non-developer' as const;
