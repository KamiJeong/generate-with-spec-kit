# 구현 계획: Storybook Stories Props 정의 보강

**브랜치**: `011-storybook-props-improve` | **날짜**: 2026-04-08 | **스펙**: `specs/011-storybook-props-improve/spec.md`
**입력**: `specs/011-storybook-props-improve/spec.md`

## 요약

`packages/ui/src/components` 및 `packages/ui/src/stories` 내 컴포넌트 스토리 파일의 `argTypes` 정의를 보강하여 Storybook Controls 패널에서 주요 props를 인터랙티브하게 조작 가능하게 한다. 스토리 파일만 수정하며 컴포넌트 구현 파일(`.tsx`)은 건드리지 않는다.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3 (`@storybook/react-vite`), React 18+, Radix UI (radix-ui 패키지), Tailwind CSS v4  
**Storage**: N/A  
**Testing**: `@storybook/experimental-addon-test`, Vitest 2.x (기존 play 함수 interaction tests)  
**Target Platform**: Storybook 개발 환경 (브라우저)  
**Project Type**: UI 컴포넌트 라이브러리 문서화  
**Performance Goals**: N/A (스토리 메타데이터 보강으로 성능 영향 없음)  
**Constraints**: 컴포넌트 구현 파일 수정 금지, 기존 play 함수 동작 유지  
**Scale/Scope**: `packages/ui/src/components/*.stories.tsx` 및 `packages/ui/src/stories/*.stories.tsx` 중 대상 파일 (layouts/, guide/ 제외)

## Constitution Check

*GATE: Phase 0 연구 전 통과 필수. Phase 1 설계 후 재확인.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 (단일 책임, DRY, 명확한 명명) | ✅ PASS | 각 스토리 파일은 단일 컴포넌트의 스토리만 담음. argTypes 구조는 반복되지만 스토리별 독립 메타데이터이므로 추상화 불필요 (두 번 이하 반복 허용 규칙 적용) |
| II. 테스트 표준 (play 함수 유지) | ✅ PASS | 기존 play 함수(interaction tests) 동작 유지가 FR-008/SC-004에서 명시됨 |
| III. UX 일관성 (Controls 패턴 통일) | ✅ PASS | 모든 스토리에 동일한 argTypes 패턴 적용 |
| IV. 성능 요구사항 | ✅ PASS | 스토리 메타데이터 변경이므로 런타임 성능 영향 없음 |
| V. 단순성 (YAGNI) | ✅ PASS | 외부 의존성 추가 없음. 현재 Storybook 버전의 기본 argTypes API만 사용 |

**복잡도 위반**: 없음

## Project Structure

### 문서 (이번 feature)

```text
specs/011-storybook-props-improve/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── data-model.md        # Phase 1 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # Phase 2 출력 (/speckit.tasks 명령으로 생성)
```

### 소스 코드 (수정 대상)

```text
packages/ui/src/
├── components/
│   ├── avatar.stories.tsx          # argTypes: size (select) — args 기반 named stories 보강
│   ├── badge.stories.tsx           # ✅ 이미 충분 (variant select, named stories 완비)
│   ├── button.stories.tsx          # Default render 수정 — args 연동 Playground 스토리 추가 필요 (FR-007)
│   ├── progress.stories.tsx        # argTypes 추가 필요: value (number), max (number)
│   ├── separator.stories.tsx       # argTypes 추가 필요: orientation (select), decorative (boolean)
│   ├── kbd.stories.tsx             # argTypes 추가 필요: children (text)
│   ├── label.stories.tsx           # argTypes 추가 필요: children (text)
│   ├── empty.stories.tsx           # argTypes 추가 필요: title (text), description (text)
│   ├── switch.stories.tsx          # ✅ 충분 (size/disabled 있음)
│   ├── item.stories.tsx            # argTypes 추가 필요: label, shortcut (text)
│   └── [복잡 compound 스토리들]    # scope 외 (alert-dialog, calendar, chart 등)
├── stories/
│   ├── button.stories.tsx          # Default render가 args를 무시함 → Playground 스토리 추가
│   ├── alert.stories.tsx           # variant argTypes 있음, Default render 교체 또는 Playground 추가
│   ├── checkbox.stories.tsx        # argTypes 없음 → checked, disabled 추가
│   ├── input.stories.tsx           # argTypes 없음 → type, placeholder, disabled 추가
│   ├── spinner.stories.tsx         # ✅ size argTypes 있음, Default render 수정 필요
│   ├── tabs.stories.tsx            # orientation argTypes 있음, named stories 수정 필요
│   ├── card.stories.tsx            # argTypes 없음 (compound 컴포넌트, description만 추가)
│   ├── radio-group.stories.tsx     # argTypes 없음 → orientation, disabled 추가
│   ├── native-select.stories.tsx   # argTypes 없음 → disabled, required 추가
│   ├── field.stories.tsx           # argTypes 없음 → label, error, required 추가
│   ├── input-group.stories.tsx     # argTypes 없음 → prefix, suffix (text) 추가
│   └── accordion.stories.tsx       # argTypes 없음 → type, collapsible (select/boolean) 추가
```

**Structure Decision**: 단일 패키지 UI 라이브러리. 스토리 파일만 수정하므로 디렉토리 구조 변경 없음.

## Phase 0: 연구 (research.md)

- ✅ `specs/011-storybook-props-improve/research.md` 생성 완료
- 현황 분석: 대상 20개 스토리, 그 중 12개 개선 필요
- 패턴 결정: play 함수 유무에 따라 패턴 A(render 변경) / 패턴 B(Playground 추가) 분리

## Phase 1: 설계 (data-model.md, contracts/, quickstart.md)

- ✅ `specs/011-storybook-props-improve/data-model.md` 생성 완료 (컴포넌트별 argTypes 스펙)
- ✅ `specs/011-storybook-props-improve/quickstart.md` 생성 완료 (구현 패턴 A/B/C 가이드)
- contracts/ 생략 — 이 feature는 외부 인터페이스(API, CLI 등)가 없는 내부 스토리 메타데이터 작업

---

## Complexity Tracking

복잡도 위반 없음. 외부 의존성 추가 없음. 기존 Storybook 10.3.3 argTypes API 표준 사용.
