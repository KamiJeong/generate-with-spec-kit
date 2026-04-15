import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: '사내 HR 셀프서비스 포털',
    description: '직원들이 휴가 신청, 급여 내역 조회, 인사 문서를 스스로 처리할 수 있는 포털 개발',
    status: 'in_progress',
    progress: 65,
    participants: [
      { id: 'user-001', name: '김민준', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MJ' },
      { id: 'user-002', name: '이서연', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SY' },
      { id: 'user-003', name: '박지호', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JH' },
    ],
    githubRepo: 'myorg/hr-self-service-portal',
    createdAt: '2026-03-10T09:00:00Z',
  },
  {
    id: 'proj-002',
    name: '고객 CS 챗봇 자동화',
    description: 'AI 기반 고객 문의 자동 분류 및 1차 응답 챗봇 구축으로 CS 팀 업무 효율화',
    status: 'in_progress',
    progress: 30,
    participants: [
      { id: 'user-002', name: '이서연', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SY' },
      { id: 'user-004', name: '최다은', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DE' },
    ],
    githubRepo: 'myorg/cs-chatbot',
    createdAt: '2026-03-22T14:00:00Z',
  },
  {
    id: 'proj-003',
    name: '재고 관리 대시보드',
    description: '창고 재고 현황을 실시간으로 시각화하고 발주 알림을 자동화하는 관리자 대시보드',
    status: 'completed',
    progress: 100,
    participants: [
      { id: 'user-001', name: '김민준', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MJ' },
      { id: 'user-005', name: '정하늘', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HN' },
    ],
    githubRepo: 'myorg/inventory-dashboard',
    createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: 'proj-004',
    name: '마케팅 캠페인 분석 툴',
    description: '광고 채널별 성과 지표를 통합하여 ROI를 분석하는 마케팅 분석 도구',
    status: 'blocked',
    progress: 45,
    participants: [
      { id: 'user-003', name: '박지호', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JH' },
      { id: 'user-004', name: '최다은', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DE' },
      { id: 'user-005', name: '정하늘', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HN' },
    ],
    githubRepo: 'myorg/marketing-analytics',
    createdAt: '2026-03-05T11:00:00Z',
  },
  {
    id: 'proj-005',
    name: '내부 교육 LMS',
    description: '신입 사원 온보딩 및 직무 교육 콘텐츠를 관리하는 학습 관리 시스템 구축',
    status: 'in_progress',
    progress: 15,
    participants: [
      { id: 'user-002', name: '이서연', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SY' },
      { id: 'user-005', name: '정하늘', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HN' },
    ],
    githubRepo: 'myorg/internal-lms',
    createdAt: '2026-04-01T10:00:00Z',
  },
];
