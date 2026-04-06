# Research: Storybook 품질 고도화

**Branch**: `007-storybook-setup` | **Date**: 2026-04-06

---

## R1. argTypes Controls 자동 매핑 (FR-001)

**결정**: `argTypes` 전역 설정 + 스토리별 수동 정의 혼합 방식

**근거**:
- Storybook 10.x + `@storybook/react-vite`는 `react-docgen-typescript`를 내장하여 TypeScript union 타입을 자동으로 `control: 'select'`로 추론한다.
- 단, 자동 추론이 동작하려면 컴포넌트 props 타입이 `interface` 또는 `type`으로 명시적으로 export되어야 한다.
- `preview.tsx`의 `parameters.controls`에 `expanded: true`를 추가하면 모든 prop이 Controls 패널에 표시된다.
- 자동 추론이 실패하는 복잡한 타입(intersection, conditional)은 스토리별 `argTypes` 수동 정의로 보완한다.

**구현 방식**:
```typescript
// preview.tsx
parameters: {
  controls: {
    matchers: { color: /(background|color)$/i, date: /Date$/i },
    expanded: true,   // 모든 prop 표시
  },
}
```

```typescript
// 스토리 개별 argTypes (자동 추론 실패 시)
export default {
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline'] },
  },
}
```

**대안 검토**: `control: 'radio'` — 옵션 수 관계없이 모두 select로 통일 결정(clarification Q3)하여 불채택.

---

## R2. canvas 탭 "Show code" 활성화 (FR-002, FR-003)

**결정**: `@storybook/addon-docs` 기본 제공 기능 활용 — 추가 패키지 없음

**근거**:
- `@storybook/addon-docs`(이미 설치)는 canvas 탭 하단에 "Show code" 토글을 제공한다.
- 토글 활성화 시 스토리의 현재 args를 반영한 JSX 코드 스니펫이 표시된다.
- Controls 변경 → args 업데이트 → 코드 스니펫 실시간 반영이 기본 동작이다.
- `parameters.docs.source.type = 'dynamic'`으로 설정하면 args 변경이 코드에 즉시 반영된다.

**구현 방식**:
```typescript
// preview.tsx
parameters: {
  docs: {
    source: { type: 'dynamic' },   // Controls 변경 시 코드 실시간 업데이트
  },
}
```

**대안 검토**: `storybook-addon-source` 등 서드파티 — 기존 docs 애드온으로 충분하므로 불채택.

---

## R3. 뷰포트 설정 (FR-004)

**결정**: feature 006 기존 설정 유지 — 추가 작업 없음

**근거**:
- `preview.tsx`에 이미 `desktop1280(1280px)`, `tablet768(768px)`, `mobile375(375px)` 뷰포트가 설정되어 있다.
- 기본값은 `desktop1280`으로 설정됨.
- SC-003 "1초 이내 전환" 요구사항은 Storybook 기본 viewport 전환 속도로 충족된다.
- 추가 구현 필요 없음 — 검증만 수행한다.

---

## R4. 컴포넌트 단위 테스트 + 커버리지 (FR-005, FR-008)

**결정**: `@storybook/experimental-addon-test` + `vitest` + `@vitest/coverage-v8` + `@testing-library/react`

**근거**:
- Storybook 8.x+에서 도입된 `@storybook/experimental-addon-test`는 Storybook stories를 Vitest 테스트로 실행하는 공식 통합 방식이다.
- Storybook 10.3.3에서 지원됨. Vitest 2.x+ 필요.
- `@testing-library/react`는 컴포넌트 렌더링 및 인터랙션 테스트의 업계 표준이다.
- `@vitest/coverage-v8`은 V8 엔진 내장 커버리지로 추가 빌드 없이 동작하며 번들 크기 영향이 적다.

**신규 패키지** (팀 검토 필요 — 헌법 V조):
- `vitest`: ^2.0.0 — MIT 라이선스, 활발한 유지보수
- `@vitest/coverage-v8`: ^2.0.0 — vitest 공식 패키지
- `@storybook/experimental-addon-test`: 10.3.3 — Storybook 공식 패키지
- `@testing-library/react`: ^16.0.0 — MIT 라이선스, React 생태계 표준
- `@testing-library/jest-dom`: ^6.0.0 — MIT 라이선스
- `jsdom`: ^26.0.0 — MIT 라이선스 (Vitest DOM 환경)

**패키지 정당화** (헌법 V조 — 단순성):
- 현재 단위 테스트 실행 방법이 전혀 없음 → `vitest` 필수
- `@testing-library/react`는 표준 라이브러리로 대안이 없음
- `@storybook/experimental-addon-test`는 기존 stories를 재활용하여 중복 테스트 코드 방지

**구현 방식**:
```typescript
// vitest.config.ts (packages/ui/)
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.tsx', 'src/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/index.ts'],
    },
  },
});
```

**대안 검토**:
- Jest: TypeScript + Vite 환경에서 설정 복잡도 높음, 불채택
- Playwright component testing: 브라우저 기반으로 단위 테스트에 과도함, 불채택

---

## R5. 접근성 테스트 + 위반 수정 (FR-006)

**결정**: `@storybook/addon-a11y` (기존) + 수동 위반 수정

**근거**:
- `@storybook/addon-a11y`는 이미 설치되어 있고 axe-core를 사용하여 WCAG 2.1 기준으로 검사한다.
- `test-storybook` 실행 시 `--accessibility` 플래그로 a11y 검사를 자동화할 수 있다.
- FR-006 요구사항: 위반 0건 — 컴포넌트 소스 수정이 필요할 수 있음(헌법 III조 WCAG 2.1 AA 직접 지원).
- 현재 위반 항목은 구현 전 감사가 필요하다 — 주요 예상 이슈:
  - 명암비 부족 (ghost/muted variant)
  - 버튼에 `aria-label` 누락 (icon-only buttons)
  - interactive 요소에 accessible name 누락

**추가 패키지**: 없음 (기존 `axe-playwright` 활용)

---

## R6. 시각적 회귀 테스트 (FR-007)

**결정**: `@storybook/test-runner` (기존) + Playwright `toHaveScreenshot()` 확장

**근거**:
- `@storybook/test-runner` 0.24.3이 이미 설치되어 있으며 Playwright 기반으로 동작한다.
- `setup.ts`(jest-playwright 설정)에 `toHaveScreenshot()` 또는 커스텀 스냅샷 훅을 추가하면 각 스토리의 스크린샷을 캡처하고 비교할 수 있다.
- 기준선 스냅샷은 `__snapshots__/` 디렉토리에 저장되며 git에 커밋한다(clarification Q5).
- Playwright의 `toHaveScreenshot()`은 픽셀 단위 비교를 지원하며 임계값 설정이 가능하다.

**구현 방식**:
```typescript
// packages/ui/.storybook/test-runner-setup.ts
import { toHaveScreenshot } from '@playwright/test';
import { getStoryContext } from '@storybook/test-runner';

module.exports = {
  async postVisit(page, context) {
    await expect(page).toHaveScreenshot(`${context.id}.png`, {
      maxDiffPixelRatio: 0.02,  // 2% 픽셀 차이 허용
    });
  },
};
```

**추가 패키지**: 없음 (`playwright` + `@storybook/test-runner` 기존 활용)

**대안 검토**:
- `@chromatic-com/storybook`: 외부 서비스, 유료 — 명시적 제외
- `jest-image-snapshot`: jest 종속, vitest 환경에서 불필요한 복잡도 → 불채택
- `@storybook/addon-storyshots`: deprecated in Storybook 8+ → 불채택

---

## 수정 대상 파일 요약

| 영역 | 파일 | 작업 |
|------|------|------|
| Controls 설정 | `packages/ui/.storybook/preview.tsx` | `controls.expanded: true`, `docs.source.type: 'dynamic'` |
| argTypes 수동 정의 | `packages/ui/src/stories/*.stories.tsx` 등 | union 타입 추론 실패 컴포넌트에 `argTypes` 추가 |
| 단위 테스트 환경 | `packages/ui/vitest.config.ts` | 신규 생성 |
| 단위 테스트 파일 | `packages/ui/src/**/*.test.tsx` | 신규 생성 (8개 주요 컴포넌트) |
| 시각적 스냅샷 설정 | `packages/ui/.storybook/test-runner-setup.ts` | 신규 생성 |
| 기준선 스냅샷 | `packages/ui/__snapshots__/` | 신규 생성 후 git 커밋 |
| package.json | `packages/ui/package.json` | vitest 관련 패키지 추가 |

---

## 미해결 사항

없음. 모든 NEEDS CLARIFICATION 해소됨.
