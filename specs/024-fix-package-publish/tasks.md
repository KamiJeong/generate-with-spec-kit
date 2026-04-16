# Tasks: GitHub Packages publish permission 오류 복구

**Input**: Design documents from `/specs/024-fix-package-publish/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/package-publication.md](./contracts/package-publication.md), [quickstart.md](./quickstart.md)

**Tests**: 헌법의 TDD 원칙과 plan.md의 검증 요구에 따라 release verification 및 preflight validation task를 구현 task보다 먼저 배치한다.

**Organization**: User story별로 독립 구현 및 검증이 가능하도록 구성한다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 서로 다른 파일을 수정하며 미완료 task에 의존하지 않아 병렬 실행 가능
- **[Story]**: User story phase task에만 사용 (`[US1]`, `[US2]`, `[US3]`)
- 모든 task는 실행 대상 file path를 포함한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: package identity 복구 작업을 검증할 공통 기준과 문서 entry point를 준비한다.

- [X] T001 Review current GitHub Packages identity assumptions and remediation scope in `specs/024-fix-package-publish/research.md`
- [X] T002 Add feature-specific release remediation outline in `README.md`
- [X] T003 [P] Prepare release verification entry updates for package identity checks in `scripts/verify-release-automation.mjs`
- [X] T004 [P] Identify workflow publish steps that need owner/scope preflight insertion in `.github/workflows/publish.yml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 user story가 공유하는 package identity, preflight category, verification 기준을 먼저 고정한다.

**CRITICAL**: 이 phase가 완료되기 전에는 개별 user story 구현을 시작하지 않는다.

- [X] T005 Define the canonical package owner/scope convention and allowed failure categories in `specs/024-fix-package-publish/contracts/package-publication.md`
- [X] T006 Add verification assertions for owner/scope compatibility and explicit `owner-scope-mismatch` reporting in `scripts/verify-release-automation.mjs`
- [X] T007 Add verification assertions for workspace package-name consistency in `scripts/verify-release-automation.mjs`
- [X] T008 Add workflow summary expectations for `owner-scope-mismatch` remediation output in `scripts/verify-release-automation.mjs`
- [X] T009 Update `.github/workflows/publish.yml` failure-category design to reserve a separate owner/scope mismatch path

**Checkpoint**: Foundation ready - user story implementation can now begin in priority order or in parallel where capacity allows.

---

## Phase 3: User Story 1 - UI package publish 복구 (Priority: P1) MVP

**Goal**: `packages/ui` publish가 GitHub Packages owner 규칙에 맞는 identity와 preflight 검증을 사용해 `E403 permission_denied` 없이 완료되도록 한다.

**Independent Test**: release 또는 guarded manual publish 실행 시 `packages/ui`가 publish되거나, misconfiguration이면 `npm publish` 전에 명시적 `owner-scope-mismatch`/`permission` category로 실패해야 한다.

### Tests for User Story 1

- [X] T010 [US1] Add failing verification coverage for `packages/ui` owner/scope compatibility in `scripts/verify-release-automation.mjs`
- [X] T011 [US1] Add failing verification coverage for `packages/ui` publish summary reason and failure category in `scripts/verify-release-automation.mjs`

### Implementation for User Story 1

- [X] T012 [US1] Update `packages/ui/package.json` package identity and publish metadata to match the approved GitHub Packages owner convention
- [X] T013 [US1] Update `packages/ui` owner/scope preflight checks and remediation messaging in `.github/workflows/publish.yml`
- [X] T014 [US1] Route `packages/ui` publish outcome through explicit `owner-scope-mismatch` vs `permission` categorization in `.github/workflows/publish.yml`
- [X] T015 [US1] Update `README.md` maintainer guidance for `packages/ui` publish remediation and retry flow

**Checkpoint**: User Story 1 is independently testable as the MVP fix for the current deployment blocker.

---

## Phase 4: User Story 2 - 실패 원인 조기 진단 (Priority: P2)

**Goal**: tokens/UI publish path 모두에서 credential, duplicate-version, permission, owner-scope mismatch를 publish 전에 구분해 actionable summary를 제공한다.

**Independent Test**: 각 publish path가 misconfiguration 상황에서 raw npm log 없이 단일 failure category와 remediation guidance를 summary에 남기면 된다.

### Tests for User Story 2

- [X] T016 [US2] Add failing verification coverage for tokens/UI preflight step presence in `.github/workflows/publish.yml` via `scripts/verify-release-automation.mjs`
- [X] T017 [US2] Add failing verification coverage for failure-category matrix and remediation text in `.github/workflows/publish.yml` via `scripts/verify-release-automation.mjs`

### Implementation for User Story 2

- [X] T018 [US2] Add shared owner/scope and package-linkage preflight logic for `packages/tokens` in `.github/workflows/publish.yml`
- [X] T019 [US2] Align `packages/ui` preflight logic and summary output with the shared diagnostic contract in `.github/workflows/publish.yml`
- [X] T020 [US2] Update `scripts/verify-release-automation.mjs` to assert preflight ordering, failure-category coverage, and remediation output
- [X] T021 [US2] Document failure-category meanings and maintainer decision tree in `README.md`

**Checkpoint**: User Story 2 is independently testable when publish failures are categorized before `npm publish` and summarized consistently.

---

## Phase 5: User Story 3 - workspace publication 일관성 유지 (Priority: P3)

**Goal**: package identity 조정이 필요할 때 `packages/tokens`, `packages/ui`, workspace dependency, workflow, verification script, release docs가 함께 일관되게 갱신된다.

**Independent Test**: package identity 변경 후 workspace dependency resolution, release verification, maintainer documentation이 동일 naming convention을 참조하면 된다.

### Tests for User Story 3

- [X] T022 [US3] Add failing verification coverage for `packages/tokens/package.json`, `packages/ui/package.json`, and workspace dependency name alignment in `scripts/verify-release-automation.mjs`
- [X] T023 [US3] Add failing verification coverage for README/workflow/package identity consistency in `scripts/verify-release-automation.mjs`

### Implementation for User Story 3

- [X] T024 [P] [US3] Update `packages/tokens/package.json` package identity and publish metadata to match the approved owner convention
- [X] T025 [US3] Update the `packages/ui` dependency reference to the tokens package name in `packages/ui/package.json`
- [X] T026 [US3] Align hard-coded package identity expectations in `scripts/verify-release-automation.mjs`
- [X] T027 [US3] Align package publish commands, filters, and package-name references in `.github/workflows/publish.yml`
- [X] T028 [US3] Update `README.md` release examples and validation commands for the final package identities

**Checkpoint**: All user stories are independently functional and the workspace uses one consistent publication identity model.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Multi-story cleanup, verification, and release-readiness confirmation.

- [X] T029 Review `specs/024-fix-package-publish/quickstart.md` against the implemented workflow and package identities
- [X] T030 Run `node scripts/verify-release-automation.mjs` and fix any release-policy regressions in `scripts/verify-release-automation.mjs`, `.github/workflows/publish.yml`, `packages/tokens/package.json`, `packages/ui/package.json`, and `README.md`
- [X] T031 Run targeted package validation commands for the final package identities and record any required command updates in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - MVP and current deploy blocker
- **User Story 2 (P2)**: Can start after Foundational; builds on the same workflow but remains independently testable through failure categorization
- **User Story 3 (P3)**: Can start after Foundational; should follow the chosen identity convention and keep workspace references aligned

### Within Each User Story

- Verification tasks MUST fail before implementation tasks are considered complete
- Package identity decisions before workflow summary updates
- Workflow preflight before publish-step categorization
- Documentation updates after behavior is finalized

### Parallel Opportunities

- `T003` and `T004` can run in parallel
- `T006`, `T007`, and `T008` can run in parallel
- `T024` can run in parallel with `T026` once the owner convention is decided
- README updates for distinct stories can be drafted in parallel but should be reconciled before final validation

---

## Parallel Example: User Story 1

```bash
# Launch verification tasks together:
Task: "Add failing verification coverage for packages/ui owner/scope compatibility in scripts/verify-release-automation.mjs"
Task: "Add failing verification coverage for packages/ui publish summary reason and failure category in scripts/verify-release-automation.mjs"

# Then implement workflow and manifest updates:
Task: "Update packages/ui/package.json package identity and publish metadata"
Task: "Update packages/ui owner/scope preflight checks and remediation messaging in .github/workflows/publish.yml"
```

---

## Parallel Example: User Story 3

```bash
# Once the final owner convention is chosen:
Task: "Update packages/tokens/package.json package identity and publish metadata"
Task: "Align hard-coded package identity expectations in scripts/verify-release-automation.mjs"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: confirm `packages/ui` publish succeeds or fails early with explicit owner/scope diagnostics
5. Deploy/demo the fixed publish path

### Incremental Delivery

1. Complete Setup + Foundational
2. Deliver User Story 1 to remove the immediate deploy blocker
3. Add User Story 2 to improve failure diagnostics for all publish paths
4. Add User Story 3 to keep tokens/UI/workspace/docs fully aligned
5. Finish Polish phase and rerun release verification

### Parallel Team Strategy

With multiple developers:

1. One developer finalizes the owner/scope convention and verification assertions
2. One developer updates workflow preflight and summary logic
3. One developer updates package manifests and maintainer documentation
4. Reconcile on final package identity before polish validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story remains independently completable and testable
- Avoid mixing identity renames and workflow diagnostics without updating verification in lockstep
