# Implementation Plan: B2C 디자인 토큰 시스템

**Branch**: `001-design-token-system` | **Date**: 2026-03-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-design-token-system/spec.md`

## Summary

중립 회색(Zinc 계열) 기반에 브랜드 레드(#d92b33) 단일 포인트 컬러를 사용하는 B2C 디자인 토큰 시스템을 TypeScript 모노레포 패키지(`@tokens`)로 구현한다. pnpm workspaces + Turborepo 구조에서 3개의 진입점(TypeScript API, Tailwind preset, CSS variables)을 제공하며, React + Tailwind CSS v3 + shadcn/ui + framer-motion 환경에서 설정 파일 2개(tailwind.config.ts, globals.css) 수정만으로 전체 시스템이 적용된다.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Tailwind CSS v3+, shadcn/ui (latest), framer-motion v11+, tsup v8+
**Storage**: N/A (정적 설정 파일)
**Testing**: Vitest — 토큰 값 정확성, CSS 변수 존재 여부, 대비비 검증
**Target Platform**: 웹 브라우저 (모노레포 내 패키지, npm publishable)
**Project Type**: Library (디자인 토큰 패키지)
**Performance Goals**: 런타임 오버헤드 없음 (순수 정적 토큰). CSS 파일 < 2KB gzip.
**Constraints**: Tailwind `<alpha-value>` 패턴 필수, shadcn/ui bare HSL 변수 형식 필수, WCAG AA 준수
**Scale/Scope**: 단일 패키지(`packages/tokens`), 모노레포 내 여러 앱에서 소비

## Constitution Check

*GATE: 구현 시작 전 통과 필수. Phase 1 설계 후 재검토.*

| 원칙 | 게이트 | 상태 |
|------|--------|------|
| **I. 코드 품질** | 각 토큰 파일은 단일 책임(색상/타이포그래피/모션) 유지. DRY: primitive → semantic 단방향 참조. | ✅ PASS |
| **II. 테스트 표준** | Vitest로 컬러 값, CSS 변수, 대비비 단위 테스트. 커버리지 80% 이상. | ✅ PASS (계획됨) |
| **III. UX 일관성** | WCAG 2.1 AA 준수. 모든 컴포넌트가 토큰 경유. | ✅ PASS |
| **IV. 성능** | 런타임 JS 없음. CSS < 2KB. tree-shaking 지원. | ✅ PASS |
| **V. 단순성** | 3개 진입점만 제공. 필요 이상의 추상화 없음. | ✅ PASS (복잡도 정당화는 아래 참조) |

## Complexity Tracking

| 복잡도 증가 | 이유 | 더 단순한 대안이 불충분한 이유 |
|------------|------|-------------------------------|
| 3개 진입점 (TypeScript, Tailwind, CSS) | 각 소비 컨텍스트(framer-motion/Tailwind/shadcn)가 다른 형식을 요구 | 단일 진입점으로는 Tailwind preset과 CSS import를 동시에 제공 불가 |
| 모노레포 (pnpm + Turborepo) | 사용자가 명시적으로 monorepo 고려를 요청 | 단일 패키지로는 apps/ 간 토큰 공유 구조를 표현 불가 |

## Project Structure

### Documentation (this feature)

```text
specs/001-design-token-system/
├── plan.md              # 이 파일
├── research.md          # Phase 0 리서치 결과
├── data-model.md        # 토큰 전체 스키마 및 값
├── quickstart.md        # 통합 가이드
├── contracts/
│   ├── typescript-api.md   # TypeScript export 계약
│   ├── tailwind-preset.md  # Tailwind preset 계약
│   └── css-variables.md    # CSS 변수 계약
└── tasks.md             # Phase 2 출력 (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/
└── tokens/
    ├── src/
    │   ├── primitives/
    │   │   ├── colors.ts        # 원시 컬러 스케일 (gray, primary)
    │   │   └── typography.ts    # 폰트 패밀리/굵기 정의
    │   ├── semantic/
    │   │   └── index.ts         # 시맨틱 토큰 (CSS var 참조 문자열)
    │   ├── motion/
    │   │   └── index.ts         # 모션 토큰 (framer-motion용)
    │   ├── tailwind/
    │   │   └── preset.ts        # Tailwind preset export (default)
    │   ├── css/
    │   │   └── base.css         # CSS 변수 :root 정의
    │   └── index.ts             # 메인 TypeScript 진입점
    ├── tests/
    │   ├── colors.test.ts       # 원시 컬러 값 검증
    │   ├── contrast.test.ts     # WCAG 대비비 검증
    │   └── css-variables.test.ts # CSS 변수 존재 및 형식 검증
    ├── package.json
    ├── tsconfig.json
    └── tsup.config.ts

turbo.json
pnpm-workspace.yaml
package.json            # root (workspaces 정의)
```

**Structure Decision**: 모노레포 Option 선택. `packages/tokens`가 단일 라이브러리 패키지. `apps/`는 소비 앱 (웹, 스토리북 등) 위치 — 현재 feature 범위 밖이나 구조 예약.

---

## Phase 0: Research ✅

→ [research.md](./research.md) 참조

핵심 결정:
- pnpm + Turborepo, tsup 빌드
- bare HSL CSS 변수 (shadcn/ui 규약)
- Tailwind `<alpha-value>` 패턴
- framer-motion: 타이밍은 JS, 색상은 CSS var
- 회색 기반: Zinc 팔레트 채택

## Phase 1: Design & Contracts ✅

→ [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md) 참조

**Post-design Constitution Check**:

| 원칙 | 검토 결과 |
|------|---------|
| **I. 코드 품질** | primitives → semantic → tailwind/css 단방향 의존. 각 파일 단일 책임 유지됨. ✅ |
| **II. 테스트 표준** | 색상 값, 대비비, CSS 변수 검증 테스트 구조 정의됨. ✅ |
| **III. UX 일관성** | 모든 시맨틱 토큰이 shadcn/ui 변수와 1:1 매핑. WCAG AA 전 토큰 조합 검증됨. ✅ |
| **IV. 성능** | CSS 파일 < 2KB 예상. 런타임 JS 없음. tsup tree-shaking 활성화. ✅ |
| **V. 단순성** | 진입점 3개, 레이어 3개. 추가 추상화 없음. ✅ |

## 다음 단계

`/speckit.tasks` 명령으로 구현 태스크 목록(tasks.md)을 생성한다.
