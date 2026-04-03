# 구현 계획: 스토리북 전체 Variant 커버리지

**Branch**: `004-story-variant-coverage` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: `/specs/004-story-variant-coverage/spec.md`

## 요약 (Summary)

8개 컴포넌트(Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet)의 Storybook 스토리 파일에 각 variant/size/방향별 named story export를 추가한다. 기존 `Default` 스토리(play 테스트 포함)는 변경하지 않고 유지하며, 새 스토리는 해당 컴포넌트에서 이미 사용 중인 패턴(`args` 또는 `render`)을 따른다. 총 수정 파일: 8개, 새 named export 수: 최소 25개.

## 기술 컨텍스트 (Technical Context)

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3, React, `@storybook/react`, `storybook/test`, `lucide-react` (아이콘)  
**Storage**: N/A  
**Testing**: Storybook play 테스트 (Playwright 기반) — 기존 테스트 0 regression 유지  
**Target Platform**: `packages/ui/src/stories/` 및 `packages/ui/src/components/`  
**Project Type**: UI 컴포넌트 라이브러리 (Storybook 문서화)  
**Performance Goals**: N/A  
**Constraints**: 기존 `Default` play 테스트 변경 금지; 각 스토리는 Storybook에서 독립적으로 오류 없이 렌더링되어야 함  
**Scale/Scope**: 8개 파일 수정, ~25개 named export 추가

## 헌법 검토 (Constitution Check)

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 | ✅ 통과 | `args` 패턴 우선 사용으로 중복 렌더 최소화 |
| II. 테스트 표준 | ✅ 통과 | 기존 play 테스트 유지; 새 스토리는 시각 검증용이므로 play 테스트 불필요 |
| III. UX 일관성 | ✅ 직접 지원 | AI 에이전트가 모든 variant를 인식하게 되어 디자인 일관성 강화 |
| IV. 성능 요구사항 | ✅ 해당 없음 | 정적 스토리 파일 |
| V. 단순성 | ✅ 통과 | 기존 패턴 유지; 새 추상화 없음 |

**결론**: 모든 게이트 통과. Complexity Tracking 불필요.

## 프로젝트 구조 (Project Structure)

### 문서화 (이 기능)

```text
specs/004-story-variant-coverage/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # /speckit.tasks에서 생성
```

### 소스 코드 (수정 대상 파일)

```text
packages/ui/src/stories/
├── button.stories.tsx   # +Destructive, Outline, Secondary, Ghost, Link, Sizes, IconSizes, Variants
├── badge.stories.tsx    # +Secondary, Destructive, Outline, Ghost, Link, Variants
├── alert.stories.tsx    # +Destructive
├── spinner.stories.tsx  # +Small, Large
└── tabs.stories.tsx     # +Line, Vertical

packages/ui/src/components/
├── switch.stories.tsx   # +Small
├── avatar.stories.tsx   # +Small, Large, WithBadge, Group
└── sheet.stories.tsx    # +Left, Top, Bottom
```

**구조 결정**: 기존 파일 위치 유지. `stories/`와 `components/` 폴더 간 이동 없음.

## 현재 상태 vs 목표 상태

| 컴포넌트 | 현재 named exports | 추가 후 named exports | 우선순위 |
|---------|------------------|---------------------|---------|
| Button | Default | Default, Destructive, Outline, Secondary, Ghost, Link, Sizes, IconSizes, Variants | P1 |
| Badge | Default | Default, Secondary, Destructive, Outline, Ghost, Link, Variants | P1 |
| Alert | Default | Default, Destructive | P1 |
| Spinner | Default | Default, Small, Large | P2 |
| Tabs | Default | Default, Line, Vertical | P2 |
| Switch | Default | Default, Small | P2 |
| Avatar | Default | Default, Small, Large, WithBadge, Group | P2 |
| Sheet | Default | Default, Left, Top, Bottom | P2 |
