# 구현 계획: Storybook 현대적 레이아웃 스토리 확장

**Branch**: `010-storybook-layout-stories` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-storybook-layout-stories/spec.md`

## 요약

`packages/ui`의 Storybook에 현대적 전체 페이지 레이아웃 스토리 4개를 추가한다. 신규 스토리는 `Page/Layouts/*` 그룹 아래에서 노출되며, 메인 브랜드 사이트, 전환 중심 제품 랜딩, 문서/리소스 허브, 요금제/비교 페이지를 개발자 도구 및 생산성 제품 맥락으로 표현한다. 구현은 기존 `packages/ui` 컴포넌트와 semantic token만 조합해 수행하고, 각 스토리는 단일 기본 variant로 모바일과 데스크톱 모두에 적응해야 한다.

## Technical Context

**Language/Version**: TypeScript 5.8.x  
**Primary Dependencies**: React 19 type stack, Storybook 10.3.4 (`@storybook/react-vite`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-vitest`), Tailwind CSS 4.1, `@myorg/ui`, `@myorg/tokens`, `lucide-react`  
**Storage**: N/A (정적 Storybook 스토리 파일)  
**Testing**: `pnpm --filter @myorg/ui lint`, `pnpm --filter @myorg/ui build-storybook`, 기존 `pnpm --filter @myorg/ui test` 회귀 확인, Storybook toolbar 기반 수동 viewport/theme 검토  
**Target Platform**: `packages/ui` Storybook 브라우저 환경 (`packages/ui/.storybook`)  
**Project Type**: UI component library documentation  
**Performance Goals**: 신규 스토리 4개가 Storybook 빌드와 런타임 에러 없이 렌더링되고, 기본 viewport 세트(Desktop 1280 / Tablet 768 / Mobile 375)에서 주요 섹션이 읽기 가능해야 함  
**Constraints**: `Page/Layouts/*` 그룹 사용, 기존 `packages/ui` 컴포넌트와 현재 semantic token만 사용, 별도 dark/mobile 전용 story variant 금지, 외부 데이터/라우팅 의존성 금지, 한국어 speckit 문서 유지  
**Scale/Scope**: 신규 레이아웃 스토리 4개 추가, Storybook 카피/더미 데이터 각 파일별 독립 관리, Storybook 설정 변경은 불필요하거나 최소화

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### 초기 게이트

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 (Code Quality) | ✅ PASS | 파일 단위로 책임이 분리된 정적 스토리 구성이다. 공통 패턴은 Storybook meta와 의미 있는 데이터 배열 수준으로 제한하고, 3회 이상 반복 전에는 별도 추상화를 만들지 않는다. |
| II. 테스트 표준 (Testing Standards) | ✅ PASS | 신규 기능은 비즈니스 로직 추가가 아닌 정적 레이아웃 문서화다. TDD형 단위 테스트 대상은 없으며, lint/build-storybook/기존 테스트 회귀 확인으로 품질 게이트를 수행한다. |
| III. 사용자 경험 일관성 (UX Consistency) | ✅ PASS | `DESIGN.md`를 기준으로 semantic token, 기존 UI 컴포넌트, Storybook theme/viewport 패턴을 그대로 따른다. |
| IV. 성능 요구사항 (Performance Requirements) | ✅ PASS | 정적 Storybook 문서 기능으로 API/DB 성능 이슈는 없다. 대신 Storybook 렌더링 오류와 viewport 파손이 없는 상태를 기능 성능 기준으로 본다. |
| V. 단순성 (Simplicity) | ✅ PASS | 신규 외부 의존성, 신규 재사용 UI 컴포넌트, 신규 토큰을 추가하지 않는다. 스토리 파일 4개만 추가하는 가장 단순한 확장 경로다. |

**초기 게이트 결과**: 모든 헌법 원칙 통과. Phase 0 조사 진행 가능.

### Phase 1 설계 후 재검토

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 (Code Quality) | ✅ PASS | 물리적 위치를 `packages/ui/src/stories/layouts/`로 분리하여 기존 utilitarian page stories와 신규 layout stories의 책임을 구분했다. |
| II. 테스트 표준 (Testing Standards) | ✅ PASS | 자동 검증은 `lint`, `build-storybook`, 기존 `test` 회귀 확인으로 유지하고, 신규 수동 검증 절차를 `quickstart.md`에 명시했다. |
| III. 사용자 경험 일관성 (UX Consistency) | ✅ PASS | 모든 레이아웃은 preview의 global theme/viewport 도구를 활용하고, dark mode를 동일 스토리 안에서 품질 기준으로 검증한다. |
| IV. 성능 요구사항 (Performance Requirements) | ✅ PASS | Storybook preview가 이미 desktop/tablet/mobile viewport를 제공하므로 별도 복잡한 런타임 기법 없이 요구를 검증할 수 있다. |
| V. 단순성 (Simplicity) | ✅ PASS | 계약 문서는 Storybook story meta/title/export 규칙 하나로 제한했다. 구현 범위를 넓히는 추가 helper/component 설계는 의도적으로 배제했다. |

**재검토 결과**: Phase 1 설계 산출물까지 포함해도 헌법 위반 없음. Complexity Tracking 불필요.

## Project Structure

### Documentation (this feature)

```text
specs/010-storybook-layout-stories/
├── plan.md                             # 이 파일
├── research.md                         # Phase 0 출력
├── data-model.md                       # Phase 1 출력
├── quickstart.md                       # Phase 1 출력
├── contracts/
│   └── storybook-layout-stories.md     # Storybook story contract
└── tasks.md                            # /speckit.tasks 에서 생성
```

### Source Code (repository root)

```text
packages/ui/
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── src/
│   ├── components/                     # 기존 재사용 UI 컴포넌트 (변경 없음 원칙)
│   └── stories/
│       ├── layouts/                    # 신규 레이아웃 스토리 전용 디렉터리
│       │   ├── BrandSiteLayout.stories.tsx
│       │   ├── ProductLandingLayout.stories.tsx
│       │   ├── DocsHubLayout.stories.tsx
│       │   └── PricingComparisonLayout.stories.tsx
│       ├── AuthPage.stories.tsx
│       ├── DashboardPage.stories.tsx
│       ├── FormPage.stories.tsx
│       ├── SettingsPage.stories.tsx
│       └── guide/
│           ├── color.stories.tsx
│           ├── motion.stories.tsx
│           ├── spacing.stories.tsx
│           └── typography.stories.tsx
```

**Structure Decision**: 신규 스토리는 `packages/ui/src/stories/layouts/`에 배치한다. Storybook navigation은 `title: 'Page/Layouts/...'`로 제어하고, 물리적 위치 역시 전용 하위 폴더로 분리해 기존 `AuthPage`, `DashboardPage` 등 utilitarian page stories와 목적이 섞이지 않도록 한다.

## 구현 전략

### 레이아웃별 구성 방향

| 스토리 | 목표 패턴 | 우선 사용 컴포넌트 |
|--------|-----------|-------------------|
| `BrandSiteLayout` | 브랜드 홈, 신뢰 확보, CTA 흐름 | `NavigationMenu`, `Button`, `Badge`, `Card`, `Avatar`, `Separator` |
| `ProductLandingLayout` | 기능 출시/캠페인 랜딩, 전환 중심 흐름 | `Button`, `Badge`, `Card`, `Tabs`, `Accordion`, `Avatar` |
| `DocsHubLayout` | 탐색 중심 문서/리소스 허브 | `Sidebar` 계열, `Breadcrumb`, `Input` 또는 `Command`, `Card`, `Pagination` |
| `PricingComparisonLayout` | 플랜 비교 및 선택 유도 | `Card`, `Badge`, `Button`, `Separator`, `Accordion`, `Kbd` 또는 `Item` |

### 검증 전략

1. `pnpm --filter @myorg/ui lint`로 스토리 문법과 import 정리 상태를 검증한다.
2. `pnpm --filter @myorg/ui build-storybook`으로 신규 스토리 4개의 정적 빌드 성공을 확인한다.
3. 필요 시 `pnpm --filter @myorg/ui test`를 함께 실행해 기존 component/unit + storybook test 프로젝트에 회귀가 없는지 확인한다.
4. Storybook preview의 `Theme` toolbar와 `Desktop 1280 / Tablet 768 / Mobile 375` viewport를 사용해 각 레이아웃의 responsive/dark-mode 품질을 수동 확인한다.

## Complexity Tracking

> 헌법 위반 없음. 이 기능은 단순한 Storybook 문서 확장이므로 별도 정당화 항목이 없다.
