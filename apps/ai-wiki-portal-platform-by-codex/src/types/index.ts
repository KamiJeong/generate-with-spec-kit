export type RoleId = 'non-developer' | 'stakeholder' | 'support';

export type DocumentCategory =
  | 'get-started'
  | 'blueprint'
  | 'environment'
  | 'ai-agent'
  | 'github'
  | 'deployment'
  | 'troubleshooting';

export type DocumentStatus = 'draft' | 'available' | 'updated' | 'needs-review';

export type ExecutionStatus =
  | 'draft'
  | 'available'
  | 'not-started'
  | 'in-progress'
  | 'blocked'
  | 'completed'
  | 'waiting-review';

export type RiskState = 'normal' | 'attention' | 'blocked';
export type IntegrationAvailability = 'connected' | 'unavailable' | 'unknown';
export type HelpType = 'document' | 'ai-agent' | 'human-support';
export type FeedbackType = 'unclear' | 'failed-step' | 'suggestion';
export type ReviewStatus = 'draft' | 'submitted' | 'needs-review';

export interface UserRolePerspective {
  id: RoleId;
  label: string;
  description: string;
  primaryGoals: string[];
  recommendedDocumentIds: string[];
  projectEmphasis: string;
  preferredSupportPath: string;
}

export interface WikiDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  stage: string;
  summary: string;
  markdown: string;
  relatedDocumentIds: string[];
  nextAction: string;
  status: DocumentStatus;
  lastUpdatedLabel: string;
}

export interface BlueprintOutput {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export interface Blueprint {
  id: string;
  inputText: string;
  projectGoal: string;
  targetUsers: string[];
  outputs: BlueprintOutput[];
  readinessStatus: 'ready' | 'missing-inputs' | 'needs-review';
  missingInputs: string[];
  linkedExecutionGuideId: string;
  generatedAtLabel: string;
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  roleVisibility: RoleId[];
  currentStage: string;
  completionPercent: number;
  executionStatus: ExecutionStatus;
  riskState: RiskState;
  recentActivity: string;
  lastUpdatedLabel: string;
  sampleStateChange: string;
  nextRecommendedAction: string;
  repositorySummary: string;
  deploymentSummary: string;
  stepIds: string[];
}

export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: ExecutionStatus;
  expectedResult: string;
  linkedDocumentId: string;
  helpType: HelpType;
  feedbackEnabled: boolean;
}

export interface AiAssistanceRequest {
  id: string;
  sourceType: 'document' | 'project' | 'execution-step';
  sourceId: string;
  questionContext: string;
  issueType: 'setup-error' | 'code-generation' | 'deployment' | 'unclear-doc' | 'other';
  status: 'draft' | 'ready-to-ask' | 'answered';
  recommendedNextAction: string;
}

export interface FeedbackItem {
  id: string;
  sourceDocumentId: string;
  sourceStepId?: string;
  feedbackType: FeedbackType;
  description: string;
  reviewStatus: ReviewStatus;
}

export interface IntegrationStatus {
  serviceName: 'GitHub' | 'Confluence';
  availability: IntegrationAvailability;
  lastCheckedLabel: string;
  summary: string;
  recoveryAction: string;
}
