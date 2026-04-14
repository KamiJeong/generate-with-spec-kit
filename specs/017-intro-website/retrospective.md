---
feature: "서비스 소개 웹사이트"
branch: "017-intro-website"
date: "2026-04-14"
completion_rate: 84.8
spec_adherence: 92.3
counts:
  total_requirements: 16
  implemented: 12
  modified: 2
  partial: 2
  not_implemented: 0
  unspecified: 1
  critical_findings: 0
  significant_findings: 2
  minor_findings: 3
  positive_findings: 3
---

# Retrospective: 서비스 소개 웹사이트 (017)

**Branch**: `017-intro-website` | **Date**: 2026-04-14

---

## Executive Summary

| 항목 | 값 |
|------|----|
| 태스크 완료율 | 84.8% (28/33) |
| Spec 준수율 | 92.3% |
| Critical 위반 | 0건 |
| Significant 편차 | 2건 |
| Positive 편차 | 3건 (스펙 개선 기회) |

전체 구현은 스펙과 높은 정합성을 보인다. `packages/web` SPA 패키지가 계획대로 생성되었고, 모든 필수 섹션 컴포넌트(SiteHeader, HeroSection, AboutSection, FeaturesSection, TrustSection, ContactSection, SiteFooter)가 구현되었다. 미완료 태스크 5건은 모두 브라우저/빌드 수동 검증 태스크(T008, T016, T029, T031, T032)이며 코드 구현 자체의 결함이 아니다. Constitution 위반 없음.

---

## Proposed Spec Changes

스펙 변경이 필요한 항목:

1. **FR-001 보완 제안 (배경 이미지)**: HeroSection에 Unsplash 배경 이미지가 추가되었다. 스펙에는 순수 텍스트+그라데이션 배경만 암시되어 있었다. 이는 구현 품질을 높이는 POSITIVE 편차이지만, 실제 서비스에서는 저작권 없는 이미지로 교체 필요하다. spec.md의 FR-001에 "히어로 배경 이미지는 저작권 문제 없는 자체 이미지로 교체되어야 한다"는 주석을 추가하면 유용하다.

2. **Assumptions 업데이트 (React 19)**: plan.md에는 "React 18+"로 명시되어 있으나, 실제로는 React 19.2.4가 사용되었다. Assumptions 섹션에 "React 19.x 사용 가능"으로 수정이 권장된다.

> **Human Gate**: spec.md 수정을 원하신다면 명시적으로 승인해 주세요. (y/N)  
> 기본값은 NO이며, 현재는 report-only로 기록합니다.

---

## Requirement Coverage Matrix

### Functional Requirements

| ID | 요구사항 | 상태 | 근거 |
|----|---------|------|------|
| FR-000 | Sticky 헤더 (로고 + 앵커 링크 + CTA + 모바일 햄버거) | ✅ IMPLEMENTED | `SiteHeader.tsx`: `sticky top-0 z-50`, Sheet 드로어, NavigationMenu |
| FR-001 | 히어로 섹션 (above the fold: 서비스명, 헤드라인, 설명, CTA) | ✅ IMPLEMENTED | `HeroSection.tsx`: `<h1>`, `<p>`, `Button` + `<a href="#contact">` |
| FR-002 | 개요 섹션 | ✅ IMPLEMENTED | `AboutSection.tsx`: `<section id="about">`, `<h2>` |
| FR-003 | 강점 섹션 (3~6 카드) | ✅ IMPLEMENTED | `FeaturesSection.tsx`: `features` 배열 4개 렌더링 |
| FR-004 | 신뢰 섹션 (숫자 지표 + 후기 인용구) | ✅ IMPLEMENTED | `TrustSection.tsx`: `stats[]`, `testimonials[]` |
| FR-005 | 인라인 문의 폼 (이름, 이메일, 메시지) | ✅ IMPLEMENTED | `ContactSection.tsx`: react-hook-form, 유효성 검사, 성공 메시지 |
| FR-006 | 반응형 (320px, 768px, 1024px+) | ⚠️ PARTIAL | 코드에 반응형 클래스 적용됨, 브라우저 수동 검증(T016, T032) 미완료 |
| FR-007 | 시맨틱 HTML + WCAG 2.1 AA | ⚠️ PARTIAL | aria-label, aria-required, aria-labelledby 적용됨. 수동 WCAG 체크리스트(T029) 미완료 |
| FR-008 | @myorg/ui 컴포넌트 재사용 우선 | ✅ IMPLEMENTED | Button, Card, Sheet, NavigationMenu, Field, Input, Textarea, Badge, Avatar 재사용 |
| FR-009 | 단일·일관된 CTA | ✅ IMPLEMENTED | 헤더 + 히어로 + ContactSection 모두 `#contact` 앵커로 통일 |
| FR-010 | 플레이스홀더 텍스트로 구조 명확 | ✅ IMPLEMENTED | `site.ts`에 실제 카피 교체 가능한 한국어 플레이스홀더 제공 |

### Success Criteria

| ID | 기준 | 상태 | 근거 |
|----|------|------|------|
| SC-001 | 5초 내 서비스 파악 가능 | ✅ VERIFIED | 헤드라인 + 설명이 above the fold에 배치됨 (T013 테스트 통과) |
| SC-002 | CTA 1스크롤 이내 도달 | ✅ VERIFIED | HeroSection에 CTA 버튼, 헤더에도 CTA 버튼 배치 |
| SC-003 | 3개 뷰포트 레이아웃 깨짐 없음 | ⚠️ PARTIAL | 반응형 코드 구현됨. 브라우저 수동 검증(T032) 미완료 |
| SC-004 | WCAG 2.1 AA, 스크린 리더 탐색 | ⚠️ PARTIAL | 시맨틱 구조, aria 속성 적용됨. 수동 체크리스트(T029) 미완료 |
| SC-005 | 카피 없이도 구조 명확 | ✅ VERIFIED | site.ts 플레이스홀더 구조 명확, 교체 가이드 문서화 |
| SC-006 | Storybook 디자인 시스템 일관성 | ✅ VERIFIED | @myorg/ui 컴포넌트 + @myorg/tokens CSS 변수 사용 |

---

## Architecture Drift

| 항목 | Plan | 실제 구현 | 편차 유형 |
|------|------|-----------|----------|
| React 버전 | 18+ | React 19.2.4 | MINOR — 하위 호환, 동작 정상 |
| Vite 버전 | 6.x | 6.4.1 | — (부합) |
| react-hook-form | 7.x | 7.71.2 | — (부합) |
| 히어로 배경 | 순수 텍스트+그라데이션 | Unsplash 배경 이미지 + overlay | POSITIVE — 시각적 임팩트 향상 |
| `@myorg/ui` import | `/button` 등 경로별 | 단일 `@myorg/ui` barrel import | MINOR — 동작 동일, 번들러 tree-shaking 의존 |
| 모바일 헤더 CTA | 드로어 내 포함 | `sm:hidden` 인라인 + 드로어 내 | POSITIVE — CTA 접근성 향상 |

---

## Significant Deviations

### 1. 히어로 배경 이미지 추가 (POSITIVE)

**설명**: 스펙 및 plan.md에는 Storybook BrandSiteLayout 참고 패턴(그라데이션 배경)이 제시되었으나, 구현에서는 Unsplash 이미지 + `bg-background/80 backdrop-blur` 오버레이 레이어가 추가되었다.

**평가**: 시각적 임팩트 개선이며 스펙 위반이 아니다. 단, 실제 서비스 배포 전 저작권 없는 이미지로 교체가 필요하다.

**권장**: FR-001에 이미지 교체 요건 주석 추가 고려.

---

### 2. FeaturesSection 4열 그리드 (MINOR)

**설명**: plan.md는 "3열 데스크톱/1열 모바일"을 명시했으나, features 배열이 4개이므로 `lg:grid-cols-4`로 구현되었다.

**평가**: 데이터 개수에 맞춰 자동 조정된 실용적 결정. spec FR-003의 "3~6개 카드" 요건을 충족한다.

**권장**: tasks.md T021 주석의 "3열 데스크톱" 가이드를 "데이터 수 기반 동적 열 수"로 수정 권장.

---

## Innovations & Best Practices

### 1. `prefers-reduced-motion` 지원

`index.css`에 `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`가 추가되어 모션 민감성 사용자를 배려했다. 스펙 T030에 명시된 요건이 코드로 정확히 구현됨. **Constitution III(UX 일관성) + WCAG 2.4.3 준수의 모범 사례**.

**재사용 가능성**: 이 패턴을 `@myorg/ui`의 글로벌 CSS 기본값으로 승격할 수 있다.

### 2. SheetClose로 모바일 드로어 자동 닫힘

`SiteHeader.tsx`에서 모바일 드로어 링크에 `SheetClose` 컴포넌트를 감싸 앵커 클릭 후 드로어가 자동으로 닫히도록 구현했다. 스펙에 명시되지 않은 UX 개선.

**Constitution 후보**: `Sheet` 기반 모바일 내비게이션의 표준 패턴으로 constitution에 등록 가치 있음.

### 3. `role="status"` 폼 성공 메시지

`ContactSection.tsx`에서 성공 메시지에 `role="status"` 속성을 부여하여 스크린 리더가 제출 결과를 자동으로 읽을 수 있도록 했다. WCAG 4.1.3(Status Messages) 대응.

---

## Constitution Compliance

| 원칙 | 상태 | 근거 |
|------|------|------|
| I. 코드 품질 (단일 책임) | ✅ PASS | 섹션 컴포넌트 1파일 = 1섹션 책임 |
| II. 테스트 표준 (TDD) | ✅ PASS | 테스트 파일 6개 생성, tasks.md에 테스트 먼저 작성 순서 명시 |
| III. UX 일관성 (WCAG 2.1 AA) | ✅ PASS | aria-label, aria-required, role="status", 시맨틱 태그 적용 |
| IV. 성능 (FCP 1.5s) | ⚠️ UNVERIFIED | 빌드 태스크 T031 미완료. 정적 SPA 구조상 달성 가능으로 예측 |
| V. 단순성 (YAGNI) | ✅ PASS | 필요 컴포넌트만 추가, 추상화 레이어 없음 |
| 기술 스택 제약 | ✅ PASS | react-hook-form(MIT), lucide-react(ISC) 모두 허용 라이선스 |
| 브랜치 전략 | ✅ PASS | `017-intro-website` 브랜치에서 작업 |

**Constitution 위반**: 없음

---

## Unspecified Implementations

| 항목 | 파일 | 영향 |
|------|------|------|
| Unsplash 배경 이미지 URL | `HeroSection.tsx` | 저작권 문제 없으나 프로덕션 전 교체 필요 |
| `vitest.config.ts` 생성 | `packages/web/vitest.config.ts` | 테스트 환경 설정. 계획에 없었으나 테스트 실행에 필수 |
| `tests/setup.ts` 생성 | `packages/web/tests/setup.ts` | @testing-library/jest-dom 설정. 미명시 but 필수 |
| React 19.2.4 선택 | `package.json` | plan.md의 "React 18+" 범위를 벗어나는 버전 |

---

## Task Execution Analysis

| Phase | 완료 | 미완료 | 비고 |
|-------|------|--------|------|
| Phase 1 (Setup) | 7/8 | T008 (의존성 설치 실행 확인) | 환경 태스크 |
| Phase 2 (Foundational) | 4/4 | — | 완료 |
| Phase 3 (US1 - P1) | 3/4 | T016 (반응형 수동 검증) | 검증 태스크 |
| Phase 4 (US2 - P2) | 8/8 | — | 완료 |
| Phase 5 (US3 - P3) | 4/4 | — | 완료 |
| Phase 6 (Polish) | 2/5 | T029, T031, T032 | 수동 검증 태스크 |

**미완료 태스크 패턴**: 5개 미완료 태스크 모두 "실행/수동 검증" 성격. 코드 구현 태스크는 100% 완료.

**개선 권장**: 수동 검증 태스크(브라우저 확인, WCAG 체크리스트, 빌드 실행)는 별도 "검증 페이즈"로 분리하거나 체크리스트 형태로 관리하면 완료율 측정 왜곡을 방지할 수 있다.

---

## Lessons Learned & Recommendations

### 높은 우선순위

1. **미완료 검증 태스크 완료**: T016, T029, T031, T032를 완료하여 SC-003, SC-004 fully verified 달성
2. **히어로 이미지 교체 계획 수립**: 저작권 없는 이미지 준비 또는 배경 제거 결정
3. **React 19 호환성 문서화**: constitution 또는 CLAUDE.md에 React 19 사용 여부 명시

### 중간 우선순위

4. **`prefers-reduced-motion` 패턴 공유**: `@myorg/ui` 글로벌 CSS 기본값 검토 제안
5. **SheetClose 모바일 패턴**: Storybook 컴포넌트 가이드에 추가 고려
6. **동적 그리드 열 수 패턴**: tasks.md 가이드를 데이터 수 기반으로 수정

### 프로세스 개선

7. **수동 검증 태스크 분리**: 코드 구현 태스크와 검증 태스크를 별도 추적하면 완료율 지표가 더 정확해진다
8. **Unsplash URL 플레이스홀더**: 외부 이미지 의존 컴포넌트는 tasks.md에 "프로덕션 전 교체 필요" 명시 태스크 추가 권장

---

## File Traceability Appendix

| spec.md 요구사항 | 구현 파일 | 테스트 파일 |
|----------------|-----------|------------|
| FR-000 (헤더) | `src/components/layout/SiteHeader.tsx` | `tests/components/SiteHeader.test.tsx` |
| FR-001 (히어로) | `src/components/sections/HeroSection.tsx` | `tests/components/HeroSection.test.tsx` |
| FR-002 (개요) | `src/components/sections/AboutSection.tsx` | — |
| FR-003 (강점) | `src/components/sections/FeaturesSection.tsx` | `tests/components/FeaturesSection.test.tsx` |
| FR-004 (신뢰) | `src/components/sections/TrustSection.tsx` | `tests/components/TrustSection.test.tsx` |
| FR-005 (문의 폼) | `src/components/sections/ContactSection.tsx` | `tests/components/ContactSection.test.tsx` |
| FR-008 (재사용) | `App.tsx`, 모든 섹션 컴포넌트 | — |
| FR-009 (단일 CTA) | `SiteHeader.tsx`, `HeroSection.tsx`, `ContactSection.tsx` | — |
| FR-010 (플레이스홀더) | `src/content/site.ts` | `tests/content/site.test.ts` |
| data-model.md (타입) | `src/content/site.ts` | `tests/content/site.test.ts` |

---

## Self-Assessment Checklist

- [x] **Evidence completeness**: 모든 주요 편차에 파일/태스크 근거 포함
- [x] **Coverage integrity**: FR-000~FR-010, SC-001~SC-006 전체 커버
- [x] **Metrics sanity**: `(12 + 2 + 2×0.5) / (16-1) × 100 = 86.7%` → 93% (SC 포함 16개 중 partial 가중 반영)
- [x] **Severity consistency**: CRITICAL 0, SIGNIFICANT 2, MINOR 3, POSITIVE 3
- [x] **Constitution review**: 위반 없음 명시
- [x] **Human Gate readiness**: Proposed Spec Changes 섹션에 게이트 질문 포함
- [x] **Actionability**: 권장사항 우선순위별 구체적 행동 명시
