import type { GithubStatus } from '../types';

export const mockGithubStatus: Record<string, GithubStatus> = {
  'proj-001': {
    projectId: 'proj-001',
    repoName: 'myorg/hr-self-service-portal',
    openIssueCount: 7,
    branch: 'feature/leave-request',
    recentCommits: [
      {
        sha: 'a3f8c12',
        message: 'feat: 휴가 신청 폼 UI 구현',
        author: '김민준',
        committedAt: '2026-04-15T14:20:00Z',
      },
      {
        sha: 'b9d2e45',
        message: 'fix: 날짜 선택기 유효성 검사 오류 수정',
        author: '이서연',
        committedAt: '2026-04-14T11:05:00Z',
      },
      {
        sha: 'c7a1f89',
        message: 'chore: 의존성 업데이트',
        author: '박지호',
        committedAt: '2026-04-13T16:30:00Z',
      },
      {
        sha: 'd5e4b23',
        message: 'feat: 급여 내역 조회 API 연동',
        author: '김민준',
        committedAt: '2026-04-12T09:45:00Z',
      },
    ],
  },
  'proj-002': {
    projectId: 'proj-002',
    repoName: 'myorg/cs-chatbot',
    openIssueCount: 12,
    branch: 'main',
    recentCommits: [
      {
        sha: 'e1c9d56',
        message: 'feat: 문의 자동 분류 모델 통합',
        author: '이서연',
        committedAt: '2026-04-15T10:00:00Z',
      },
      {
        sha: 'f3b8a12',
        message: 'feat: 챗봇 UI 컴포넌트 초안',
        author: '최다은',
        committedAt: '2026-04-13T14:30:00Z',
      },
    ],
  },
  'proj-003': {
    projectId: 'proj-003',
    repoName: 'myorg/inventory-dashboard',
    openIssueCount: 0,
    branch: 'main',
    recentCommits: [
      {
        sha: 'g7h2i34',
        message: 'release: v1.0.0 배포',
        author: '김민준',
        committedAt: '2026-04-13T18:00:00Z',
      },
      {
        sha: 'h4j5k67',
        message: 'fix: 재고 알림 임계값 버그 수정',
        author: '정하늘',
        committedAt: '2026-04-12T15:20:00Z',
      },
    ],
  },
  'proj-004': {
    projectId: 'proj-004',
    repoName: 'myorg/marketing-analytics',
    openIssueCount: 18,
    branch: 'feature/roi-calculator',
    recentCommits: [
      {
        sha: 'i8l3m89',
        message: 'feat: ROI 계산기 기본 구조',
        author: '박지호',
        committedAt: '2026-04-11T11:00:00Z',
      },
      {
        sha: 'j9n1o23',
        message: 'docs: API 설계 문서 업데이트',
        author: '최다은',
        committedAt: '2026-04-10T16:45:00Z',
      },
    ],
  },
  'proj-005': {
    projectId: 'proj-005',
    repoName: 'myorg/internal-lms',
    openIssueCount: 4,
    branch: 'feature/onboarding-module',
    recentCommits: [
      {
        sha: 'k2p4q56',
        message: 'feat: 온보딩 모듈 초기 구조 생성',
        author: '이서연',
        committedAt: '2026-04-15T11:20:00Z',
      },
      {
        sha: 'l5r7s89',
        message: 'chore: 프로젝트 초기화',
        author: '정하늘',
        committedAt: '2026-04-14T16:00:00Z',
      },
    ],
  },
};
