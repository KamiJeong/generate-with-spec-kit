# 구현 계획: Storybook 품질 고도화

**Branch**: `007-storybook-setup` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-storybook-setup/spec.md`

## 요약 (Summary)

7가지 Storybook 품질 목표를 달성한다: (1) argTypes 기반 Controls 타입 매핑(union → select), (2) canvas 탭 "Show code" 토글 활성화 및 실시간 업데이트, (3) 뷰포트 설정 검증, (4) Vitest 단위 테스트 환경 구축 및 8개 컴포넌트 테스트 작성, (5) WCAG 접근성 위반 0건 달성, (6) Playwright 기반 시각적 회귀 테스트 및 기준선 git 커밋, (7) 커버리지 리포트 생성. 기존 play 테스트는 모두 유지된다.

## 기술 컨텍스트 (Technical Context)

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3, `@storybook/react-vite`, Biome v2.4.9, Vitest 2.x (신규), `@storybook/experimental-addon-test` (신규)  
**Storage**: N/A (시각적 스냅샷은 로컬 파일시스템 + git)  
**Testing**: Storybook play 테스트(Playwright) 유지 + Vitest 단위 테스트(신규) + Playwright 시각적 스냅샷(기존 test-runner 확장)  
**Target Platform**: `packages/ui/src/` 및 `packages/ui/.storybook/`  
**Project Type**: UI 컴포넌트 라이브러리 (Storybook 문서화 + 테스트)  
**Performance Goals**: N/A  
**Constraints**: 기존 play 테스트 0 regression 유지; CI 자동화 제외; 외부 유료 시각적 테스트 서비스 미사용  
**Scale/Scope**: 8개 주요 컴포넌트 argTypes/단위테스트, 전체 스토리 시각적 스냅샷, 전체 스토리 a11y 검사

## 헌법 검토 (Constitution Check)

*GATE: Phase 0 리서치 전 통과 필요. Phase 1 설계 후 재검토.*

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 | ✅ 통과 | argTypes 설정은 명확한 의도 전달; 단위 테스트 추가로 코드 품질 증거 확보 |
| II. 테스트 표준 | ✅ 직접 지원 | TDD 방식으로 단위 테스트 작성; 커버리지 리포트로 80% 목표 검증; play 테스트 유지 |
| III. UX 일관성 | ✅ 직접 지원 | WCAG 2.1 AA 위반 0건 달성; Controls UX 일관성(select 통일) |
| IV. 성능 요구사항 | ✅ 해당 없음 | 스토리/설정 파일 수정 — 런타임 성능 무영향 |
| V. 단순성 | ⚠️ 복잡도 증가 정당화 필요 | 신규 패키지 6개 추가 (Complexity Tracking 참조) |

**결론**: V조 복잡도 추가에 대해 Complexity Tracking 문서화 완료. 모든 게이트 통과.

## Complexity Tracking

| 위반 | 필요 이유 | 단순한 대안이 불가한 이유 |
|------|-----------|--------------------------|
| `vitest` 신규 추가 | 단위 테스트 실행 환경이 현재 없음 | Jest는 Vite/TypeScript 환경에서 설정 복잡도가 더 높음 |
| `@vitest/coverage-v8` 신규 추가 | FR-008 커버리지 리포트 필수 | vitest의 공식 커버리지 제공자, 대안 없음 |
| `@storybook/experimental-addon-test` 신규 추가 | Storybook 스토리를 vitest 테스트로 재활용 | 스토리 중복 작성 방지; Storybook 10.x 공식 통합 방식 |
| `@testing-library/react` 신규 추가 | 컴포넌트 렌더링/인터랙션 테스트 필수 | 업계 표준, 대안 없음(Enzyme deprecated) |
| `@testing-library/jest-dom` 신규 추가 | DOM assertion matchers | `@testing-library/react`의 필수 동반 패키지 |
| `jsdom` 신규 추가 | vitest DOM 환경 | JSDOM 없이 React 컴포넌트 단위 테스트 불가 |

## 프로젝트 구조 (Project Structure)

### 문서화 (이 기능)

```text
specs/007-storybook-setup/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # /speckit.tasks에서 생성
```

### 수정/신규 생성 파일

```text
packages/ui/
├── .storybook/
│   ├── preview.tsx              # 수정: controls.expanded, docs.source.type
│   └── test-runner-setup.ts    # 신규: 시각적 스냅샷 설정
├── src/
│   ├── components/
│   │   ├── button.test.tsx      # 신규: Button 단위 테스트
│   │   ├── badge.test.tsx       # 신규: Badge 단위 테스트
│   │   ├── alert.test.tsx       # 신규: Alert 단위 테스트
│   │   ├── spinner.test.tsx     # 신규: Spinner 단위 테스트
│   │   ├── switch.test.tsx      # 신규: Switch 단위 테스트
│   │   ├── avatar.test.tsx      # 신규: Avatar 단위 테스트
│   │   ├── tabs.test.tsx        # 신규: Tabs 단위 테스트
│   │   └── sheet.test.tsx       # 신규: Sheet 단위 테스트
│   └── stories/
│       └── button.stories.tsx   # 수정 가능: argTypes 보완 (필요 시)
├── vitest.config.ts             # 신규: vitest + coverage 설정
├── package.json                 # 수정: vitest 관련 devDependencies 추가
└── __snapshots__/               # 신규: 시각적 스냅샷 기준선 (git 커밋)
```

## 수정 내용 상세

### preview.tsx 변경

| 항목 | 변경 전 | 변경 후 | 이유 |
|------|--------|--------|------|
| `controls.expanded` | 없음 | `true` | 모든 prop Controls 패널에 표시 |
| `docs.source.type` | 없음 | `'dynamic'` | Controls 변경 시 코드 실시간 반영 |

### 신규 패키지 (devDependencies)

| 패키지 | 버전 | 라이선스 | 역할 |
|--------|------|----------|------|
| `vitest` | ^2.0.0 | MIT | 단위 테스트 러너 |
| `@vitest/coverage-v8` | ^2.0.0 | MIT | 커버리지 리포트 |
| `@storybook/experimental-addon-test` | 10.3.3 | MIT | Storybook-Vitest 통합 |
| `@testing-library/react` | ^16.0.0 | MIT | 컴포넌트 렌더링 테스트 |
| `@testing-library/jest-dom` | ^6.0.0 | MIT | DOM assertion matchers |
| `jsdom` | ^26.0.0 | MIT | vitest DOM 환경 |

### vitest.config.ts 핵심 설정

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.tsx', 'src/stories/**/*.tsx'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/index.ts'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
```

### 단위 테스트 구조 (8개 컴포넌트)

각 컴포넌트 테스트 파일은 다음을 포함한다:
1. 기본 렌더링 (snapshot or toBeInTheDocument)
2. variant/size props 반영 확인
3. disabled 상태 처리
4. 주요 이벤트 핸들링 (onClick 등)

### 시각적 스냅샷 설정

```typescript
// .storybook/test-runner-setup.ts
module.exports = {
  async postVisit(page, context) {
    await expect(page).toHaveScreenshot(`${context.id}.png`, {
      maxDiffPixelRatio: 0.02,
    });
  },
};
```

기준선 스냅샷 초기 생성: `test-storybook --snapshot-update`

## 현재 상태 vs 목표 상태

| 문제 | 현재 | 목표 |
|------|------|------|
| union prop Controls 위젯 | 텍스트 입력 | select 위젯 |
| 코드 표시 | 비활성/미설정 | canvas "Show code" 토글 |
| 단위 테스트 | 없음 | 8개 컴포넌트 테스트 작성 |
| 접근성 위반 | 미감사 | 0건 달성 |
| 시각적 테스트 | 없음 | 기준선 스냅샷 생성 + git 커밋 |
| 커버리지 리포트 | 없음 | HTML + lcov 리포트 생성 |
| 뷰포트 | 이미 설정됨 | 검증만 수행 |
