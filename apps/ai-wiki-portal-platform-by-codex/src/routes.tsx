export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  WIKI: '/wiki',
  WIKI_DOC: '/wiki/:docId',
  BLUEPRINT: '/blueprint',
  GET_STARTED: '/get-started',
  PROJECT_DETAIL: '/projects/:projectId',
} as const;

export function wikiDocPath(docId: string) {
  return `/wiki/${docId}`;
}

export function projectPath(projectId: string) {
  return `/projects/${projectId}`;
}
