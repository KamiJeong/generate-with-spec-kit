import { sampleBlueprint } from '@wiki/mock/blueprints';
import { wikiDocuments } from '@wiki/mock/documents';
import { integrationStatuses } from '@wiki/mock/github';
import { projects } from '@wiki/mock/projects';
import { defaultRoleId, rolePerspectives } from '@wiki/mock/roles';
import { executionSteps } from '@wiki/mock/steps';
import type { DocumentCategory, ExecutionStep, RoleId, WikiDocument } from '@wiki/types';

export function getRolePerspective(roleId: RoleId = defaultRoleId) {
  return rolePerspectives.find((role) => role.id === roleId) ?? rolePerspectives[0];
}

function exists<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function getRecommendedDocuments(roleId: RoleId): WikiDocument[] {
  const role = getRolePerspective(roleId);
  return role.recommendedDocumentIds
    .map((id) => wikiDocuments.find((document) => document.id === id))
    .filter(exists);
}

export function getDocumentById(documentId: string | undefined) {
  return wikiDocuments.find((document) => document.id === documentId);
}

export function getRelatedDocuments(documentId: string): WikiDocument[] {
  const document = getDocumentById(documentId);
  return (
    document?.relatedDocumentIds
      .map((id) => wikiDocuments.find((related) => related.id === id))
      .filter(exists) ?? []
  );
}

export function filterDocuments({
  query,
  category,
  stage,
}: {
  query?: string;
  category?: DocumentCategory | 'all';
  stage?: string;
}) {
  const normalizedQuery = query?.trim().toLowerCase() ?? '';

  return wikiDocuments.filter((document) => {
    const matchesQuery =
      !normalizedQuery ||
      [document.title, document.summary, document.category, document.stage]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    const matchesCategory = !category || category === 'all' || document.category === category;
    const matchesStage = !stage || stage === 'all' || document.stage === stage;
    return matchesQuery && matchesCategory && matchesStage;
  });
}

export function getProjectById(projectId: string | undefined) {
  return projects.find((project) => project.id === projectId);
}

export function getProjectsForRole(roleId: RoleId) {
  const filtered = projects.filter((project) => project.roleVisibility.includes(roleId));
  return filtered.length > 0 ? filtered : projects;
}

export function getProjectSteps(projectId: string): ExecutionStep[] {
  const project = getProjectById(projectId);
  return project?.stepIds
    .map((stepId) => executionSteps.find((step) => step.id === stepId))
    .filter(exists) ?? [];
}

export function getIntegrationsForProject(projectId: string) {
  return integrationStatuses[projectId] ?? [
    {
      serviceName: 'GitHub' as const,
      availability: 'unknown' as const,
      lastCheckedLabel: '확인 필요',
      summary: '연동 상태 정보가 아직 준비되지 않았습니다.',
      recoveryAction: '공통 프로젝트 상태를 확인하세요.',
    },
  ];
}

export function getStepById(stepId: string | undefined) {
  return executionSteps.find((step) => step.id === stepId);
}

export { executionSteps, projects, rolePerspectives, sampleBlueprint, wikiDocuments };
