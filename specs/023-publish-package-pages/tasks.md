# Tasks: 패키지 및 Storybook 자동 배포

**Input**: Design documents from `/specs/023-publish-package-pages/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/release-workflow.md](./contracts/release-workflow.md), [quickstart.md](./quickstart.md)

**Tests**: 헌법의 TDD 원칙과 plan.md의 publication gate 요구에 따라 workflow/metadata 검증 task를 구현 task보다 먼저 배치한다.

**Organization**: User story별로 독립 구현 및 검증이 가능하도록 구성한다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 서로 다른 파일을 수정하며 미완료 task에 의존하지 않아 병렬 실행 가능
- **[Story]**: User story phase task에만 사용 (`[US1]`, `[US2]`, `[US3]`)
- 모든 task는 실행 대상 file path를 포함한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Release automation을 검증하고 구현할 공통 파일과 문서 위치를 준비한다.

- [X] T001 Create release automation verification scaffold in `scripts/verify-release-automation.mjs`
- [X] T002 Add `release:verify` script entry for `scripts/verify-release-automation.mjs` in `package.json`
- [X] T003 [P] Add Release Automation section heading and outline in `README.md`
- [X] T004 [P] Create publish workflow file scaffold in `.github/workflows/publish.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 user story가 공유하는 branch boundary, package allowlist, 최소 권한 검증 기반을 만든다.

**CRITICAL**: 이 phase가 완료되기 전에는 개별 user story 구현을 시작하지 않는다.

- [X] T005 Add target package allowlist validation for `packages/tokens` and `packages/ui` in `scripts/verify-release-automation.mjs`
- [X] T006 Add `main` branch publication boundary validation for `.github/workflows/publish.yml` in `scripts/verify-release-automation.mjs`
- [X] T007 Add least-privilege permissions validation for packages/pages jobs in `scripts/verify-release-automation.mjs`
- [X] T008 Define release workflow triggers for `release.published` and guarded `workflow_dispatch` in `.github/workflows/publish.yml`
- [X] T009 Configure shared checkout, pnpm, Node.js 20, and frozen install steps in `.github/workflows/publish.yml`
- [X] T010 Add non-main and pull request publish-blocking conditions in `.github/workflows/publish.yml`

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order or in parallel where capacity allows.

---

## Phase 3: User Story 1 - 비공개 패키지 릴리스 배포 (Priority: P1) MVP

**Goal**: `main`에서 승인된 릴리스 이벤트로 `packages/tokens`와 `packages/ui`를 GitHub Packages npm registry에 private package로 게시한다.

**Independent Test**: 유효한 `packages/tokens`와 `packages/ui` version에 대해 release workflow를 실행했을 때 두 package publication status가 분리되어 보고되고, duplicate version은 재게시되지 않아야 한다.

### Tests for User Story 1

- [X] T011 [US1] Add package manifest publish-readiness checks for `packages/tokens/package.json` and `packages/ui/package.json` in `scripts/verify-release-automation.mjs`
- [X] T012 [US1] Add duplicate-version guard validation for package publish steps in `.github/workflows/publish.yml` to `scripts/verify-release-automation.mjs`
- [X] T013 [US1] Add package publication status summary validation for `tokens_publication` and `ui_publication` in `scripts/verify-release-automation.mjs`

### Implementation for User Story 1

- [X] T014 [P] [US1] Update publish metadata for GitHub Packages in `packages/tokens/package.json`
- [X] T015 [P] [US1] Update publish metadata for GitHub Packages in `packages/ui/package.json`
- [X] T016 [US1] Add `packages/tokens` validation steps for lint, test, build in `.github/workflows/publish.yml`
- [X] T017 [US1] Add `packages/ui` validation steps for lint, test, build in `.github/workflows/publish.yml`
- [X] T018 [US1] Configure GitHub Packages npm registry authentication with scoped `GITHUB_TOKEN` in `.github/workflows/publish.yml`
- [X] T019 [US1] Implement duplicate-version detection for `packages/tokens` and `packages/ui` in `.github/workflows/publish.yml`
- [X] T020 [US1] Implement `packages/tokens` and `packages/ui` publish steps in `.github/workflows/publish.yml`
- [X] T021 [US1] Write separate package publication outcomes to workflow summary in `.github/workflows/publish.yml`
- [X] T022 [US1] Document private package release flow for `packages/tokens` and `packages/ui` in `README.md`

**Checkpoint**: User Story 1 is independently testable as the MVP package release automation.

---

## Phase 4: User Story 2 - UI Storybook 사이트 배포 (Priority: P2)

**Goal**: `packages/ui` Storybook static build를 GitHub Pages에 배포하고, build/test 실패 시 기존 Pages site를 보존한다.

**Independent Test**: 유효한 `packages/ui` Storybook build가 있는 release workflow 실행 후 GitHub Pages deployment status와 Pages URL을 확인할 수 있어야 한다.

### Tests for User Story 2

- [X] T023 [US2] Add Storybook build gate validation for `packages/ui/storybook-static` in `scripts/verify-release-automation.mjs`
- [X] T024 [US2] Add GitHub Pages artifact/deploy action validation for `.github/workflows/publish.yml` in `scripts/verify-release-automation.mjs`
- [X] T025 [US2] Add Storybook deployment status summary validation for `storybook_publication` in `scripts/verify-release-automation.mjs`

### Implementation for User Story 2

- [X] T026 [US2] Add `packages/ui` Storybook build step outputting `packages/ui/storybook-static` in `.github/workflows/publish.yml`
- [X] T027 [US2] Add Storybook test gate before Pages deployment in `.github/workflows/publish.yml`
- [X] T028 [US2] Configure GitHub Pages setup and artifact upload for `packages/ui/storybook-static` in `.github/workflows/publish.yml`
- [X] T029 [US2] Configure GitHub Pages deploy job with `pages: write` and `id-token: write` in `.github/workflows/publish.yml`
- [X] T030 [US2] Write Storybook Pages deployment result and URL to workflow summary in `.github/workflows/publish.yml`
- [X] T031 [P] [US2] Document Storybook GitHub Pages release flow in `README.md`

**Checkpoint**: User Stories 1 and 2 can be validated independently: packages publish to registry, Storybook deploys to Pages.

---

## Phase 5: User Story 3 - 배포 접근 제어 및 실패 진단 (Priority: P3)

**Goal**: Credentials 노출을 방지하고 non-main/fork/unauthorized contexts에서 publication을 차단하며, 실패 범주와 rerun guidance를 maintainer에게 제공한다.

**Independent Test**: non-main 또는 unauthorized context 조건을 검증했을 때 publish/deploy jobs가 실행되지 않고, missing credential/permission/duplicate/service failure가 구분되어 보고되어야 한다.

### Tests for User Story 3

- [X] T032 [US3] Add credential exposure guard checks for `.github/workflows/publish.yml` in `scripts/verify-release-automation.mjs`
- [X] T033 [US3] Add fork, pull request, and non-main skip condition checks for `.github/workflows/publish.yml` in `scripts/verify-release-automation.mjs`
- [X] T034 [US3] Add failure category and rerun guidance validation for workflow summary output in `scripts/verify-release-automation.mjs`

### Implementation for User Story 3

- [X] T035 [US3] Harden package publish and Pages deploy job permissions in `.github/workflows/publish.yml`
- [X] T036 [US3] Add explicit failure categories for validation, permission, credential, duplicate-version, and external-service failures in `.github/workflows/publish.yml`
- [X] T037 [US3] Add rerun guidance for failed package or Storybook paths in `.github/workflows/publish.yml`
- [X] T038 [P] [US3] Document required permissions, credentials, and failure recovery guidance in `README.md`

**Checkpoint**: All user stories should now be independently functional and release diagnostics should be maintainer-facing.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story verification, documentation alignment, and final quality gates.

- [X] T039 [P] Run and fix `pnpm release:verify` issues for `scripts/verify-release-automation.mjs`
- [X] T040 Run and fix `pnpm --filter @myorg/tokens lint` issues for `packages/tokens/package.json`
- [X] T041 Run and fix `pnpm --filter @myorg/tokens test` issues for `packages/tokens/package.json`
- [X] T042 Run and fix `pnpm --filter @myorg/tokens build` issues for `packages/tokens/package.json`
- [X] T043 Run and fix `pnpm --filter @myorg/ui lint` issues for `packages/ui/package.json`
- [X] T044 Run and fix `pnpm --filter @myorg/ui test` issues for `packages/ui/package.json`
- [X] T045 Run and fix `pnpm --filter @myorg/ui build` issues for `packages/ui/package.json`
- [X] T046 Run and fix `pnpm --filter @myorg/ui build-storybook` issues for `packages/ui/.storybook/main.ts`
- [X] T047 Validate quickstart release flow against `specs/023-publish-package-pages/quickstart.md`
- [X] T048 Update task completion checkboxes in `specs/023-publish-package-pages/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: 즉시 시작 가능
- **Phase 2 Foundational**: Phase 1 완료 후 진행, 모든 user story를 block함
- **Phase 3 US1**: Phase 2 완료 후 시작, MVP scope
- **Phase 4 US2**: Phase 2 완료 후 시작 가능하지만 Storybook deployment summary는 US1 summary pattern과 맞춰야 함
- **Phase 5 US3**: Phase 2 완료 후 시작 가능하지만 모든 publication path의 permission/status를 hardening함
- **Phase 6 Polish**: 선택한 user stories 구현 완료 후 진행

### User Story Dependencies

- **US1 (P1)**: Foundation 이후 시작 가능, MVP이며 다른 story에 의존하지 않음
- **US2 (P2)**: Foundation 이후 시작 가능, package publish 성공과 독립적으로 Storybook Pages path 검증 가능
- **US3 (P3)**: Foundation 이후 시작 가능, US1/US2의 publish/deploy jobs를 hardening하므로 최종 통합 전 완료 필요

### Within Each User Story

- Verification tasks must be written first and fail before implementation.
- Workflow conditions and permissions before publish/deploy steps.
- Package metadata before package publish.
- Storybook build/test before Pages deploy.
- Status summary before rerun guidance.

## Parallel Opportunities

- T003 and T004 can run in parallel after T001/T002 are understood because they touch `README.md` and `.github/workflows/publish.yml`.
- T014 and T015 can run in parallel because they touch different package manifests.
- US2 Storybook Pages tasks can be worked on while US1 package metadata tasks are in progress after Phase 2, as long as `.github/workflows/publish.yml` edits are coordinated.
- Polish validation tasks should run after implementation is complete; T039 is independent of package command validation.

## Parallel Example: User Story 1

```text
Task: "T014 [P] [US1] Update publish metadata for GitHub Packages in packages/tokens/package.json"
Task: "T015 [P] [US1] Update publish metadata for GitHub Packages in packages/ui/package.json"
```

## Parallel Example: User Story 2

```text
Task: "T031 [P] [US2] Document Storybook GitHub Pages release flow in README.md"
Task: "T026 [US2] Add packages/ui Storybook build step outputting packages/ui/storybook-static in .github/workflows/publish.yml"
```

## Parallel Example: User Story 3

```text
Task: "T038 [P] [US3] Document required permissions, credentials, and failure recovery guidance in README.md"
Task: "T032 [US3] Add credential exposure guard checks for .github/workflows/publish.yml in scripts/verify-release-automation.mjs"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US1 package publication.
4. Stop and validate `pnpm release:verify`, tokens lint/test/build, UI lint/test/build.
5. Demo package publication readiness without enabling Storybook Pages deploy.

### Incremental Delivery

1. Setup + Foundation으로 safe publication boundary를 만든다.
2. US1로 private package release MVP를 완성한다.
3. US2로 Storybook Pages deployment를 추가한다.
4. US3로 permission, credential, failure diagnostics를 강화한다.
5. Polish phase에서 quickstart와 전체 validation을 실행한다.

### Parallel Team Strategy

1. 한 명은 `scripts/verify-release-automation.mjs` 검증 로직을 담당한다.
2. 한 명은 package manifests와 package publish path를 담당한다.
3. 한 명은 Storybook Pages path와 README guidance를 담당한다.
4. `.github/workflows/publish.yml` 충돌을 줄이기 위해 Phase 2 완료 후 workflow owner가 병합 순서를 조정한다.

## Notes

- [P] tasks는 서로 다른 파일을 수정하거나 완료된 선행 task에만 의존한다.
- 각 user story phase는 독립적으로 검증 가능한 release value를 제공해야 한다.
- Workflow가 credentials 값을 출력하지 않도록 summary/log 문구를 작성한다.
- `packages/tokens`와 `packages/ui`의 source code와 Storybook content는 이 feature 범위에서 변경하지 않는다.
