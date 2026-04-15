import type { WikiDocument } from '@wiki/types';

export const wikiDocuments: WikiDocument[] = [
  {
    id: 'doc-platform-intro',
    title: 'AI Wiki Portal 소개',
    category: 'get-started',
    stage: '탐색',
    summary: '문서, 실행, 피드백, 개선 흐름을 한 곳에서 이해합니다.',
    markdown: `# AI Wiki Portal 소개

AI Wiki Portal은 비개발자가 AI Agent와 Wiki 문서를 활용해 서비스 개발 흐름을 따라갈 수 있도록 돕는 업무 포털입니다.

## 핵심 흐름

1. Blueprint로 요구사항을 정리합니다.
2. 개발 환경 가이드를 따라 준비합니다.
3. AI Agent에게 코드 생성과 오류 해결을 요청합니다.
4. GitHub 상태와 배포 준비도를 확인합니다.

**목표**는 문서가 실행 흐름을 안내하는 것입니다.`,
    relatedDocumentIds: ['doc-get-started', 'doc-blueprint'],
    nextAction: 'Get Started 문서로 이동해 첫 실행 단계를 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '오늘 업데이트',
  },
  {
    id: 'doc-get-started',
    title: 'Get Started 실행 가이드',
    category: 'get-started',
    stage: '시작',
    summary: '처음 사용하는 사용자가 따라야 할 순서를 안내합니다.',
    markdown: `# Get Started 실행 가이드

## 시작 전 확인

- 만들고 싶은 서비스 목표를 한 문장으로 정리합니다.
- 주요 사용자와 필요한 기능을 적습니다.
- 막히는 지점은 AI Agent 질문으로 전환합니다.

\`\`\`text
예: 영업팀이 고객 미팅 일정을 등록하고 알림을 받을 수 있는 서비스
\`\`\`

다음 단계는 Blueprint 작성입니다.`,
    relatedDocumentIds: ['doc-blueprint', 'doc-ai-agent'],
    nextAction: 'Blueprint 화면에서 요구사항을 입력하세요.',
    status: 'updated',
    lastUpdatedLabel: '방금 갱신',
  },
  {
    id: 'doc-blueprint',
    title: 'Blueprint 작성 방법',
    category: 'blueprint',
    stage: '설계',
    summary: '요구사항을 PRD, 시스템 설계, 환경 가이드로 바꾸는 방법입니다.',
    markdown: `# Blueprint 작성 방법

Blueprint는 이후 개발 과정의 기준이 되는 구조화된 설계 문서입니다.

## 좋은 입력 예시

누가 사용하고, 어떤 문제를 해결하며, 반드시 필요한 기능이 무엇인지 적습니다.

[Blueprint 화면 열기](/blueprint)

입력이 부족하면 누락된 항목을 먼저 보강합니다.`,
    relatedDocumentIds: ['doc-environment', 'doc-dashboard'],
    nextAction: '요구사항을 입력하고 mock Blueprint 결과를 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '오늘 업데이트',
  },
  {
    id: 'doc-environment',
    title: '개발 환경 구성 가이드',
    category: 'environment',
    stage: '환경 구성',
    summary: 'AI Agent가 작업할 수 있는 기본 개발 환경을 준비합니다.',
    markdown: `# 개발 환경 구성 가이드

## 기본 준비

- Node.js와 package manager를 확인합니다.
- 저장소를 준비합니다.
- 실행 명령을 문서에 남깁니다.

\`pnpm install\` 이후 프로젝트별 quickstart를 따릅니다.`,
    relatedDocumentIds: ['doc-ai-agent', 'doc-troubleshooting'],
    nextAction: '환경 오류가 발생하면 문제 해결 문서를 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '어제 업데이트',
  },
  {
    id: 'doc-ai-agent',
    title: 'AI Agent 활용 가이드',
    category: 'ai-agent',
    stage: 'AI 협업',
    summary: 'Codex, Claude Code 등 AI Agent에게 작업을 요청하는 방법입니다.',
    markdown: `# AI Agent 활용 가이드

AI Agent에게는 목표, 현재 상태, 오류 메시지, 기대 결과를 함께 전달합니다.

## 질문 형식

1. 지금 하려는 일
2. 실패한 명령 또는 화면
3. 원하는 결과

짧고 구체적인 질문이 문제 해결 시간을 줄입니다.`,
    relatedDocumentIds: ['doc-troubleshooting', 'doc-feedback'],
    nextAction: '현재 문서나 프로젝트 맥락으로 AI Agent 질문을 시작하세요.',
    status: 'updated',
    lastUpdatedLabel: '오늘 업데이트',
  },
  {
    id: 'doc-github',
    title: 'GitHub 프로젝트 관리',
    category: 'github',
    stage: '프로젝트 관리',
    summary: '저장소 등록, 변경 내역, 협업 상태를 업무 관점에서 확인합니다.',
    markdown: `# GitHub 프로젝트 관리

GitHub 상태는 코드 저장소의 준비도와 최근 변경 흐름을 보여줍니다.

## 확인할 항목

- 저장소 등록 여부
- 최근 변경 내역
- 배포 준비 상태
- 막힌 이슈`,
    relatedDocumentIds: ['doc-dashboard', 'doc-deployment'],
    nextAction: '대시보드에서 프로젝트별 GitHub 요약을 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '3일 전 업데이트',
  },
  {
    id: 'doc-deployment',
    title: '배포 준비 체크',
    category: 'deployment',
    stage: '배포',
    summary: '서비스를 공유하기 전 확인해야 할 상태를 정리합니다.',
    markdown: `# 배포 준비 체크

배포 준비는 코드 완성만이 아니라 문서, 테스트, 담당자 확인을 포함합니다.

- 테스트 통과
- 배포 대상 확인
- 사용자 안내 문서 준비
- 롤백 또는 문의 경로 확인`,
    relatedDocumentIds: ['doc-github', 'doc-dashboard'],
    nextAction: '프로젝트 상세에서 배포 준비 요약을 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '이번 주 업데이트',
  },
  {
    id: 'doc-troubleshooting',
    title: '오류 상황 문제 해결',
    category: 'troubleshooting',
    stage: '문제 해결',
    summary: '환경 구성, 코드 생성, 배포 중 발생하는 오류 대응 경로입니다.',
    markdown: `# 오류 상황 문제 해결

오류가 발생하면 먼저 어떤 단계에서 실패했는지 확인합니다.

## 대응 순서

1. 관련 문서를 다시 확인합니다.
2. 오류 메시지를 AI Agent에게 전달합니다.
3. 반복 실패하면 지원 담당자에게 문의합니다.`,
    relatedDocumentIds: ['doc-ai-agent', 'doc-feedback'],
    nextAction: '막힌 단계에서 AI Agent 질문 또는 담당자 문의를 선택하세요.',
    status: 'updated',
    lastUpdatedLabel: '오늘 업데이트',
  },
  {
    id: 'doc-dashboard',
    title: '프로젝트 대시보드 읽기',
    category: 'github',
    stage: '모니터링',
    summary: '진행률, 위험 상태, 최근 활동, 다음 행동을 해석합니다.',
    markdown: `# 프로젝트 대시보드 읽기

대시보드는 실시간 연동이 아닌 mock 상태로 진행 흐름을 검증합니다.

## 상태 해석

- 진행 중: 다음 단계가 준비되어 있습니다.
- 막힘: 관련 문서 또는 지원 경로가 필요합니다.
- 검토 대기: 담당자 확인이 필요합니다.`,
    relatedDocumentIds: ['doc-github', 'doc-troubleshooting'],
    nextAction: '막힘 프로젝트를 선택해 지원 경로를 확인하세요.',
    status: 'available',
    lastUpdatedLabel: '오늘 업데이트',
  },
  {
    id: 'doc-feedback',
    title: '문서 피드백 남기기',
    category: 'troubleshooting',
    stage: '개선',
    summary: '불명확한 문서와 실패한 단계를 개선 의견으로 연결합니다.',
    markdown: `# 문서 피드백 남기기

문서가 실행에 충분하지 않으면 출처 문서와 단계를 유지한 상태로 의견을 남깁니다.

피드백은 다음 문서 개선과 AI Agent 답변 품질 개선에 사용됩니다.`,
    relatedDocumentIds: ['doc-ai-agent', 'doc-troubleshooting'],
    nextAction: '현재 단계에서 피드백을 작성하세요.',
    status: 'needs-review',
    lastUpdatedLabel: '검토 필요',
  },
];
