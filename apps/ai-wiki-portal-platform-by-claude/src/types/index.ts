// ─── Project ─────────────────────────────────────────────────────────────────

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
  progress: number; // 0–100 (%)
  participants: ProjectParticipant[];
  githubRepo?: string;
  createdAt: string; // ISO 8601
}

// ─── Document ────────────────────────────────────────────────────────────────

export type DocumentCategory =
  | 'get-started'
  | 'blueprint'
  | 'ai-agent'
  | 'github'
  | 'reference';

export interface DocumentHeading {
  id: string;
  text: string;
  level: number; // 1–3
}

export interface DocumentTreeItem {
  id: string;
  title: string;
  category: DocumentCategory;
  children?: DocumentTreeItem[];
}

export interface WikiDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  contentHtml: string; // 미리 렌더링된 HTML
  headings: DocumentHeading[];
  updatedAt: string; // ISO 8601
  author: string;
}

// ─── Blueprint ───────────────────────────────────────────────────────────────

export type BlueprintSectionId = 'prd' | 'architecture' | 'environment' | 'api-design';

export interface BlueprintSection {
  id: BlueprintSectionId;
  title: string;
  contentHtml: string;
}

export interface Blueprint {
  id: string;
  inputText: string;
  sections: BlueprintSection[];
  createdAt: string; // ISO 8601
}

// ─── Step ────────────────────────────────────────────────────────────────────

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  aiHelpHtml: string; // AI 도움말 내용 (Mock HTML)
}

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  assignedProjectIds: string[];
}

// ─── Activity Feed ───────────────────────────────────────────────────────────

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
  occurredAt: string; // ISO 8601
}

// ─── GitHub Status ───────────────────────────────────────────────────────────

export interface GithubCommit {
  sha: string;
  message: string;
  author: string;
  committedAt: string; // ISO 8601
}

export interface GithubStatus {
  projectId: string;
  repoName: string;
  openIssueCount: number;
  branch: string;
  recentCommits: GithubCommit[];
}
