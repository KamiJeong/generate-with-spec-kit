# Implementation Plan: GitHub Packages Publish Permission Recovery

**Branch**: `024-fix-package-publish` | **Date**: 2026-04-16 | **Spec**: `/specs/024-fix-package-publish/spec.md`
**Input**: Feature specification from `/specs/024-fix-package-publish/spec.md`

**Note**: This plan is produced with a manual fallback because the repository planning scripts depend on PowerShell, which is unavailable in this environment.

## Summary

GitHub Packages publish failure를 해결하기 위해 `packages/ui`와 필요 시 `packages/tokens`의 package identity를 repository owner 규칙에 맞게 정렬하고, release workflow에 owner/scope preflight validation 및 더 구체적인 failure categorization을 추가한다. 구현은 기존 monorepo와 GitHub Actions 기반 배포 구조를 유지하면서 package metadata, release verification script, workflow summary, maintainer 문서를 함께 조정하는 방식으로 진행한다.

## Technical Context

**Language/Version**: Node.js 20, TypeScript 5.x, YAML for GitHub Actions  
**Primary Dependencies**: pnpm 10, Turbo 2.5, GitHub Actions, GitHub Packages npm registry, tsup 8, Vitest 3  
**Storage**: N/A - persistent application storage 없음, publication metadata는 package manifest와 workflow config에 존재  
**Testing**: `pnpm --filter @myorg/tokens build`, `pnpm --filter @myorg/ui lint`, `pnpm --filter @myorg/ui test`, `pnpm --filter @myorg/ui build`, `node scripts/verify-release-automation.mjs`  
**Target Platform**: GitHub Actions `ubuntu-latest`, GitHub Packages npm registry  
**Project Type**: Monorepo library + release automation  
**Performance Goals**: publish preflight misconfiguration은 1분 이내에 실패를 분류하고, maintainer가 10분 이내에 재시도 가능해야 한다  
**Constraints**: GitHub Packages owner/package scope 규칙 준수, `main` branch publish boundary 유지, credential 값 비노출, 기존 Storybook deploy behavior 비회귀  
**Scale/Scope**: workspace package 2개(`packages/tokens`, `packages/ui`)와 release workflow 1개, release verification script 1개, maintainer docs 업데이트

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. 코드 품질**: PASS - 변경 범위를 package metadata, publish preflight, verification script, release docs로 제한하고 각 책임을 분리한다.
- **II. 테스트 표준**: PASS - 구현 전에 release verification과 publish preflight 경로를 명시하고, 기존 lint/test/build gates를 유지한다.
- **III. 사용자 경험 일관성**: PASS - 사용자-facing UI는 변경하지 않으며, maintainer-facing failure message와 rerun guidance 일관성만 강화한다.
- **IV. 성능 요구사항**: PASS - spec의 1분 preflight, 10분 recovery 목표를 workflow 및 quickstart 검증 절차에 반영한다.
- **V. 단순성**: PASS - 외부 서비스 추가 없이 기존 GitHub Actions, package manifest, verification script만 조정한다.
- **기술 스택 및 의존성 제약사항**: PASS - 신규 runtime dependency 없이 기존 npm/GitHub tooling만 사용한다.
- **개발 워크플로우 및 품질 게이트**: PASS - `main` publish boundary와 최소 permissions 원칙을 유지하고, PR 단계에서는 검증만 수행한다.
- **문서 언어 정책**: PASS - Speckit planning artifacts는 한국어로 작성하고 기술 고유명사는 영어로 유지한다.

## Project Structure

### Documentation (this feature)

```text
specs/024-fix-package-publish/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── package-publication.md
└── tasks.md
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── publish.yml              # package publish preflight / failure categorization 조정

packages/
├── tokens/
│   └── package.json             # package identity / publish metadata alignment 검토
└── ui/
    └── package.json             # package identity / publish metadata alignment 검토

scripts/
└── verify-release-automation.mjs # release policy assertions update

README.md                        # maintainer release guidance / owner-scope rules 반영
```

**Structure Decision**: 기존 monorepo와 release automation 파일 배치를 유지한다. 새 서비스나 별도 app을 만들지 않고 package metadata, workflow, verification script, maintainer documentation만 조정한다.

## Phase 0: Research

`research.md`에서 GitHub Packages npm owner/scope 요구사항, `GITHUB_TOKEN` publish permission boundary, workspace package rename 영향 범위를 정리한다. 모든 technical unknown은 Phase 0에서 해소한다.

## Phase 1: Design & Contracts

- `data-model.md`: Package Publish Identity, Publication Preflight Result, Workspace Package Mapping의 fields, validation rules, state transitions를 정의한다.
- `contracts/package-publication.md`: package identity, preflight behavior, failure categories, workflow summary contract를 maintainer-facing contract로 정의한다.
- `quickstart.md`: maintainer가 owner/scope 설정을 검토하고 local verification 및 release retry를 수행하는 절차를 정리한다.
- Agent context update script는 PowerShell 부재로 실행하지 못했으므로 구현 단계에서 수동 동기화 필요 여부를 다시 확인한다.

## Constitution Check (Post-Design)

- **I. 코드 품질**: PASS - 설계는 package identity normalization, preflight validation, documentation guidance를 분리해 중복 로직을 줄인다.
- **II. 테스트 표준**: PASS - verification script와 workflow preflight를 통해 구현 전후 검증 포인트를 명시한다.
- **III. 사용자 경험 일관성**: PASS - maintainer가 duplicate-version, credential, permission, owner-scope-mismatch를 일관된 summary key로 확인하게 한다.
- **IV. 성능 요구사항**: PASS - 빠른 preflight 실패와 재시도 가이드를 quickstart 및 contract에 반영한다.
- **V. 단순성**: PASS - GitHub Packages 사용을 유지하고 registry migration이나 추가 secret 체계를 도입하지 않는다.
- **기술 스택 및 의존성 제약사항**: PASS - 기존 Node/pnpm/GitHub Actions 경로 안에서 해결한다.
- **개발 워크플로우 및 품질 게이트**: PASS - publish trigger boundary와 최소 권한 원칙이 유지된다.
- **문서 언어 정책**: PASS - 생성된 design artifacts는 한국어 기준을 따른다.

## Complexity Tracking

해당 없음. package identity와 release preflight를 다루는 구성 변경만 포함하며 추가 서비스, 데이터 저장소, 신규 runtime layer를 도입하지 않는다.
