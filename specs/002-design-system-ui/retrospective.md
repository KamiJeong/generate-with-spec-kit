---
feature: "002-design-system-ui"
branch: "002-design-system-ui"
date: "2026-03-27"
completion_rate: 100
spec_adherence: 78
total_requirements: 16
implemented: 9
partial: 7
not_implemented: 0
critical_findings: 2
significant_findings: 0
positive_findings: 5
---

# 회고 보고서: 디자인 시스템 UI 구현

**Branch**: `002-design-system-ui` | **날짜**: 2026-03-27
**완료율**: 100% (107/107 tasks) | **Spec 준수율**: 78%

> **⚠️ 중요 업데이트**: 이전 회고(Spec 준수율 100%)는 태스크 완료 기준으로 측정되었으나, 실제 런타임 검증 결과 **Storybook에서 Tailwind CSS 유틸리티 클래스가 적용되지 않는 현상** 발견. 코드는 올바르나 설정 버그로 인해 시각적 스타일이 전혀 적용되지 않음. Spec 준수율을 78%로 하향 조정.

---

## 경영진 요약 (Executive Summary)

107개 태스크 전량 완료, 53개 컴포넌트 구현, 50개 스토리 play 함수 완성에도 불구하고 **Storybook 런타임에서 Tailwind CSS 클래스가 적용되지 않는 치명적 설정 버그**가 발견되었다. Tailwind v4는 Vite 플러그인(`@tailwindcss/vite`) 없이는 `@import "tailwindcss"`를 처리하지 않아 모든 유틸리티 클래스(bg-*, text-*, p-*, flex 등)가 생성되지 않는다. 컴포넌트는 DOM에는 존재하지만 완전히 스타일이 없는(unstyled) 상태로 렌더링된다.

**즉시 수정 필요**: `.storybook/main.ts`에 `@tailwindcss/vite` 플러그인 추가

---

## 발견된 버그 (Bug Analysis)

### CRITICAL 1 — `@tailwindcss/vite` 플러그인 미설치/미등록

**증상**: Storybook에서 Tailwind 클래스 미적용 (사용자 확인)
**근본 원인**: Tailwind CSS v4는 별도 Vite 플러그인을 통해 CSS를 처리한다. 플러그인 없이 `@import "tailwindcss"`는 일반 CSS 파일 import로만 처리되어 유틸리티 클래스 생성 엔진이 실행되지 않는다.

**증거**:
```bash
# package.json에 @tailwindcss/vite 없음
grep '@tailwindcss' packages/ui/package.json  → NOT FOUND

# .storybook/ 내 tailwindcss 참조 없음
grep -r 'tailwindcss' packages/ui/.storybook/  → no tailwindcss in storybook config
```

**현재 `.storybook/main.ts` viteFinal** (버그):
```ts
async viteFinal(config) {
  config.resolve.alias = { '@': path.resolve(dirname, '../src') };
  return config;  // ← @tailwindcss/vite 플러그인 없음
}
```

**수정 방법**:
```bash
pnpm --filter @myorg/ui add -D @tailwindcss/vite
```
```ts
// .storybook/main.ts
import tailwindcss from '@tailwindcss/vite';

async viteFinal(config) {
  config.plugins = [...(config.plugins ?? []), tailwindcss()];
  config.resolve.alias = { '@': path.resolve(dirname, '../src') };
  return config;
}
```

---

### CRITICAL 2 — `preview.ts`에서 미설치 패키지 `@storybook/react` import

**증상**: TypeScript 빌드 오류 가능성
**근본 원인**: `preview.ts`가 `@storybook/react`에서 `Preview` 타입을 import하나 이 패키지가 설치되지 않음. 설치된 패키지는 `@storybook/react-vite` (v10.3.3)만 존재.

**증거**:
```bash
# preview.ts 첫 줄
import type { Preview } from '@storybook/react';  # ← @storybook/react 미설치

# 설치된 @storybook 패키지
ls packages/ui/node_modules/@storybook/
→ addon-a11y, react-vite, test-runner  # @storybook/react 없음
```

**수정 방법**:
```ts
// packages/ui/.storybook/preview.ts
// 변경 전:
import type { Preview } from '@storybook/react';
// 변경 후:
import type { Preview } from '@storybook/react-vite';
```

---

## 요구사항 커버리지 매트릭스 (Requirement Coverage Matrix)

> **판정 기준**: IMPLEMENTED = 코드 정확 + 런타임 동작, PARTIAL = 코드 정확하나 런타임 동작 실패

| 요구사항 | 상태 | 런타임 영향 | 비고 |
|----------|------|-----------|------|
| FR-001 (53개+ 컴포넌트) | ✅ IMPLEMENTED | 없음 | DOM 렌더링은 정상, 53개 컴포넌트 존재 |
| FR-002 (토큰만 사용) | 🔶 PARTIAL | **직접 영향** | 코드는 올바르나 Tailwind가 토큰 클래스를 처리 안 함 → 시각적 미적용 |
| FR-003 (모든 컴포넌트에 스토리) | ✅ IMPLEMENTED | 없음 | 50개 스토리 파일 존재 |
| FR-004 (play 함수 인터랙션+접근성) | ✅ IMPLEMENTED | 부분 | DOM 인터랙션 테스트 동작, 시각 검증만 영향 |
| FR-005 (변형별 개별 스토리) | ✅ IMPLEMENTED | 없음 | 스토리 파일 존재 (스타일만 없음) |
| FR-006 (조합 가능성) | ✅ IMPLEMENTED | 없음 | 구조적 조합은 정상 동작 |
| FR-007 (명확한 공개 API) | ✅ IMPLEMENTED | 없음 | 55개 export 정상 |
| FR-008 (최소 props로 복합 컴포넌트 동작) | ✅ IMPLEMENTED | 없음 | 기능 동작 (스타일 제외) |
| FR-009 (WCAG 2.1 AA) | 🔶 PARTIAL | **직접 영향** | 키보드/ARIA 정상, 색상 대비 검사는 스타일 없이 실패 가능 |
| FR-010 (라이트/다크 모드) | 🔶 PARTIAL | **직접 영향** | CSS 변수 전환 코드는 정상, Tailwind 처리 없어 시각적 변화 없음 |
| SC-001 (53개+ export) | ✅ IMPLEMENTED | 없음 | 55개 named export 정상 |
| SC-002 (모든 스토리 + 테스트 clean) | 🔶 PARTIAL | **직접 영향** | 스토리 존재 + play 함수 완료, 시각 렌더링 broken |
| SC-003 (하드코딩 값 없음) | 🔶 PARTIAL | **직접 영향** | 코드에 하드코딩 없음, 그러나 스타일 미적용으로 사실상 토큰 미사용 |
| SC-004 (자동화 접근성 검사) | 🔶 PARTIAL | **간접 영향** | ARIA 구조 검사 통과, 색상 대비(color-contrast) 규칙 실패 예상 |
| SC-005 (Storybook 탐색 + quickstart) | 🔶 PARTIAL | **직접 영향** | Storybook 실행됨, 컴포넌트 unstyled 상태로 렌더링 |
| SC-006 (CI 5분 이내 완료) | ✅ IMPLEMENTED | 없음 | `.github/workflows/storybook-test.yml` 정상 |

**커버리지**: 9 IMPLEMENTED + 7 PARTIAL + 0 NOT IMPLEMENTED

---

## Spec 준수율 계산 (Spec Adherence)

```
Spec Adherence % = ((IMPLEMENTED + MODIFIED + (PARTIAL × 0.5)) / Total) × 100
                 = ((9 + 0 + (7 × 0.5)) / 16) × 100
                 = (9 + 3.5) / 16 × 100
                 = 12.5 / 16 × 100
                 = 78%
```

> **이전 회고 대비 변화**: 100% → 78%
> **하향 이유**: 런타임 검증 결과 `@tailwindcss/vite` 플러그인 누락으로 Tailwind CSS가 Storybook에서 처리되지 않음을 확인. 태스크 완료 기준이 아닌 실제 동작 기준으로 재평가.

---

## 성공 기준 평가 (Success Criteria Assessment)

| 성공 기준 | 목표 | 실제 | 충족 여부 |
|----------|------|------|----------|
| SC-001: 53개+ 컴포넌트 | 53개+ | 55개 export | ✅ |
| SC-002: 모든 스토리 + 자동화 테스트 | 100% 스토리, 오류 없음 | 스토리 존재 + play 함수 완료, 시각 broken | 🔶 |
| SC-003: 하드코딩 값 없음 | 하드코딩 0건 | 코드 OK, 런타임 스타일 미적용 | 🔶 |
| SC-004: 자동화 a11y 검사 | 모든 컴포넌트 통과 | ARIA 정상, 색상 대비 미통과 예상 | 🔶 |
| SC-005: Storybook 탐색 + quickstart | 탐색 가능 + 동작 확인 | Storybook 실행, 스타일 없음 | 🔶 |
| SC-006: CI 5분 이내 | `.github/workflows` 배포 | storybook-test.yml 존재 | ✅ |

---

## 아키텍처 드리프트 (Architecture Drift)

| 계획 | 실제 | 드리프트 유형 | 영향 |
|------|------|-------------|------|
| Tailwind v4 CSS-first 설정 | `@tailwindcss/vite` Vite 플러그인 누락 | **CRITICAL** | Tailwind CSS 전체 미처리 — 핵심 설정 버그 |
| Storybook framework: `storybook/react-vite` | `@storybook/react-vite` (별도 패키지) | MINOR | 패키지 다르나 동작 동일 (v10.3.3) |
| preview.ts import: `storybook/react` | `@storybook/react` (미설치 패키지) import | CRITICAL | TypeScript 오류 발생 가능 |
| 플랫 파일 구조 | 적용됨 | POSITIVE | 계획 대비 개선 |
| Storybook 8.6.18 → 10.3.3 업그레이드 | 적용됨 | POSITIVE | 최신 버전 |
| ESLint → Biome v2.4.9 | 적용됨 | POSITIVE | 린팅 도구 통합 |

---

## 헌법 준수 검사 (Constitution Compliance)

| 헌법 원칙 | 상태 | 증거 |
|----------|------|------|
| I. 코드 품질 (DRY, SRP, Linter) | ✅ PASS | 코드 구조 올바름, Biome lint 통과 — 설정 버그이지 코드 품질 문제 아님 |
| II. 테스트 표준 (TDD, 80%+ 커버리지) | ⚠️ PARTIAL | play 함수 100% 완료, 그러나 스타일 없이 실행되어 시각적 검증 실패 |
| III. UX 일관성 (디자인 시스템, WCAG 2.1 AA) | ❌ **VIOLATED** | Tailwind CSS 미적용으로 모든 컴포넌트 unstyled — 디자인 시스템 시각 기준 미충족 |
| IV. 성능 (CI 5분 이내) | ✅ PASS | `.github/workflows/storybook-test.yml` 타임아웃 게이트 존재 |
| V. 단순성 (YAGNI, 최소 의존성) | ✅ PASS | 플랫 구조, Biome, 불필요 의존성 없음 |

**헌법 위반**:
- **III. UX 일관성** VIOLATED — `@tailwindcss/vite` 플러그인 누락으로 모든 Tailwind 스타일 미적용. 컴포넌트가 시각적으로 unstyled 상태 = 디자인 시스템 원칙 미충족.

---

## 루트 코즈 분석 (Root Cause Analysis)

| 버그 | 발견 시점 | 원인 | 예방 권고 |
|------|----------|------|----------|
| `@tailwindcss/vite` 미등록 | 런타임 검증(회고) | Tailwind v4 설정 가이드에서 `@tailwindcss/vite` 플러그인이 별도 패키지임을 인지 못함. v3에서는 PostCSS 기반이었으나 v4는 Vite 플러그인 방식으로 변경됨. | Tailwind v4 + Vite 조합 시 `@tailwindcss/vite` 플러그인 체크리스트 항목 추가 |
| `@storybook/react` 미설치 | 정적 분석 | v10에서 `@storybook/react-vite` 단일 패키지로 통합되었으나 preview.ts에 구버전 import 경로 사용 | Storybook 버전 업그레이드 시 모든 import 경로 일괄 검증 |
| 태스크 완료 ≠ 런타임 검증 | 이번 회고 | tasks.md [X] 완료 기준이 파일 생성/코드 작성이지 실제 브라우저 렌더링 검증이 아님 | 각 Phase 체크포인트에 `pnpm --filter @myorg/ui storybook` 실행 후 시각 확인 단계 포함 |

---

## 즉시 수정 방법 (Immediate Fix)

### Fix 1 — `@tailwindcss/vite` 플러그인 추가 (CRITICAL)

```bash
# 1. 패키지 설치
pnpm --filter @myorg/ui add -D @tailwindcss/vite
```

```ts
// packages/ui/.storybook/main.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';  // ← 추가
import type { StorybookConfig } from '@storybook/react-vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];  // ← 추가
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': path.resolve(dirname, '../src'),
    };
    return config;
  },
};

export default config;
```

### Fix 2 — `preview.ts` import 수정 (CRITICAL)

```ts
// packages/ui/.storybook/preview.ts
// 변경 전:
import type { Preview } from '@storybook/react';
// 변경 후:
import type { Preview } from '@storybook/react-vite';
```

### 수정 후 검증

```bash
pnpm --filter @myorg/ui storybook
# → Button 컴포넌트에 bg-primary, text-primary-foreground 등 색상 적용 확인
# → 다크모드 토글 시 CSS 변수 전환 확인
```

---

## 권고사항 (Recommendations)

### 즉시 (Critical — 이 회고 전 수행 필요)

1. **`@tailwindcss/vite` 설치 + `viteFinal` 플러그인 추가** — Fix 1 참고
2. **`preview.ts` import 경로 수정** — Fix 2 참고
3. **수정 후 `pnpm --filter @myorg/ui storybook` 실행** — 시각적 스타일 적용 확인

### SDD 프로세스 개선 (다음 기능)

4. **Phase 체크포인트에 브라우저 렌더링 검증 포함**: tasks.md Phase 2 체크포인트 조건을 "Storybook 빈 창 실행" 대신 "컴포넌트 스타일 적용 시각 확인"으로 강화
5. **Tailwind v4 설정 체크리스트**: `@tailwindcss/vite` 플러그인 존재 여부를 Phase A Setup 필수 체크 항목으로 추가
6. **버전 업그레이드 시 import 경로 일괄 검증**: major 버전 변경 시 모든 `import from '@storybook/*'` 경로 재확인
7. **런타임 스모크 테스트 CI 추가**: Storybook 빌드 성공 + 최소 1개 스토리 스크린샷 비교로 "unstyled" 상태 조기 감지

---

## Proposed Spec Changes

없음 — 이 이슈는 구현 설정 버그이지 spec 변경이 필요한 요구사항 문제가 아님.

---

## 파일 추적 부록 (File Traceability Appendix)

| 파일 | 상태 | 비고 |
|------|------|------|
| `packages/ui/.storybook/main.ts` | ❌ **수정 필요** | `@tailwindcss/vite` 플러그인 viteFinal에 추가 필요 |
| `packages/ui/.storybook/preview.ts` | ❌ **수정 필요** | `@storybook/react` → `@storybook/react-vite` import 경로 변경 |
| `packages/ui/package.json` | ❌ **수정 필요** | `@tailwindcss/vite` devDependency 추가 필요 |
| `packages/ui/src/index.css` | ✅ 올바름 | Tailwind v4 CSS-first 설정 정확, 플러그인만 누락 |
| `packages/ui/src/components/*.tsx` | ✅ 올바름 | Tailwind 클래스 올바르게 사용 중 |
| `packages/ui/src/index.ts` | ✅ 완료 | 55개 named export |
| `packages/ui/dist/` | ✅ 존재 | 빌드 완료 |
| `.github/workflows/storybook-test.yml` | ✅ 완료 | CI 파이프라인 |

---

## Self-Assessment Checklist

- [x] **Evidence completeness**: 버그 2건 모두 grep 명령어 출력과 파일 내용으로 증거 확인됨
- [x] **Coverage integrity**: FR-001~FR-010, SC-001~SC-006 총 16개 요구사항 전량 재평가됨
- [x] **Metrics sanity**: spec_adherence = (9 + 3.5) / 16 × 100 = 78% — 런타임 실패를 반영한 하향 조정
- [x] **Severity consistency**: CRITICAL(2) — 시각 렌더링 완전 실패(헌법 III 위반), 타입 import 오류
- [x] **Constitution review**: 헌법 III 위반 명시됨 — `@tailwindcss/vite` 누락으로 UX 일관성 미충족
- [x] **Human Gate readiness**: Spec 변경 제안 없음 — Human Gate 불필요
- [x] **Actionability**: Fix 1/Fix 2 코드 스니펫과 명령어로 즉시 수정 가능

---

## 회고 진행 이력

| 시점 | 완료율 | 준수율 | 주요 변화 |
|------|--------|--------|----------|
| 회고 #1 | 80% | 75% | play 함수 28%, 헌법 II 위반 |
| 회고 #2 | 96% | 91% | play 함수 100%, 조합 패턴 완료 |
| 회고 #3 | 100% | 100% | 태스크 전량 완료 (런타임 미검증) |
| 회고 #4 (현재) | 100% | **78%** | @tailwindcss/vite 누락 런타임 버그 발견, 헌법 III 위반 |

---

*이 회고는 `/speckit.retrospective.analyze` 명령으로 자동 생성됨*
*Spec Adherence: 78% | Completion: 100% | Critical findings: 2*
