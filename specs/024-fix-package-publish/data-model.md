# Data Model: GitHub Packages Publish Permission Recovery

## 1. Package Publish Identity

**Description**: GitHub Packages에 게시되는 workspace package의 publish-facing identity와 ownership 규칙을 표현한다.

### Fields

- `package_path`: `packages/tokens` 또는 `packages/ui`
- `manifest_name`: package.json의 `name`
- `registry_url`: `https://npm.pkg.github.com`
- `publish_scope`: scoped package의 namespace (`@owner` 또는 `@org`)
- `repository_owner`: GitHub repository owner (`kamijeong` 또는 organization)
- `repository_name`: source repository name
- `access_level`: `restricted` 등 publish access mode
- `linked_repository`: GitHub Packages package가 연결되어야 하는 repository identifier
- `token_source`: `GITHUB_TOKEN` 또는 승인된 대체 credential

### Validation Rules

- `manifest_name`은 scoped package 이름이어야 한다.
- `publish_scope`는 publish를 수행하는 GitHub owner namespace와 호환되어야 한다.
- `registry_url`은 `https://npm.pkg.github.com` 이어야 한다.
- `access_level`은 private publication 정책과 일치해야 한다.
- `linked_repository`는 publish workflow가 실행되는 repository와 일치하거나 GitHub Packages가 허용하는 연결 상태여야 한다.

### State Transitions

- `unverified` → `validated`: owner/scope, registry, permissions preflight 통과
- `validated` → `published`: duplicate version이 아니고 publish 성공
- `validated` → `blocked`: owner mismatch, permission mismatch, duplicate version 등으로 publish 중단

## 2. Publication Preflight Result

**Description**: 실제 `npm publish` 전에 계산되는 deterministic validation 결과다.

### Fields

- `package_name`: publish 대상 package identity
- `version`: publish 대상 version
- `credential_present`: token availability 여부
- `owner_scope_valid`: owner/scope compatibility 여부
- `repository_link_valid`: package ownership linkage 여부
- `version_available`: 동일 version의 registry 미존재 여부
- `failure_category`: `none`, `credential`, `duplicate-version`, `permission`, `owner-scope-mismatch`, `external-service`
- `remediation_message`: maintainer에게 출력할 수정 가이드
- `can_publish`: publish 진행 가능 여부

### Validation Rules

- `can_publish`는 모든 required preflight가 통과했을 때만 true다.
- `failure_category`는 단일 값이어야 하며 복수 원인을 동시에 보고하지 않는다.
- `remediation_message`는 `can_publish=false`일 때 필수다.

### State Transitions

- `pending` → `pass`: 모든 preflight 통과
- `pending` → `fail`: first blocking condition 발견
- `fail` → `rerun-ready`: maintainer가 remediation을 적용한 뒤 재검증 가능 상태

## 3. Workspace Package Mapping

**Description**: workspace 내부 dependency와 publish-facing package identity 간의 매핑을 표현한다.

### Fields

- `consumer_package`: 예: `packages/ui`
- `dependency_name`: 예: tokens package dependency name
- `dependency_source`: `workspace:*`
- `publish_name`: dependency package의 publish-facing manifest name
- `verification_targets`: workflow, verification script, README 등 함께 갱신해야 할 target list

### Validation Rules

- workspace dependency 이름은 dependency package의 `manifest_name`과 일치해야 한다.
- package identity가 변경되면 `verification_targets` 전부가 동일 naming convention으로 갱신되어야 한다.
- `packages/ui`는 publish 전 `packages/tokens` build 또는 availability 조건을 만족해야 한다.
