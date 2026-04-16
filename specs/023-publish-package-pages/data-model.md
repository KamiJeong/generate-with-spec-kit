# Data Model: 패키지 및 Storybook 자동 배포

## Entity: Release Event

**Description**: `main` 브랜치에서 승인된 package publication과 Storybook site publication을 요청하는 릴리스 트리거.

**Fields**:

- `source_branch`: 반드시 `main`
- `trigger_type`: release published 또는 maintainer-approved manual dispatch
- `version`: 대상 release version
- `actor`: release를 시작한 maintainer 또는 repository owner
- `requested_paths`: `packages/tokens`, `packages/ui`, `storybook` 중 하나 이상

**Relationships**:

- 하나의 Release Event는 0개 이상의 Package Publication과 0개 또는 1개의 Storybook Site Publication을 생성한다.
- 하나의 Release Event는 Publication Status를 생성한다.

**Validation Rules**:

- `source_branch`가 `main`이 아니면 publication state로 전이할 수 없다.
- `actor`는 package publish와 Pages deploy 권한을 가져야 한다.
- `version`은 각 target package의 package metadata와 일치해야 한다.

## Entity: Package Publication

**Description**: GitHub Packages npm registry에 게시되는 `packages/tokens` 또는 `packages/ui`의 private package version.

**Fields**:

- `package_path`: `packages/tokens` 또는 `packages/ui`
- `package_name`: package manifest의 scoped package name
- `version`: publish 대상 version
- `registry`: `https://npm.pkg.github.com`
- `visibility`: private
- `validation_status`: pending, passed, failed
- `publication_status`: pending, skipped, published, failed
- `failure_reason`: duplicate version, validation failure, permission failure, credential failure, registry unavailable 중 하나

**Relationships**:

- Release Event 하나에 속한다.
- Publication Credential을 사용한다.
- Publication Status에 path별 결과로 포함된다.

**Validation Rules**:

- `package_path`는 allowlist에 있는 두 package 중 하나여야 한다.
- 동일 `package_name` + `version`이 registry에 이미 있으면 publish하지 않고 duplicate로 보고한다.
- publish 전 lint/test/build gate가 통과해야 한다.
- package manifest는 publish를 허용하는 상태여야 하며, private visibility는 registry permission으로 통제한다.

## Entity: Storybook Site Publication

**Description**: `packages/ui` Storybook static build를 GitHub Pages에 배포한 결과.

**Fields**:

- `source_path`: `packages/ui`
- `artifact_path`: `packages/ui/storybook-static`
- `target`: GitHub Pages
- `validation_status`: pending, passed, failed
- `deployment_status`: pending, deployed, failed, skipped
- `page_url`: 배포 성공 시 제공되는 GitHub Pages URL
- `failure_reason`: build failure, storybook test failure, permission failure, pages unavailable 중 하나

**Relationships**:

- Release Event 하나에 속한다.
- Publication Credential을 사용한다.
- Publication Status에 Storybook 결과로 포함된다.

**Validation Rules**:

- `packages/ui build-storybook`이 성공해야 한다.
- Storybook test가 실행 가능한 환경에서는 Pages deploy 전에 통과해야 한다.
- deploy job이 실패하면 기존 published site를 유지해야 한다.

## Entity: Publication Credential

**Description**: package publish 또는 Pages deploy에 필요한 보호된 permission/token.

**Fields**:

- `credential_type`: `GITHUB_TOKEN`, repository secret, Pages OIDC permission
- `scope`: contents read, packages write, pages write, id-token write 등 필요한 최소 scope
- `consumer_job`: package publish 또는 Pages deploy job
- `exposure_state`: protected, leaked, missing, invalid

**Relationships**:

- Package Publication 또는 Storybook Site Publication에서 사용된다.

**Validation Rules**:

- credentials는 logs, artifacts, PR output에 출력되지 않아야 한다.
- PR/fork/non-main context에서는 publication credential을 사용하는 job이 실행되지 않아야 한다.

## Entity: Publication Status

**Description**: maintainer가 release 결과를 확인할 수 있는 path별 publication result.

**Fields**:

- `release_event_id`: Release Event 식별자
- `tokens_result`: skipped, published, failed
- `ui_result`: skipped, published, failed
- `storybook_result`: skipped, deployed, failed
- `partial_outcome`: true 또는 false
- `failure_categories`: validation, permission, credential, duplicate version, external service availability
- `rerun_guidance`: 실패 path만 재실행하기 위한 maintainer-facing guidance

**Relationships**:

- Release Event 하나에 속한다.
- 각 Package Publication과 Storybook Site Publication 결과를 집계한다.

**Validation Rules**:

- 세 publication path의 결과가 별도로 표시되어야 한다.
- 실패 시 적어도 하나의 failure category가 표시되어야 한다.
- 이미 성공한 package version은 rerun에서 재게시하지 않아야 한다.

## State Transitions

```text
requested
  -> validating
  -> blocked      # non-main, unauthorized, invalid credential
  -> publishing   # validation passed
  -> published/deployed
  -> failed
  -> skipped      # duplicate package version 또는 선택되지 않은 path
```

Partial outcome은 Package Publication 또는 Storybook Site Publication 중 일부만 성공하고 일부가 failed/skipped가 아닌 failure 상태일 때 true가 된다.
