# Feature Specification: 패키지 및 Storybook 자동 배포

**Feature Branch**: `023-publish-package-pages`  
**Created**: 2026-04-16  
**Status**: Draft  
**Input**: User description: "github actions for deploy package on github npm private package, and deployt on github pages"

## Clarifications

### Session 2026-04-16

- Q: 패키지 및 사이트 배포를 허용할 브랜치는 무엇인가? → A: `main` 브랜치
- Q: 배포 대상 패키지와 호스팅 사이트 범위는 무엇인가? → A: `packages/tokens`, `packages/ui`, `packages/ui` Storybook on GitHub Pages

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 비공개 패키지 릴리스 배포 (Priority: P1)

Maintainer는 수동 배포 없이 승인된 릴리스 이벤트로 `packages/tokens`와 `packages/ui` 패키지를 private npm package registry에 게시하여 소비자가 최신 승인 버전을 설치할 수 있기를 원한다.

**Why this priority**: tokens와 UI 패키지의 비공개 배포가 핵심 릴리스 결과이며, 이 경로가 안정적이어야 Storybook 배포도 의미가 있다.

**Independent Test**: 유효한 `packages/tokens`와 `packages/ui` 버전에 대해 승인된 릴리스 이벤트를 생성하고, private package registry에 해당 버전이 제한된 가시성으로 존재하는지 확인하여 독립적으로 검증할 수 있다.

**Acceptance Scenarios**:

1. **Given** `packages/tokens`와 `packages/ui`가 `main` 브랜치에서 릴리스 준비가 되었고 릴리스 행위자가 권한을 보유한 상태에서, **When** 릴리스 배포가 시작되면, **Then** 정확한 패키지 버전들이 private registry에 게시되고 허용된 소비자만 접근할 수 있다.
2. **Given** 대상 패키지 버전이 이미 private registry에 존재하는 상태에서, **When** 동일한 패키지 버전 게시가 요청되면, **Then** 시스템은 해당 패키지의 중복 게시를 차단하고 버전 충돌을 명확히 보고한다.
3. **Given** 대상 패키지 중 하나의 검증이 게시 전에 실패한 상태에서, **When** 릴리스 배포가 실행되면, **Then** 유효하지 않은 패키지는 게시되지 않고 maintainer는 어떤 패키지 검증 게이트가 실패했는지 확인할 수 있다.

---

### User Story 2 - UI Storybook 사이트 배포 (Priority: P2)

Maintainer는 `packages/ui` Storybook 콘텐츠가 준비되면 GitHub Pages에 자동 게시하여 사용자가 최신 승인 UI 문서와 컴포넌트 가이드를 볼 수 있기를 원한다.

**Why this priority**: Storybook 배포는 UI 문서와 컴포넌트 가이드를 사용자에게 제공하지만, `packages/ui`가 유효한 Storybook 콘텐츠를 생성할 수 있어야 한다.

**Independent Test**: 유효한 `packages/ui` Storybook 콘텐츠에 대해 사이트 배포를 트리거하고, GitHub Pages 사이트가 기대한 Storybook 릴리스 콘텐츠를 제공하는지 확인하여 독립적으로 검증할 수 있다.

**Acceptance Scenarios**:

1. **Given** 유효한 `packages/ui` Storybook 콘텐츠가 `main` 브랜치에 있고 게시 행위자가 권한을 보유한 상태에서, **When** 사이트 배포가 완료되면, **Then** GitHub Pages 사이트는 최신 승인 Storybook 콘텐츠를 제공한다.
2. **Given** Storybook 생성 또는 검증이 실패한 상태에서, **When** 사이트 배포가 실행되면, **Then** 기존 게시 Storybook 사이트는 변경되지 않고 maintainer는 명확한 실패 사유를 받는다.
3. **Given** 패키지 배포는 성공했지만 Storybook 배포가 실패한 상태에서, **When** 릴리스 상태를 검토하면, **Then** maintainer는 부분 성공 결과를 식별하고 실패한 배포 경로만 다시 실행할 수 있다.

---

### User Story 3 - 배포 접근 제어 및 실패 진단 (Priority: P3)

Repository owner는 배포 credentials, permissions, 릴리스 상태가 보호되고 확인 가능하여 private assets가 노출되지 않고 maintainers가 실패를 빠르게 해결할 수 있기를 원한다.

**Why this priority**: 배포 자동화는 private assets와 public content 접근을 변경하므로, guardrail과 진단 정보가 운영 및 보안 리스크를 줄인다.

**Independent Test**: 권한 없는 컨텍스트에서 배포를 시도하고, credentials 또는 permissions 누락을 시뮬레이션한 뒤 배포가 차단되고 실행 가능한 진단 정보가 제공되는지 확인하여 독립적으로 검증할 수 있다.

**Acceptance Scenarios**:

1. **Given** non-main 브랜치, 권한 없는 pull request, 또는 fork가 배포를 시도하는 상태에서, **When** 자동화가 실행되면, **Then** 대상 패키지와 Storybook 사이트 배포는 credentials 노출 없이 건너뛰거나 차단된다.
2. **Given** 필요한 publication credentials가 없거나 유효하지 않은 상태에서, **When** 배포가 요청되면, **Then** 시스템은 게시 전에 실패하고 누락 또는 무효 credential 범주를 식별한다.
3. **Given** 배포 시도가 완료된 상태에서, **When** maintainer가 릴리스 상태를 검토하면, **Then** `packages/tokens`, `packages/ui`, Storybook 배포 각각의 성공 여부를 확인할 수 있다.

---

### Edge Cases

- `packages/tokens` 또는 `packages/ui` 패키지 버전이 이미 private registry에 존재한다.
- 릴리스 행위자에게 대상 패키지 게시 또는 Storybook 사이트 업데이트 권한이 없다.
- 필요한 publication credentials가 누락, 만료, 또는 잘못된 scope로 설정되어 있다.
- 대상 패키지 중 하나가 준비된 뒤 게시 전에 검증이 실패한다.
- `packages/ui` Storybook 콘텐츠가 없거나 비어 있거나 검증에 실패한다.
- Public Storybook 사이트 배포는 성공했지만 private package 배포가 실패하거나, 그 반대가 발생한다.
- `main` 이외의 브랜치에서 배포가 시도된다.
- fork 또는 승인되지 않은 pull request 같은 untrusted context에서 배포가 트리거된다.
- Registry 또는 hosting service가 배포 중 일시적으로 사용할 수 없다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 시스템은 `main` 브랜치에서 `packages/tokens`와 `packages/ui`를 configured private npm package registry에 게시하는 승인된 릴리스 workflow를 제공해야 한다.
- **FR-002**: 시스템은 명시적으로 승인된 `packages/tokens`와 `packages/ui` 버전만 게시해야 하며, 각 패키지의 이미 게시된 버전에 대한 중복 게시를 방지해야 한다.
- **FR-003**: 시스템은 두 대상 패키지를 private 상태로 유지하여 허용된 소비자만 게시 버전에 접근할 수 있게 해야 한다.
- **FR-004**: 시스템은 게시 전에 `packages/tokens`와 `packages/ui`를 검증해야 하며, 특정 패키지 검증이 실패하면 해당 패키지 게시를 중단해야 한다.
- **FR-005**: 시스템은 `main` 브랜치에서 승인된 `packages/ui` Storybook 콘텐츠를 GitHub Pages에 배포하는 승인된 site publication workflow를 제공해야 한다.
- **FR-006**: 시스템은 게시 전에 `packages/ui` Storybook 콘텐츠를 검증해야 하며, 검증 실패 시 현재 게시된 Storybook 사이트를 보존해야 한다.
- **FR-007**: 시스템은 non-main 브랜치, 권한 없는 이벤트, untrusted event에서 대상 패키지와 Storybook 사이트 게시를 방지해야 한다.
- **FR-008**: 시스템은 logs, pull request output, publicly visible artifacts에서 publication credentials가 노출되지 않도록 보호해야 한다.
- **FR-009**: 시스템은 `packages/tokens` publication, `packages/ui` publication, Storybook site publication 결과를 별도로 보고하는 릴리스 상태를 제공해야 한다.
- **FR-010**: 시스템은 validation failure, missing permission, missing credential, duplicate version, unavailable external service에 대해 명확한 실패 메시지를 제공해야 한다.
- **FR-011**: Maintainers는 성공한 `packages/tokens` 또는 `packages/ui` 버전을 불필요하게 다시 게시하지 않고 실패한 publication path만 다시 실행할 수 있어야 한다.
- **FR-012**: 시스템은 릴리스 trigger, required permissions, required credentials, expected publication outcomes를 maintainer 문서로 제공해야 한다.

### Key Entities

- **Release Event**: `main` 브랜치에서 `packages/tokens` publication, `packages/ui` publication, `packages/ui` Storybook publication, 또는 이 조합을 요청하는 승인된 action.
- **Package Publication**: `packages/tokens` 또는 `packages/ui`의 private published version으로, package identity, version identity, publication status, visibility, consumer access expectations를 포함한다.
- **Storybook Site Publication**: `packages/ui` Storybook의 hosted update로, source content identity, publication status, visible hosted content를 포함한다.
- **Publication Credential**: private target packages 또는 hosted Storybook content 게시에 필요한 보호된 permission 또는 token.
- **Publication Status**: 각 target package와 Storybook site에 대한 success, failure, skipped paths, partial outcomes, failure reasons를 포함하는 maintainer-facing release result.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Maintainers는 일반적인 패키지 변경에 대해 릴리스 프로세스 시작 후 10분 이내에 `packages/tokens`와 `packages/ui`의 승인된 게시 성공 또는 실패 상태를 확인할 수 있다.
- **SC-002**: 권한 없거나 untrusted context에서 발생한 배포 시도 100%는 private credentials 또는 artifacts 노출 없이 차단된다.
- **SC-003**: Storybook 사이트 게시 성공 후 사용자는 5분 이내에 업데이트된 hosted `packages/ui` Storybook 콘텐츠에 접근할 수 있다.
- **SC-004**: 실패한 배포 시도의 95% 이상은 validation, permission, credential, duplicate version, external service availability 중 실패 범주를 식별한다.
- **SC-005**: Repository 접근 권한이 있는 maintainer는 15분 이내에 필요한 release trigger와 credentials를 프로젝트 문서에서 식별할 수 있다.

## Assumptions

- Private package targets는 `packages/tokens`와 `packages/ui`이다.
- GitHub Pages는 `packages/ui` Storybook site의 hosted destination이다.
- Target package publication과 Storybook site publication은 릴리스 이벤트에서 함께 실행될 수 있지만, 각 publication path는 독립적으로 상태를 보고해야 한다.
- Publishing actions는 `main` 브랜치에서만 동작해야 하며, feature branches와 pull requests는 readiness validation만 수행하고 게시하지 않아야 한다.
- 계획 단계에서 별도 gap이 발견되지 않는 한 기존 project validation gates를 재사용한다.
- Publication은 maintainers와 repository owners를 위한 기능이며, 일반 contributors 또는 anonymous users를 위한 기능이 아니다.
- 이 feature는 publishing automation과 maintainer guidance를 다루며, package source code, Storybook content, consumer onboarding flow는 변경하지 않는다.
