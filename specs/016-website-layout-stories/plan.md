# Implementation Plan: 10가지 웹사이트 레이아웃 스토리북 추가

**Branch**: `016-website-layout-stories` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-website-layout-stories/spec.md`

## Summary

10가지 웹사이트 레이아웃 패턴(Z-pattern, F-pattern, Fullscreen image, Split screen, Asymmetrical, Single column, Box-based, Cards, Magazine, Horizontal strips)을 Storybook에 시각적 예시로 추가한다. 각 레이아웃은 독립적인 `.stories.tsx` 파일로 구현되며, `packages/ui/src/stories/layouts/` 폴더 아래 배치된다. 모바일/태블릿/데스크탑 3단계 breakpoint를 지원하고, 이미지 영역은 CSS 색상 블록으로 대체한다. 품질 특성(7가지 우수 웹사이트 특성)은 각 스토리의 `parameters.docs.description`에 텍스트로 명시한다.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18+, Storybook 10.3.4 (`@storybook/react-vite`), Tailwind CSS v4, shadcn/ui, Radix UI, Lucide React
**Storage**: N/A
**Testing**: `@storybook/addon-vitest`, Vitest 2.x
**Target Platform**: Storybook 개발 서버 (브라우저)
**Project Type**: UI 컴포넌트 라이브러리 (Storybook 스토리)
**Performance Goals**: 각 레이아웃 스토리 초기 렌더링 1.5초 이하
**Constraints**: 외부 이미지 서비스 의존 없음, 기존 `@myorg/ui` 컴포넌트·디자인 토큰 활용
**Scale/Scope**: 10개 스토리 파일, 최소 2개 variant/스토리

## Constitution Check

*GATE: Phase 0 이전 통과 필수. Phase 1 설계 후 재확인.*

| 원칙 | 적용 여부 | 평가 | 비고 |
|------|-----------|------|------|
| I. 코드 품질 — 단일 책임 원칙 | 적용 | PASS | 각 스토리 파일은 하나의 레이아웃 패턴만 담당 |
| I. 코드 품질 — DRY | 적용 | PASS | 공통 placeholder 콘텐츠(텍스트, 색상 블록 div)는 공유 상수로 추출 |
| II. 테스트 표준 | 부분 적용 | PASS (조건부) | 레이아웃 스토리는 시각적 예시 목적이므로 단위 테스트 대신 Storybook 렌더링 테스트로 대체. `@storybook/addon-vitest`로 렌더링 오류 없음 검증 |
| III. UX 일관성 — 디자인 시스템 | 적용 | PASS | `@myorg/ui` 컴포넌트, Tailwind CSS 디자인 토큰만 사용. 임의 스타일 오버라이드 금지 |
| III. UX 일관성 — 접근성 WCAG 2.1 AA | 적용 | PASS | `@storybook/addon-a11y`로 접근성 검사 실행 |
| IV. 성능 — FCP 1.5초 이하 | 적용 | PASS | 외부 이미지 없이 CSS 블록만 사용하여 네트워크 지연 없음 |
| V. 단순성 — YAGNI | 적용 | PASS | 실제 페이지 구현 아닌 시각적 예시. 불필요한 인터랙션 로직 추가 금지 |

**Constitution Check: PASS** — 위반 사항 없음.

## Project Structure

### Documentation (this feature)

```text
specs/016-website-layout-stories/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/ui/src/stories/layouts/
├── ZPatternLayout.stories.tsx          # Z-pattern
├── FPatternLayout.stories.tsx          # F-pattern
├── FullscreenImageLayout.stories.tsx   # Fullscreen image
├── SplitScreenLayout.stories.tsx       # Split screen
├── AsymmetricalLayout.stories.tsx      # Asymmetrical
├── SingleColumnLayout.stories.tsx      # Single column
├── BoxBasedLayout.stories.tsx          # Box-based
├── CardsLayout.stories.tsx             # Cards
├── MagazineLayout.stories.tsx          # Magazine
└── HorizontalStripsLayout.stories.tsx  # Horizontal strips

# 기존 파일 (변경 없음)
packages/ui/src/stories/layouts/
├── BrandSiteLayout.stories.tsx
├── DocsHubLayout.stories.tsx
├── PricingComparisonLayout.stories.tsx
└── ProductLandingLayout.stories.tsx
```

**Structure Decision**: 기존 `packages/ui/src/stories/layouts/` 폴더가 이미 존재하며 동일한 패턴(페이지 레이아웃 스토리)으로 사용 중이므로, 신규 10개 파일을 해당 폴더에 추가한다. `packages/ui/src/layouts/` 신규 폴더 생성 대신 기존 관행을 따른다 (Storybook `title`은 `Page/Layouts/[이름]` 형식 유지).

## Complexity Tracking

> Constitution Check 위반 없음. 해당 없음.
