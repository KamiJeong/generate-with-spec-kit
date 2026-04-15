# Data Model: AI Wiki Portal Platform 화면 개발

**Branch**: `021-ai-wiki-portal` | **Date**: 2026-04-15

> 모든 데이터는 Mock 전용. 실제 DB/API 연동 없음.

## 타입 정의 (`src/types/index.ts`)

### Project (프로젝트)

```typescript
export type ProjectStatus = 'in_progress' | 'completed' | 'blocked';

export interface ProjectParticipant {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;           // 0–100 (%)
  participants: ProjectParticipant[];
  githubRepo?: string;
  createdAt: string;          // ISO 8601
}
```

**상태 전이**: `in_progress` → `completed` | `blocked` → `in_progress`

### Document (Wiki 문서)

```typescript
export type DocumentCategory =
  | 'get-started'
  | 'blueprint'
  | 'ai-agent'
  | 'github'
  | 'reference';

export interface DocumentTreeItem {
  id: string;
  title: string;
  category: DocumentCategory;
  children?: DocumentTreeItem[];
}

export interface Document {
  id: string;
  title: string;
  category: DocumentCategory;
  contentHtml: string;        // 미리 렌더링된 HTML (Mock)
  headings: { id: string; text: string; level: number }[];  // TOC용
  updatedAt: string;          // ISO 8601
  author: string;
}
```

### Blueprint

```typescript
export interface BlueprintSection {
  id: 'prd' | 'architecture' | 'environment' | 'api-design';
  title: string;
  contentHtml: string;
}

export interface Blueprint {
  id: string;
  inputText: string;
  sections: BlueprintSection[];
  createdAt: string;          // ISO 8601
}
```

### Step (Get Started 단계)

```typescript
export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  aiHelpHtml: string;         // AI 도움말 내용 (Mock HTML)
}
```

### User (사용자)

```typescript
export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  assignedProjectIds: string[];
}
```

### ActivityFeed (활동 피드)

```typescript
export type ActivityEventType =
  | 'project_created'
  | 'blueprint_generated'
  | 'step_completed'
  | 'project_completed'
  | 'member_joined';

export interface ActivityFeedItem {
  id: string;
  eventType: ActivityEventType;
  userId: string;
  projectId?: string;
  description: string;
  occurredAt: string;         // ISO 8601
}
```

### GithubStatus (GitHub 연동 현황 — Mock)

```typescript
export interface GithubCommit {
  sha: string;
  message: string;
  author: string;
  committedAt: string;
}

export interface GithubStatus {
  projectId: string;
  repoName: string;
  openIssueCount: number;
  branch: string;
  recentCommits: GithubCommit[];
}
```

## Mock 데이터 파일 구조

| 파일 | export | 내용 |
|------|--------|------|
| `mock/projects.ts` | `mockProjects: Project[]` | 5개 프로젝트 (다양한 상태) |
| `mock/documents.ts` | `mockDocumentTree: DocumentTreeItem[]`, `mockDocuments: Document[]` | 트리 구조 + 문서 상세 10개 |
| `mock/blueprints.ts` | `mockBlueprint: Blueprint` | 완성된 Blueprint 1개 (결과 미리보기용) |
| `mock/steps.ts` | `mockSteps: Step[]` | Get Started 단계 7개 |
| `mock/users.ts` | `mockUsers: User[]`, `mockCurrentUser: User`, `mockActivityFeed: ActivityFeedItem[]` | 현재 로그인 사용자 + 활동 피드 |
| `mock/github.ts` | `mockGithubStatus: Record<string, GithubStatus>` | 프로젝트 ID → GitHub 현황 |
