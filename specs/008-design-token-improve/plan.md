# Implementation Plan: 디자인 토큰 시스템 개선

**Branch**: `008-design-token-improve` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/008-design-token-improve/spec.md`

## Summary

브랜드 컬러 `#d92b33`이 파괴적(오류) 색상 토큰과 동일하게 매핑되어 있는 버그를 수정하고, 한국어 최적화 폰트(Pretendard → Noto Sans KR)를 도입하며, 다크 모드 전체 semantic 토큰을 추가한다. `packages/tokens` 패키지의 기존 3레이어 구조(primitives → semantic → CSS)를 확장하며, 토큰 출력은 CSS Custom Properties + TypeScript 객체 이중 형식을 유지한다.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: `pretendard` (npm), `@fontsource/noto-sans-kr` (npm), Vitest 2.x (테스트), Biome v2.4.9 (lint/format), tsup v8 (빌드)  
**Storage**: N/A (정적 토큰 파일)  
**Testing**: Vitest 2.x (`pnpm --filter @myorg/tokens test`)  
**Target Platform**: 브라우저 (CSS Custom Properties), Node.js (TypeScript import)  
**Project Type**: 라이브러리 (`@myorg/tokens` 패키지)  
**Performance Goals**: 폰트 로드 후 텍스트 렌더링 지연 없음 (font-display: swap), CSS 변수 기반 다크 모드 전환 무지연  
**Constraints**: WCAG AA(4.5:1) 이상 모든 토큰 조합 충족, 외부 CDN 미사용  
**Scale/Scope**: `packages/tokens` 내 ~8개 파일 수정/추가

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 (단일 책임, DRY) | ✅ PASS | 레이어 분리 유지. 파괴적 팔레트를 별도 변수로 분리하여 DRY 준수. |
| II. 테스트 표준 (TDD, 80% 커버리지) | ✅ PASS | 신규 토큰값 검증 테스트 필수. 컬러 계산, 명암비, hue 차이 단위 테스트 작성. |
| III. UX 일관성 (WCAG 2.1 AA) | ✅ PASS | research.md에서 주요 조합 명암비 검증 완료. 다크 모드도 AA 기준 충족 확인. |
| IV. 성능 (FCP 1.5s 이하) | ✅ PASS | npm self-hosted 폰트 → CDN RTT 없음. CSS 변수 교체 방식 → JS 없이 즉시 전환. |
| V. 단순성 (YAGNI) | ✅ PASS | 기존 구조 확장. 새 추상화 레이어 없음. 테마 유틸리티는 단순 3함수로 제한. |
| 기술 스택 제약 (라이선스) | ✅ PASS | Pretendard SIL OFL 1.1, Noto Sans KR SIL OFL 1.1. |

**Constitution Check 결과**: 전체 통과. Phase 1 설계 진행.

## Project Structure

### Documentation (this feature)

```text
specs/008-design-token-improve/
├── plan.md              # This file
├── research.md          # Phase 0 완료 ✅
├── data-model.md        # Phase 1 완료 ✅
├── quickstart.md        # Phase 1 완료 ✅
├── contracts/
│   └── token-api.md     # Phase 1 완료 ✅
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/tokens/src/
├── primitives/
│   ├── colors.ts          # 수정: brand 팔레트 재계산(600 앵커), destructive 팔레트 신규
│   └── typography.ts      # 수정: Pretendard + Noto Sans KR 폰트 스택
├── semantic/
│   ├── index.ts           # 수정: destructive 분리, ring 업데이트
│   └── dark.ts            # 신규: 다크 모드 semantic 토큰 전체
├── css/
│   └── base.css           # 수정: dark selector 전체 semantic 추가, 폰트 변수 추가
├── theme-utils.ts         # 신규: getTheme, setTheme, initTheme
└── index.ts               # 수정: 신규 export 추가

packages/tokens/tests/
├── colors.test.ts         # 신규: 팔레트 값 및 hue 차이 검증
├── semantic.test.ts       # 신규: destructive ≠ primary 검증
├── contrast.test.ts       # 신규: WCAG AA 명암비 검증
└── theme-utils.test.ts    # 신규: 테마 전환 로직 검증
```

**Structure Decision**: 기존 monorepo 구조(`packages/tokens`) 유지. 신규 파일은 기존 패턴(primitives/semantic 분리)을 따라 배치.

## Complexity Tracking

> 이번 구현에서 Constitution 위반 항목 없음. 복잡도 정당화 불필요.
