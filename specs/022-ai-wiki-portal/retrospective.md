---
feature: "022-ai-wiki-portal"
branch: "022-ai-wiki-portal"
date: "2026-04-15"
completion_rate: "100%"
spec_adherence: "83%"
total_tasks: 64
completed_tasks: 64
requirements_total: 24
requirements_implemented: 16
requirements_modified: 0
requirements_partial: 8
requirements_not_implemented: 0
critical_findings: 2
---

# Retrospective: AI Wiki Portal Platform Screen

## Executive Summary

The Codex app implementation created a new React/Vite workspace package at `apps/ai-wiki-portal-platform-by-codex` with route-level screens for Dashboard, Wiki, Wiki document detail, Blueprint, Get Started, and Project Detail. The implementation uses `@myorg/ui`, `@myorg/tokens`, typed mock data, role perspectives, markdown viewing, simulated monitoring, AI question entry points, and feedback entry points.

Task artifact completion is 64/64. Current command evidence is improved from the previous retrospective: lint passes and the package test command now passes with 11 test files and 20 tests. The implementation is still not fully merge-ready because coverage cannot run without `@vitest/coverage-v8`, and production build still hits Vite's Windows `spawn EPERM` path while loading `vite.config.ts`.

Spec adherence is assessed at 83%. All functional requirements have implementation evidence. The eight success criteria remain partial because they require usability review, guided review, responsive visual review, or measured participant outcomes that were not collected in this implementation run.

## Proposed Spec Changes

None. The prior retrospective recommendations were already applied to `spec.md`: the entry experience can be dashboard-first, automated evidence is separated from guided review evidence, and quality-gate task completion requires passing script or CI evidence.

## Command Evidence

| Command | Result | Evidence |
|---------|--------|----------|
| `pnpm --filter @myorg/ai-wiki-portal-by-codex lint` | PASS | ESLint completed with `--max-warnings=0`. |
| `pnpm --filter @myorg/ai-wiki-portal-by-codex test -- --reporter=dot` | PASS | Vitest completed 11 passed test files and 20 passed tests. |
| `pnpm --filter @myorg/ai-wiki-portal-by-codex test:coverage` | FAIL | Vitest starts, then fails with `Cannot find package '@vitest/coverage-v8'`. |
| `pnpm --filter @myorg/ai-wiki-portal-by-codex build` | FAIL | `tsc --noEmit` passes, then `vite build` fails loading `vite.config.ts` with `Error: spawn EPERM`. |

## Requirement Coverage Matrix

| ID | Status | Evidence | Notes |
|----|--------|----------|-------|
| FR-001 | Implemented | `AppLayout.tsx`, `App.tsx`, `DashboardPage.tsx` | Portal purpose and actions are delivered through a dashboard-first shell and persistent navigation, which is now allowed by the spec. |
| FR-016 | Implemented | `roles.ts`, `role-context.tsx`, `RolePerspectiveSelector.tsx` | Three mock role perspectives are represented without auth enforcement. |
| FR-002 | Implemented | `documents.ts`, `WikiPage.tsx`, `WikiFilters.tsx` | Categories include Get Started, Blueprint, environment, AI Agent, GitHub, deployment, troubleshooting. |
| FR-003 | Implemented | `WikiFilters.tsx`, `selectors.ts`, `WikiPage.test.tsx` | Keyword, category, and stage filtering are implemented and covered by tests. |
| FR-004 | Implemented | `WikiDocPage.tsx`, `DocNavigation.tsx`, `documents.ts` | Detail page shows title, summary, markdown, related docs, and next action. |
| FR-005 | Implemented | `MarkdownViewer.tsx`, `WikiDocPage.test.tsx` | Limited markdown renderer covers headings, lists, links, inline code, fenced code, and emphasis. |
| FR-006 | Implemented | `BlueprintPage.tsx`, `BlueprintForm.tsx`, `BlueprintResult.tsx`, `blueprints.ts` | Interactive mock Blueprint flow and generated sections exist. |
| FR-007 | Implemented | `projects.ts`, `github.ts`, `DashboardPage.tsx` | Representative project and integration mock data exists. |
| FR-008 | Implemented | `DashboardPage.tsx`, `ProjectCard.tsx`, `ActivityFeed.tsx` | Monitoring view includes stage, owner, completion, activity, refresh, risk, and next action. |
| FR-009 | Implemented | `GithubStatusCard.tsx`, `github.ts`, `projects.ts` | GitHub/deployment status is presented in business-readable terms. |
| FR-010 | Implemented | `StepList.tsx`, `AiQueryPanel.tsx`, `SupportContextPanel.tsx`, `ProjectDetailPage.tsx` | Help paths connect steps/issues to documents, AI question flow, and support context. |
| FR-011 | Implemented | `FeedbackEntry.tsx`, `WikiDocPage.tsx` | Wiki content exposes feedback entry with source context. |
| FR-012 | Implemented | `types/index.ts`, `status.ts`, `StatusIndicators.tsx` | Document, execution, risk, and integration states are distinguished. |
| FR-013 | Implemented | `StateFeedback.tsx`, `WikiPage.tsx`, `ProjectDetailPage.tsx` | Empty/loading/unavailable/error primitives and route usages exist. |
| FR-014 | Implemented | `Accessibility.test.tsx`, `AppLayout.tsx`, `WikiFilters.tsx` | Accessible names and keyboard-reachable controls are covered by focused tests. |
| FR-015 | Implemented | Page/component Korean copy across `src/pages` and `src/components` | Copy preserves core terms such as Blueprint, AI Agent, GitHub, deployment, PRD. |
| SC-001 | Partial | `AppLayout.tsx`, `WikiPage.tsx`, `GetStartedPage.tsx` | UI supports the outcome, but no first-time user review data was collected. |
| SC-002 | Partial | `WikiPage.test.tsx`, `WikiFilters.tsx` | Search/browse behavior is covered, but 8/10 guided lookup measurement was not performed. |
| SC-003 | Partial | `BlueprintPage.test.tsx`, `BlueprintResult.test.tsx` | Demo flow exists, but 85% guided comprehension was not measured. |
| SC-004 | Partial | `DashboardPage.tsx`, `ProjectCard.tsx`, `DashboardPage.test.tsx` | Dashboard supports blocked project identification, but 60-second review evidence is absent. |
| SC-005 | Partial | `documents.ts`, `projects.ts`, `StateFeedback.tsx` | Most states include next actions or recovery paths; percentage was not measured in review. |
| SC-006 | Partial | Korean business copy in pages/components | Understandability was not rated by non-developer participants. |
| SC-007 | Partial | Responsive class usage and `Accessibility.test.tsx` | Small-screen layout patterns exist, but no visual/manual review was completed. |
| SC-008 | Partial | `RolePerspective.test.tsx`, `roles.ts` | Role perspective changes are implemented, but 80% guided review success was not measured. |

## Success Criteria Assessment

The implementation is ready for a mock-screen review once the remaining technical gates are corrected. Automated tests provide supporting evidence for navigation, search/filter, Blueprint flow, dashboard state, role selector, and accessibility names. They do not replace the review percentages in SC-001 through SC-008.

## Architecture Drift Table

| Planned Decision | Actual Implementation | Drift | Impact |
|------------------|-----------------------|-------|--------|
| New app under `apps/ai-wiki-portal-platform-by-codex` | Implemented with independent package, Vite, Vitest, and TypeScript config | None | Matches plan. |
| Use `@myorg/ui` and semantic tokens | Implemented across layout, cards, fields, buttons, badges, progress, empty/alert states | None | Matches design-system constraint. |
| Mock data only; no live API | Implemented with in-memory documents, projects, roles, Blueprint, GitHub/Confluence statuses | None | Matches scope. |
| Route count around 5 core routes | Implemented 6 concrete route targets plus root redirect | Minor positive | Project detail route improves monitoring flow. |
| Landing experience | Root redirects to dashboard with persistent portal shell | None | Current spec explicitly allows a dashboard-first entry experience. |
| Vitest config path | `plan.md` and `tasks.md` reference `vitest.config.ts`; implementation uses `vitest.config.mjs` | Minor drift | The `.mjs` file is intentional to work around Windows/esbuild spawn restrictions in test mode. |
| TDD and quality gates | Test files exist and package tests pass; coverage and build still fail | Significant drift | The package is not fully release-ready until coverage dependency and build config are fixed. |

## Significant Deviations

| Severity | Deviation | Evidence | Root Cause | Recommendation |
|----------|-----------|----------|------------|----------------|
| CRITICAL | Coverage gate is marked complete in `tasks.md`, but `test:coverage` fails. | T062 is `[X]`; command fails with `Cannot find package '@vitest/coverage-v8'`. | Vitest coverage provider dependency is not installed for the app workspace. | Add the appropriate Vitest coverage provider dependency or change the configured coverage provider, then rerun coverage before accepting T062. |
| CRITICAL | Production build gate is marked complete in `tasks.md`, but `build` fails. | T063 is `[X]`; `vite build` fails loading `vite.config.ts` with `Error: spawn EPERM`. | Vite bundles TypeScript config through esbuild, and this Windows environment blocks that spawn path. | Convert build config to a no-bundle-compatible JavaScript/MJS path or apply an equivalent build-time workaround, then rerun `build`. |
| SIGNIFICANT | Validation artifacts and task checkboxes are ahead of current command evidence. | T061-T063 are `[X]`; only lint and test currently pass. | Quality-gate checkboxes were not tied tightly enough to passing command output. | Keep task checkboxes complete only when command evidence is attached or repeatable in the active workspace. |
| MINOR | Plan/task docs still name `vitest.config.ts`. | `plan.md` and T005 reference `vitest.config.ts`; repository now has `vitest.config.mjs`. | Test runner workaround required switching config file format. | Update planning artifacts during a sync pass if exact file traceability is required. |

## Innovations And Best Practices

| Type | Improvement | Reuse Potential |
|------|-------------|-----------------|
| POSITIVE | The package test command now uses a Windows spawn shim and runner config that avoids the blocked esbuild path for Vitest. | Reusable for other Vite/Vitest packages in this workspace if they hit the same environment restriction. |
| POSITIVE | Limited `MarkdownViewer` avoids adding a new markdown dependency while covering required source content patterns. | Reusable for mock/doc prototypes with constrained markdown. |
| POSITIVE | Role perspective context is screen-level and mock-only, matching the spec boundary without introducing auth complexity. | Reusable pattern for validation-only role views. |
| POSITIVE | Status label/variant helpers centralize business-readable state labels. | Can become a shared app-level convention for project dashboards. |
| POSITIVE | AI question and feedback panels preserve source context without backend coupling. | Good pattern for future live support integration contracts. |

## Constitution Compliance

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. 코드 품질 | Partial | Components, mock data, selectors, pages, and status helpers are separated; lint now passes. Build still fails. |
| II. 테스트 표준 | Partial | Package tests pass 11 files and 20 tests. Coverage gate fails because `@vitest/coverage-v8` is missing. |
| III. 사용자 경험 일관성 | Partial | Design-system components and semantic token classes are used; focused accessible-name tests pass. Full visual/a11y review is still absent. |
| IV. 성능 요구사항 | Partial | Lazy routes and small mock datasets support the target; production build and performance smoke evidence are still absent. |
| V. 단순성 | Pass | No live API/auth/storage was added; mock-only scope was preserved. |
| Documentation Language Policy | Pass | Speckit artifacts and user-facing copy are Korean with technical terms preserved where appropriate. |

Constitution violations: coverage and build quality gates are not proven. This is critical before merge, even though lint and tests now pass.

## Unspecified Implementations

- Root route redirects to `/dashboard`; this is now aligned with the clarified dashboard-first entry requirement.
- `MarkdownViewer` is a local constrained renderer rather than a full markdown library. This is within scope and avoids an extra dependency.
- Test execution uses `scripts/vite-windows-spawn-shim.cjs` and `vitest.config.mjs` to avoid environment-specific child-process failures.
- `.gitignore` includes `.npm-cache/` due an attempted local dependency-cache workaround.
- `pnpm-lock.yaml` includes the new Codex app importer.

## Task Execution Analysis

| Metric | Value |
|--------|-------|
| Total tasks | 64 |
| Completed tasks in `tasks.md` | 64 |
| Completion rate | 100% |
| Setup/Foundation | Complete by artifact; T005 path drift remains |
| User Story 1 | Complete by artifact, code, and tests |
| User Story 2 | Complete by artifact, code, and tests |
| User Story 3 | Complete by artifact, code, and tests |
| User Story 4 | Complete by artifact, code, and tests |
| Polish tasks | Partially proven; lint and tests pass, coverage and build fail |

The main process issue is artifact trust: T062 and T063 should require successful command output. In future SDD cycles, quality-gate tasks should remain unchecked until their commands pass in the active workspace or a documented external CI run is linked.

## Lessons Learned And Recommendations

1. Keep the new Vitest workaround, because `pnpm --filter @myorg/ai-wiki-portal-by-codex test` now passes in this workspace.
2. Add `@vitest/coverage-v8` or adjust the coverage provider before treating T062 as complete.
3. Move Vite build config away from the TypeScript config bundling path, or apply a build-time equivalent of the test runner workaround, before treating T063 as complete.
4. Separate automated UI evidence from guided review evidence. SC-001 through SC-008 need recorded participant or reviewer results before they become fully satisfied.
5. Run `/speckit.verify.run` after lint, test, coverage, and build all pass.

## File Traceability Appendix

| Area | Files |
|------|-------|
| App shell and routing | `src/App.tsx`, `src/routes.tsx`, `src/components/layout/AppLayout.tsx`, `src/main.tsx` |
| Types and selectors | `src/types/index.ts`, `src/mock/selectors.ts`, `src/lib/status.ts`, `src/lib/role-context.tsx` |
| Mock data | `src/mock/documents.ts`, `src/mock/roles.ts`, `src/mock/projects.ts`, `src/mock/github.ts`, `src/mock/steps.ts`, `src/mock/blueprints.ts` |
| Wiki | `src/pages/WikiPage.tsx`, `src/pages/WikiDocPage.tsx`, `src/components/wiki/*` |
| Blueprint | `src/pages/BlueprintPage.tsx`, `src/components/blueprint/*` |
| Dashboard/project | `src/pages/DashboardPage.tsx`, `src/pages/ProjectDetailPage.tsx`, `src/components/dashboard/*`, `src/components/project/*` |
| Execution feedback loop | `src/pages/GetStartedPage.tsx`, `src/components/get-started/StepList.tsx`, `src/components/shared/FeedbackEntry.tsx`, `src/components/project/AiQueryPanel.tsx` |
| Tests | `tests/*.test.tsx`, `tests/test-utils.tsx`, `tests/setup.ts` |
| Workspace config | `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.mjs`, `scripts/vite-windows-spawn-shim.cjs`, `index.html`, `src/index.css` |

## Self-Assessment Checklist

| Check | Result | Notes |
|-------|--------|-------|
| Evidence completeness | PASS | Major deviations cite task IDs, commands, and files. |
| Coverage integrity | PASS | FR-001 through FR-016 and SC-001 through SC-008 are listed. |
| Metrics sanity | PASS | Completion rate is 64/64 = 100%; adherence is `(16 + 8*0.5) / 24 = 83%`. |
| Severity consistency | PASS | Missing coverage and build evidence are CRITICAL because constitution merge gates require them. |
| Constitution review | PASS | Each constitution principle is explicitly assessed. |
| Human Gate readiness | PASS | No further spec changes are proposed. |
| Actionability | PASS | Recommendations are tied to coverage dependency, build config, and review evidence. |
