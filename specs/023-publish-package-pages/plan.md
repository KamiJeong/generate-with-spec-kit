# Implementation Plan: 패키지 및 Storybook 자동 배포

**Branch**: `023-publish-package-pages` | **Date**: 2026-04-16 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/023-publish-package-pages/spec.md`

## Summary

`main` 브랜치에서 승인된 릴리스 이벤트가 발생하면 `packages/tokens`와 `packages/ui`를 GitHub Packages npm registry에 private package로 게시하고, `packages/ui` Storybook static build를 GitHub Pages에 배포한다. 구현은 기존 pnpm/Turbo/TypeScript monorepo 구조를 유지하면서 GitHub Actions workflow와 package publication metadata, maintainer 문서를 추가하는 방식으로 진행한다.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20, pnpm 10  
**Primary Dependencies**: GitHub Actions, GitHub Packages npm registry, GitHub Pages, Turbo 2.5, tsup 8, Vitest 3, Storybook 10.3.4  
**Storage**: N/A - persistent storage 변경 없음. 배포 산출물은 GitHub Packages와 GitHub Pages artifacts에 저장됨  
**Testing**: `pnpm --filter @myorg/tokens lint`, `pnpm --filter @myorg/tokens test`, `pnpm --filter @myorg/tokens build`, `pnpm --filter @myorg/ui lint`, `pnpm --filter @myorg/ui test`, `pnpm --filter @myorg/ui build`, `pnpm --filter @myorg/ui build-storybook`, `pnpm --filter @myorg/ui test-storybook`  
**Target Platform**: GitHub Actions `ubuntu-latest`, GitHub Packages npm registry, GitHub Pages  
**Project Type**: Monorepo package release automation + static Storybook documentation deployment  
**Performance Goals**: 일반적인 package release는 시작 후 10분 이내 상태 확인 가능, Storybook Pages 배포 완료 후 5분 이내 접근 가능  
**Constraints**: 배포는 `main` 브랜치에서만 수행, fork/pull_request/non-main에서는 게시 금지, credentials는 logs/artifacts에 노출 금지, 기존 package source와 Storybook content 변경 금지  
**Scale/Scope**: 대상 package 2개(`packages/tokens`, `packages/ui`)와 Storybook site 1개(`packages/ui/storybook-static`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. 코드 품질**: PASS - workflow는 단일 책임 job으로 분리하고 중복 publish 로직은 matrix 또는 재사용 가능한 step 구조로 제한한다.
- **II. 테스트 표준**: PASS - 구현 전 workflow 검증 기준을 tasks에서 먼저 정의하고, 기존 lint/test/build/storybook gates를 publication 전에 실행한다.
- **III. 사용자 경험 일관성**: PASS - UI source나 design system을 변경하지 않으며, Storybook 배포 전 기존 Storybook build/test path를 유지한다.
- **IV. 성능 요구사항**: PASS - 배포 시간 목표는 spec의 10분/5분 기준으로 추적하고, 기존 CI/build 성능 회귀를 막기 위해 release workflow에서 검증 gates를 유지한다.
- **V. 단순성**: PASS - 새로운 runtime dependency 없이 GitHub Actions의 표준 Pages/Packages actions와 기존 pnpm scripts를 사용한다.
- **기술 스택 및 의존성 제약사항**: PASS - secrets는 GitHub Actions permissions/GITHUB_TOKEN 또는 scoped secret으로 주입하며 코드에 하드코딩하지 않는다.
- **개발 워크플로우 및 품질 게이트**: PASS - feature branch에서 계획/구현 후 PR gate를 통과하고, 실제 publish는 `main`에서만 허용한다.
- **문서 언어 정책**: PASS - 이 feature의 Speckit 문서는 한국어로 작성하고 기술 고유명사는 영어로 유지한다.

## Project Structure

### Documentation (this feature)

```text
specs/023-publish-package-pages/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── release-workflow.md
├── checklists/
│   └── requirements.md
└── tasks.md              # /speckit.tasks 단계에서 생성
```

### Source Code (repository root)

```text
.github/
└── workflows/
    ├── ci.yml
    ├── storybook-test.yml
    └── publish.yml        # 신규 또는 equivalent release workflow

packages/
├── tokens/
│   ├── package.json       # publish metadata 검증/조정
│   ├── src/
│   ├── tests/
│   └── tsup.config.ts
└── ui/
    ├── package.json       # publish metadata 검증/조정
    ├── src/
    ├── tests/
    ├── .storybook/
    └── tsup.config.ts

README.md                 # maintainer release guidance 추가 위치
```

**Structure Decision**: 기존 monorepo 구조와 `.github/workflows` 위치를 유지한다. 별도 app/service를 만들지 않고 release workflow, package metadata, documentation만 추가한다.

## Phase 0: Research

`research.md`에 GitHub Packages npm publication, GitHub Pages custom workflow, credential/permissions, package manifest readiness 결정을 정리했다. 미해결 clarification 항목은 남기지 않았다.

## Phase 1: Design & Contracts

- `data-model.md`: Release Event, Package Publication, Storybook Site Publication, Publication Credential, Publication Status의 fields, relationships, validation rules, state transitions를 정의했다.
- `contracts/release-workflow.md`: maintainer-facing workflow trigger, required permissions, gates, outputs, rerun contract를 정의했다.
- `quickstart.md`: 구현 후 검증 절차와 maintainer release checklist를 정의했다.

## Constitution Check (Post-Design)

- **I. 코드 품질**: PASS - design은 workflow 책임을 package publication, Storybook Pages deployment, status reporting으로 분리한다.
- **II. 테스트 표준**: PASS - quickstart와 contract에 publish 전 lint/test/build/storybook 검증을 필수 gate로 명시했다.
- **III. 사용자 경험 일관성**: PASS - Storybook content 자체는 변경하지 않고 기존 UI 문서 빌드 산출물을 배포한다.
- **IV. 성능 요구사항**: PASS - spec success criteria와 quickstart validation이 10분/5분 목표를 검증한다.
- **V. 단순성**: PASS - GitHub Actions 표준 기능과 기존 package scripts만 사용하며 별도 서비스나 신규 dependency를 추가하지 않는다.
- **기술 스택 및 의존성 제약사항**: PASS - secrets/permissions는 workflow permission boundary로 제한하고 manifest metadata만 필요한 범위에서 조정한다.
- **개발 워크플로우 및 품질 게이트**: PASS - PR validation과 `main` publish boundary가 분리되어 있다.
- **문서 언어 정책**: PASS - 생성된 Speckit design artifacts는 한국어로 작성했다.

## Complexity Tracking

해당 없음. 추가 서비스, 데이터베이스, 신규 runtime dependency, 복잡한 architecture layer를 도입하지 않는다.
