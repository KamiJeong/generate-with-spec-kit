# Implementation Plan: 서비스 소개 웹사이트

**Branch**: `017-intro-website` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/017-intro-website/spec.md`

## Summary

정적 단일 페이지 서비스 소개 사이트를 `packages/web` (Vite + React SPA)으로 구현한다. 기존 `@myorg/ui` 컴포넌트와 `BrandSiteLayout` 스토리 패턴을 최대한 재사용하며, sticky 헤더(모바일 Sheet 드로어 포함), 히어로, 개요, 강점, 신뢰(숫자 지표 + 후기), 인라인 문의 폼 섹션으로 구성된다. WCAG 2.1 AA 접근성과 모바일-퍼스트 반응형 레이아웃을 준수한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+
**Primary Dependencies**: Vite 6.x, @vitejs/plugin-react, @myorg/ui (workspace), @myorg/tokens (workspace), Tailwind CSS v4, lucide-react, react-hook-form
**Storage**: N/A (정적 콘텐츠, 서버 연동 없음)
**Testing**: Vitest 2.x, @testing-library/react
**Target Platform**: 정적 웹 (브라우저), 모바일 320px ~ 데스크톱 1440px+
**Project Type**: web-application (SPA, 단일 페이지)
**Performance Goals**: FCP 1.5초 이하 (Constitution IV), 모바일 3G 기준 3초 이하
**Constraints**: 신규 외부 의존성 최소화, @myorg/ui 컴포넌트 우선 재사용, WCAG 2.1 AA
**Scale/Scope**: 단일 페이지, 5개 섹션, 폼 1개

## Constitution Check

*GATE: spec.md → plan.md 순서 완료. Phase 1 설계 후 재검토.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 | PASS | 섹션별 단일 책임 컴포넌트 분리 |
| II. 테스트 표준 | PASS | Vitest 단위 테스트, 폼 유효성 테스트 포함 |
| III. UX 일관성 | PASS | @myorg/ui 컴포넌트 재사용, WCAG 2.1 AA |
| IV. 성능 | PASS | FCP ≤ 1.5s 목표, 정적 SPA로 달성 가능 |
| V. 단순성 | PASS | Next.js 대신 Vite SPA 선택, 불필요한 SSR 제거 |
| 기술 스택 제약 | PASS | react-hook-form 라이선스(MIT) 검토 완료 |
| 브랜치 전략 | PASS | `017-intro-website` 브랜치 생성됨 |

## Project Structure

### Documentation (this feature)

```text
specs/017-intro-website/
├── plan.md              # 이 파일
├── research.md          # Phase 0 산출물
├── data-model.md        # Phase 1 산출물
├── quickstart.md        # Phase 1 산출물
└── tasks.md             # Phase 2 산출물 (/speckit.tasks 명령 생성)
```

### Source Code (repository root)

```text
packages/web/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx       # sticky 헤더 + 모바일 Sheet 드로어 (FR-000)
│   │   │   └── SiteFooter.tsx       # 푸터
│   │   └── sections/
│   │       ├── HeroSection.tsx      # 히어로 섹션 (FR-001)
│   │       ├── AboutSection.tsx     # 개요 섹션 (FR-002)
│   │       ├── FeaturesSection.tsx  # 강점 카드 섹션 (FR-003)
│   │       ├── TrustSection.tsx     # 신뢰 섹션 - 숫자 지표 + 후기 (FR-004)
│   │       └── ContactSection.tsx   # 인라인 문의 폼 섹션 (FR-005)
│   ├── content/
│   │   └── site.ts                  # 정적 플레이스홀더 콘텐츠 데이터
│   ├── App.tsx                      # 전체 페이지 조합
│   ├── main.tsx                     # Vite 진입점
│   └── index.css                    # Tailwind CSS v4 진입점
├── tests/
│   ├── components/
│   │   ├── SiteHeader.test.tsx      # 햄버거 메뉴 토글, 앵커 링크 렌더링
│   │   ├── HeroSection.test.tsx     # CTA 버튼, 헤드라인 렌더링
│   │   ├── FeaturesSection.test.tsx # 3-6개 카드 렌더링
│   │   ├── TrustSection.test.tsx    # 지표, 후기 렌더링
│   │   └── ContactSection.test.tsx  # 폼 유효성 검사 (이름, 이메일, 메시지)
│   └── content/
│       └── site.test.ts             # 강점 항목 수 제약(3-6개) 검증
├── index.html
├── package.json                     # @myorg/web, @myorg/ui workspace 의존성
├── tsconfig.json
└── vite.config.ts
```

**Structure Decision**: 단일 SPA 패키지(`packages/web`) 선택. 서버/클라이언트 분리 불필요. 섹션별 컴포넌트 파일로 단일 책임 원칙 준수.

## Complexity Tracking

> **Constitution V 위반 없음** — 추가 레이어나 추상화 없이 최소 구조를 유지한다.

| 항목 | 판단 | 근거 |
|------|------|------|
| react-hook-form 도입 | JUSTIFIED | 폼 유효성 검사 로직을 직접 구현하면 중복 코드가 발생하고 접근성(aria-invalid 등)을 수동으로 처리해야 한다. MIT 라이선스, 번들 크기 소형(9kb gzip). |
| 신규 `packages/web` 패키지 | JUSTIFIED | 소개 사이트는 독립적인 배포 단위가 필요하며, `packages/ui`와 분리해야 각자의 빌드/테스트 파이프라인을 유지할 수 있다. |

---

## Phase 0 산출물

→ [research.md](./research.md)

## Phase 1 산출물

→ [data-model.md](./data-model.md)  
→ [quickstart.md](./quickstart.md)
