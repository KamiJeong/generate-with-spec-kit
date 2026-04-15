import type { Blueprint } from '@wiki/types';

export const sampleBlueprint: Blueprint = {
  id: 'blueprint-sample-sales-calendar',
  inputText:
    '영업팀 직원들이 고객 미팅 일정을 등록하고 미팅 전날 알림을 받을 수 있는 캘린더 서비스가 필요합니다.',
  projectGoal: '영업팀의 고객 미팅 준비와 일정 공유를 자동화합니다.',
  targetUsers: ['영업팀 직원', '영업팀장', '지원 담당자'],
  outputs: [
    {
      id: 'prd',
      title: 'PRD',
      summary: '사용자, 문제, 핵심 기능을 업무 언어로 정리합니다.',
      items: ['미팅 일정 등록', '전날 알림', '팀장용 전체 일정 보기'],
    },
    {
      id: 'system-design',
      title: 'System Design',
      summary: '서비스 흐름과 주요 화면, 권한 관점을 정리합니다.',
      items: ['일정 목록', '일정 등록', '알림 설정', '팀 캘린더'],
    },
    {
      id: 'environment',
      title: 'Environment Guide',
      summary: '실행 전 준비해야 할 환경과 확인 명령을 정리합니다.',
      items: ['저장소 준비', '의존성 설치', '로컬 실행 확인'],
    },
    {
      id: 'api-data',
      title: 'API/Data Definition',
      summary: 'AI Agent가 이해할 수 있는 데이터 구조를 요약합니다.',
      items: ['Meeting', 'Participant', 'Reminder', 'Team'],
    },
  ],
  readinessStatus: 'ready',
  missingInputs: [],
  linkedExecutionGuideId: 'doc-environment',
  generatedAtLabel: '방금 생성된 mock 결과',
};

export const missingInputBlueprint: Blueprint = {
  ...sampleBlueprint,
  id: 'blueprint-missing-inputs',
  readinessStatus: 'missing-inputs',
  missingInputs: ['주요 사용자', '필수 기능 3개', '배포 대상'],
  generatedAtLabel: '입력 보강 필요',
};

export function createBlueprintFromInput(inputText: string): Blueprint {
  if (inputText.trim().length < 30) {
    return {
      ...missingInputBlueprint,
      inputText,
      projectGoal: '입력이 부족해 목표를 확정할 수 없습니다.',
    };
  }

  return {
    ...sampleBlueprint,
    inputText,
    generatedAtLabel: '방금 생성된 mock 결과',
  };
}
