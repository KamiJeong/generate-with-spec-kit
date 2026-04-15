import type { ActivityFeedItem, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: '김민준',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MJ',
    role: 'admin',
    assignedProjectIds: ['proj-001', 'proj-003'],
  },
  {
    id: 'user-002',
    name: '이서연',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SY',
    role: 'member',
    assignedProjectIds: ['proj-001', 'proj-002', 'proj-005'],
  },
  {
    id: 'user-003',
    name: '박지호',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JH',
    role: 'member',
    assignedProjectIds: ['proj-001', 'proj-004'],
  },
  {
    id: 'user-004',
    name: '최다은',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DE',
    role: 'member',
    assignedProjectIds: ['proj-002', 'proj-004'],
  },
  {
    id: 'user-005',
    name: '정하늘',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=HN',
    role: 'member',
    assignedProjectIds: ['proj-003', 'proj-004', 'proj-005'],
  },
];

export const mockCurrentUser: User = mockUsers[0];

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'act-001',
    eventType: 'step_completed',
    userId: 'user-001',
    projectId: 'proj-001',
    description: '김민준 님이 "개발 환경 구성" 단계를 완료했습니다.',
    occurredAt: '2026-04-15T14:30:00Z',
  },
  {
    id: 'act-002',
    eventType: 'blueprint_generated',
    userId: 'user-002',
    projectId: 'proj-005',
    description: '이서연 님이 내부 교육 LMS Blueprint를 생성했습니다.',
    occurredAt: '2026-04-15T11:20:00Z',
  },
  {
    id: 'act-003',
    eventType: 'member_joined',
    userId: 'user-005',
    projectId: 'proj-005',
    description: '정하늘 님이 내부 교육 LMS 프로젝트에 합류했습니다.',
    occurredAt: '2026-04-14T16:00:00Z',
  },
  {
    id: 'act-004',
    eventType: 'project_completed',
    userId: 'user-001',
    projectId: 'proj-003',
    description: '재고 관리 대시보드 프로젝트가 완료되었습니다.',
    occurredAt: '2026-04-13T18:45:00Z',
  },
  {
    id: 'act-005',
    eventType: 'project_created',
    userId: 'user-002',
    projectId: 'proj-005',
    description: '이서연 님이 내부 교육 LMS 프로젝트를 시작했습니다.',
    occurredAt: '2026-04-12T09:00:00Z',
  },
  {
    id: 'act-006',
    eventType: 'step_completed',
    userId: 'user-004',
    projectId: 'proj-002',
    description: '최다은 님이 "API 설계" 단계를 완료했습니다.',
    occurredAt: '2026-04-11T15:10:00Z',
  },
  {
    id: 'act-007',
    eventType: 'blueprint_generated',
    userId: 'user-003',
    projectId: 'proj-004',
    description: '박지호 님이 마케팅 캠페인 분석 툴 Blueprint를 생성했습니다.',
    occurredAt: '2026-04-10T10:30:00Z',
  },
  {
    id: 'act-008',
    eventType: 'member_joined',
    userId: 'user-003',
    projectId: 'proj-001',
    description: '박지호 님이 HR 셀프서비스 포털 프로젝트에 합류했습니다.',
    occurredAt: '2026-04-09T09:15:00Z',
  },
  {
    id: 'act-009',
    eventType: 'step_completed',
    userId: 'user-002',
    projectId: 'proj-001',
    description: '이서연 님이 "Blueprint 검토" 단계를 완료했습니다.',
    occurredAt: '2026-04-08T14:00:00Z',
  },
  {
    id: 'act-010',
    eventType: 'project_created',
    userId: 'user-001',
    projectId: 'proj-001',
    description: '김민준 님이 HR 셀프서비스 포털 프로젝트를 시작했습니다.',
    occurredAt: '2026-03-10T09:00:00Z',
  },
];
