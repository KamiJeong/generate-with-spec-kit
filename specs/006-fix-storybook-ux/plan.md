# 구현 계획: Storybook 품질 개선

**Branch**: `006-fix-storybook-ux` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-fix-storybook-ux/spec.md`

## 요약 (Summary)

4가지 Storybook 품질 문제를 수정한다: (1) 116개 Biome 포맷팅 에러 일괄 수정, (2) preview.ts 뷰포트·레이아웃 설정 개선, (3) decorator의 React 비권장 패턴 수정, (4) args 패턴 variant 스토리에 render 함수 추가로 Controls 정상화. 기존 play 테스트는 보호된다.

## 기술 컨텍스트 (Technical Context)

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3, Biome 2.4.9, React, `@storybook/react-vite`  
**Storage**: N/A  
**Testing**: Storybook play 테스트 (Playwright 기반) — 기존 테스트 0 regression 유지  
**Target Platform**: `packages/ui/src/` 및 `packages/ui/.storybook/`  
**Project Type**: UI 컴포넌트 라이브러리 (Storybook 문서화)  
**Performance Goals**: N/A  
**Constraints**: Default 스토리 및 meta `render` 변경 금지; play 테스트 보호; 새 외부 패키지 추가 최소화  
**Scale/Scope**: 전체 story 파일 포맷팅 수정, preview.ts 수정, 약 15개 variant 스토리 render 추가

## 헌법 검토 (Constitution Check)

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 | ✅ 직접 지원 | Biome 포맷팅 통일 — 일관된 코드 스타일 달성 |
| II. 테스트 표준 | ✅ 통과 | 기존 play 테스트 보호; Default/meta render 미변경 |
| III. UX 일관성 | ✅ 직접 지원 | Controls 정상화로 개발자 Storybook 경험 개선 |
| IV. 성능 요구사항 | ✅ 해당 없음 | 정적 스토리 파일 수정 |
| V. 단순성 | ✅ 통과 | 새 의존성 없음; 기존 패턴 유지 |

**결론**: 모든 게이트 통과. Complexity Tracking 불필요.

## 프로젝트 구조 (Project Structure)

### 문서화 (이 기능)

```text
specs/006-fix-storybook-ux/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # /speckit.tasks에서 생성
```

### 수정 대상 파일

```text
packages/ui/
├── .storybook/
│   ├── preview.ts           # 수정: layout, viewport, decorator 패턴
│   └── main.ts              # Biome 포맷팅만 (내용 변경 없음)
├── src/
│   ├── stories/
│   │   ├── button.stories.tsx      # render 추가 (Destructive/Outline/Secondary/Ghost/Link)
│   │   ├── spinner.stories.tsx     # render 추가 (Small/Large)
│   │   └── [기타 스토리 파일]       # Biome 포맷팅만
│   └── components/
│       ├── badge.stories.tsx       # render 추가 (Secondary/Destructive/Outline/Ghost/Link)
│       ├── avatar.stories.tsx      # render 추가 (Small/Large)
│       ├── switch.stories.tsx      # render 추가 (Small)
│       └── [기타 컴포넌트 파일]     # Biome 포맷팅만
```

## 수정 내용 상세

### preview.ts 변경

| 항목 | 변경 전 | 변경 후 | 이유 |
|------|--------|--------|------|
| `layout` | `'centered'` | `'padded'` | 더 넓은 기본 캔버스 표시 |
| `viewport` | 없음 | `defaultViewport: 'desktop1280'` (1280×900) | FR-002 충족 |
| decorator | `return Story()` | `return <Story />` | React 권장 패턴; 잠재적 hooks 경고 방지 |

### variant 스토리 render 추가 대상

| 파일 | 스토리 | 컴포넌트 |
|------|--------|---------|
| button.stories.tsx | Destructive, Outline, Secondary, Ghost, Link | `<Button {...args} />` |
| badge.stories.tsx | Secondary, Destructive, Outline, Ghost, Link | `<Badge {...args} />` |
| spinner.stories.tsx | Small, Large | `<Spinner {...args} />` |
| avatar.stories.tsx | Small, Large | `<Avatar {...args} />` |
| switch.stories.tsx | Small | `render: (args) => <div className="flex items-center gap-2"><Switch {...args} /></div>` |

### Biome 포맷팅 수정 범위

`biome check --write src .storybook` 실행으로 전체 수정. 코드 동작 변경 없음.

## 현재 상태 vs 목표 상태

| 문제 | 현재 | 목표 |
|------|------|------|
| Biome 에러 | 116건 (포맷팅) | 0건 |
| 콘솔 에러 | 발생 | 0건 |
| 기본 뷰포트 | 미설정 (좁음) | 1280px 데스크탑 |
| Controls 동작 | 일부 미반영 | 전체 정상 반영 |
| lint 결과 | FAIL | PASS |
