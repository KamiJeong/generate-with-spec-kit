# Implementation Plan: Storybook 디자인 토큰 스토리 개선

**Branch**: `009-storybook-token-stories` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-storybook-token-stories/spec.md`

## Summary

디자인 토큰 가이드 스토리 4개(Typography, Color, Spacing, Motion) 신규 생성, variant/size props를 보유한 컴포넌트 스토리에 `AllVariants` 갤러리 story 추가, 카테고리 폴더 구조 정비, 페이지 스토리 fullscreen 레이아웃 적용. 모든 변경은 기존 `packages/ui` 패키지 내 스토리 파일 수준에서 이루어지며 토큰 패키지는 변경하지 않는다.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3 (`@storybook/react-vite`), React 18+, `@myorg/tokens`, `@myorg/ui`, Biome v2.4.9, `@storybook/experimental-addon-test`, Vitest 2.x  
**Storage**: N/A (정적 스토리 파일)  
**Testing**: Vitest 2.x + `@storybook/experimental-addon-test` (play function 기반 interaction test)  
**Target Platform**: Storybook 브라우저 환경 (로컬 dev server)  
**Project Type**: Component library Storybook 문서  
**Performance Goals**: N/A (정적 Storybook 문서)  
**Constraints**: Biome lint/format 통과 필수, 기존 스토리 play function 유지  
**Scale/Scope**: 신규 가이드 스토리 4개, 컴포넌트 스토리 수정 약 15~20개, 페이지 스토리 레이아웃 수정 4개

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 (DRY) | ✅ PASS | 가이드 스토리에서 반복되는 ColorSwatch, SpacingBar 등 헬퍼는 `guide/_helpers.tsx`로 추상화 (3회 이상 사용 기준 충족) |
| II. 테스트 표준 | ✅ PASS | 가이드 스토리는 비즈니스 로직 없음. 기존 컴포넌트 play function은 그대로 유지 |
| III. UX 일관성 | ✅ PASS | 기존 `title: 'Components/X'` title 패턴 및 argTypes 구조 준수 |
| IV. 성능 요구사항 | ✅ PASS | N/A — 정적 Storybook 문서. 런타임 성능 목표 없음 |
| V. 단순성 (YAGNI) | ✅ PASS | 신규 외부 의존성 없음. 헬퍼 추상화는 4개 가이드 스토리 간 중복 코드 제거에 한정 |

**게이트 결과**: 모든 헌법 원칙 통과. Phase 0 진행 가능.

## Project Structure

### Documentation (this feature)

```text
specs/009-storybook-token-stories/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/ui/src/
├── stories/
│   ├── guide/                          # 신규: 가이드 스토리 폴더
│   │   ├── _helpers.tsx                # 신규: ColorSwatch, SpacingBar 등 공유 헬퍼
│   │   ├── typography.stories.tsx      # 신규: Typography 가이드
│   │   ├── color.stories.tsx           # 신규: Color 가이드 (light/dark side-by-side)
│   │   ├── spacing.stories.tsx         # 신규: Spacing 가이드
│   │   └── motion.stories.tsx          # 신규: Motion 가이드
│   ├── AuthPage.stories.tsx            # 수정: layout fullscreen
│   ├── DashboardPage.stories.tsx       # 수정: layout fullscreen
│   ├── FormPage.stories.tsx            # 수정: layout fullscreen
│   ├── SettingsPage.stories.tsx        # 수정: layout fullscreen
│   └── [기타 기존 스토리들...]
└── components/
    ├── alert.stories.tsx               # 수정: AllVariants 갤러리 추가
    ├── avatar.stories.tsx              # 수정: AllSizes 갤러리 추가
    ├── switch.stories.tsx              # 수정: AllSizes 갤러리 추가
    └── [기타 variant/size props 보유 컴포넌트...]
```

**Structure Decision**: 기존 `packages/ui/src/stories/` 디렉터리 내 `guide/` 서브폴더를 신설하여 가이드 스토리를 격리. 컴포넌트 스토리는 기존 위치 유지, 필요한 파일만 수정.

## Complexity Tracking

> 헌법 위반 없음 — 이 섹션은 해당 없음.
