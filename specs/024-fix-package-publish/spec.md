# Feature Specification: GitHub Packages Publish Permission Recovery

**Feature Branch**: `024-fix-package-publish`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "fix deploy error"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publish UI package successfully (Priority: P1)

릴리스 maintainer는 `packages/ui`를 GitHub Packages로 배포할 때 registry가 허용하는 package identity로 게시되어 `npm error code E403` 없이 publish가 완료되기를 원한다.

**Why this priority**: 현재 릴리스가 `@myorg/ui` publish 단계에서 차단되고 있어 패키지 배포 기능의 핵심 가치가 깨져 있다.

**Independent Test**: `main` 기준 release 또는 manual publish workflow를 실행했을 때 UI package publish가 성공하고 GitHub Packages에 새 버전이 표시되면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** repository owner와 package identity 구성이 GitHub Packages 규칙에 맞고 `packages: write` 권한이 있는 workflow가 실행될 때, **When** maintainer가 UI publish를 시작하면, **Then** `packages/ui`는 `permission_denied` 없이 게시된다.
2. **Given** `packages/ui`의 배포 대상 version이 아직 registry에 존재하지 않을 때, **When** publish workflow가 preflight 검증 후 publish를 수행하면, **Then** workflow는 `published` 상태와 게시된 version을 보고한다.

---

### User Story 2 - Fail early with actionable remediation (Priority: P2)

릴리스 maintainer는 package scope, owner, token permission, 또는 package access policy가 잘못된 경우 실제 `npm publish` 이후에야 모호한 403을 보는 대신, 원인을 바로 식별할 수 있는 오류를 받기를 원한다.

**Why this priority**: 현재 오류 메시지인 `The requested installation does not exist.`는 package scope/owner mismatch와 token permission 문제를 빠르게 구분하기 어렵다.

**Independent Test**: 의도적으로 owner/scope mismatch 또는 권한 부족 상태를 만들고 workflow를 실행했을 때, publish 전에 실패 카테고리와 수정 안내가 출력되면 검증된다.

**Acceptance Scenarios**:

1. **Given** package scope 또는 publish target owner가 GitHub Packages가 허용하지 않는 조합일 때, **When** workflow가 preflight를 수행하면, **Then** system은 `npm publish`를 건너뛰고 owner/scope mismatch remediation을 출력한다.
2. **Given** workflow token에 필요한 package publish 권한이 없을 때, **When** publish workflow가 실행되면, **Then** system은 권한 부족을 명시적으로 보고하고 재시도 전에 필요한 권한 조건을 안내한다.

---

### User Story 3 - Keep package publication consistent across workspace (Priority: P3)

repository owner는 `packages/tokens`와 `packages/ui`가 같은 publish policy를 따르고, package identity 조정이 필요하더라도 workspace dependency와 release documentation이 함께 일관되게 유지되기를 원한다.

**Why this priority**: UI package만 수정하면 `@myorg/tokens` 의존성과 release 문서가 drift를 일으킬 수 있다.

**Independent Test**: 관련 package metadata, workspace dependency, publish workflow, release documentation을 함께 검토했을 때 동일한 package identity/publish policy를 가리키면 검증된다.

**Acceptance Scenarios**:

1. **Given** package publication 정책이 변경되었을 때, **When** maintainer가 release 준비 상태를 확인하면, **Then** tokens/UI package metadata와 release guide는 동일한 registry identity 규칙을 설명한다.

---

### Edge Cases

- package version은 유효하지만 package scope가 현재 GitHub user/org owner와 맞지 않아 registry가 첫 publish 자체를 거부하는 경우.
- package는 이미 다른 owner namespace 또는 access policy로 생성되어 있어 현재 repository의 `GITHUB_TOKEN`이 admin/write 권한을 갖지 못하는 경우.
- `workflow_dispatch`가 `main` 이외의 ref에서 실행되거나 fork repository에서 실행되어 publish가 허용되지 않는 경우.
- duplicate version, credential 누락, scope/owner mismatch가 모두 publish 실패 원인이 될 수 있어 실패 분류가 서로 섞이지 않아야 하는 경우.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST validate before `npm publish` that each package's publish identity is compatible with the target GitHub Packages owner for this repository.
- **FR-002**: System MUST ensure `packages/ui` publication uses a package name/scope and registry ownership configuration that GitHub Packages accepts for the publishing repository and token.
- **FR-003**: System MUST fail before attempting publish when package scope, owner linkage, or package access policy would cause `403 Forbidden` publication errors, and MUST emit remediation guidance that identifies the mismatch category.
- **FR-004**: System MUST preserve valid workspace dependency resolution between `packages/ui` and `packages/tokens` after any package identity or publish metadata adjustment.
- **FR-005**: System MUST classify publish outcomes into at least `published`, `duplicate-version`, `credential`, `permission`, and `owner-scope-mismatch` (or equivalent explicit category) so maintainers can distinguish root causes.
- **FR-006**: System MUST document the required GitHub owner/package scope convention and the minimum token/repository permissions needed for successful package publication.
- **FR-007**: System MUST keep manual publish and release-triggered publish behavior consistent so the same package identity checks run in both paths.

### Key Entities *(include if feature involves data)*

- **Package Publish Identity**: GitHub Packages publication target for a workspace package, including package name, scope, registry URL, repository owner linkage, and required permission boundary.
- **Publication Preflight Result**: Deterministic validation output that records whether publication can proceed and, if not, the explicit failure category plus remediation guidance.
- **Workspace Package Mapping**: Relationship between `packages/ui`, `packages/tokens`, their internal dependency names, and the publish-facing package identity used by release automation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A release or manual publish run for `packages/ui` completes without `E403 permission_denied` when repository owner/package identity are configured as documented.
- **SC-002**: A misconfigured owner/scope or insufficient package permission is detected before `npm publish` and reported with an explicit remediation message in under 1 minute of job runtime.
- **SC-003**: 100% of package publish runs end with a single explicit outcome category that maintainers can use without inspecting raw npm debug logs.
- **SC-004**: A maintainer can follow the release documentation to verify required scope/permission setup and complete a successful retry in under 10 minutes.

## Assumptions

- 현재 deploy error의 직접 원인은 GitHub Packages owner/package scope alignment 또는 package access permission mismatch이며, 단순 네트워크 장애는 아니다.
- publish registry는 계속 `https://npm.pkg.github.com`을 사용하고, 외부 npm registry로 전환하는 것은 이번 범위에 포함되지 않는다.
- 기존 `packages/tokens`와 `packages/ui` publish automation은 유지하되, package identity와 preflight validation은 함께 조정될 수 있다.
- Storybook Pages deployment 자체는 이번 문제의 1차 원인이 아니며, package publication 안정화가 우선 범위다.
