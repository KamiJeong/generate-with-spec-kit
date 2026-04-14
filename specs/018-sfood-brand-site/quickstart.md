# Quickstart: SFood 브랜드 사이트 구축

**Branch**: `018-sfood-brand-site` | **Date**: 2026-04-14

## 전제조건

- Node.js 20+
- pnpm 10+
- 리포지토리 루트에서 `pnpm install` 완료

## 개발 서버

```bash
pnpm --filter @myorg/sfood dev
```

기본 URL은 Vite 기본값인 `http://localhost:5173`이다. 포트가 사용 중이면 Vite가 다른 포트를 안내한다.

## 빌드

```bash
pnpm --filter @myorg/sfood build
```

예상 출력 경로:

```text
packages/sfood/dist/
```

## 테스트

```bash
pnpm --filter @myorg/sfood test
```

TDD 우선순위:

1. `routes.test.ts`: FR-001의 8개 경로, nav path, 404 fallback 검증
2. `sfood-content.test.ts`: 기사 날짜 역순, 브랜드 B2B/B2C 존재, 인증 3종, FAQ/이미지 alt 필수 검증
3. `SiteHeader.test.tsx`: desktop nav, mobile Sheet, active route 표시 검증
4. `FaqAccordion.test.tsx`: 단일 모드 아코디언 동작 검증
5. 페이지 테스트: 각 페이지 핵심 섹션과 문구 렌더링 검증

## 린트

```bash
pnpm --filter @myorg/sfood lint
```

## 수동 검증

개발 서버 실행 후 다음 경로를 직접 확인한다:

```text
/
/about
/sustainability
/brands
/talent
/support/notice
/support/news
/support/faq
```

반응형 기준 viewport:

```text
320px
768px
1280px
```

검증 항목:

- 모든 내부 링크가 정상적으로 경로를 변경한다.
- 현재 경로가 헤더 메뉴에서 시각적으로 구분된다.
- 모바일에서는 Sheet 메뉴가 키보드와 클릭으로 열리고 닫힌다.
- FAQ는 한 번에 하나의 항목만 열린다.
- 뉴스/공지 목록은 날짜 역순이다.
- 이미지 alt 텍스트가 존재한다.
- 콘솔 런타임 오류가 없다.

### 2026-04-14 구현 세션 상태

의존성 링크가 새 패키지에 생성되지 않아 개발 서버와 viewport 검증은 아직 실행하지 못했다. `pnpm --filter @myorg/sfood test`는 `vitest` 실행 파일을 찾지 못해 시작 전에 중단되었고, offline install은 pnpm의 module purge 확인 프롬프트에서 멈춰 변경 없이 종료되었다. lockfile-only offline install은 `packages/sfood` importer를 추가했지만 `@vitest/coverage-v8` tarball이 로컬 store에 없어 전체 설치를 완료하지 못했다.

| Viewport | Result | Note |
|----------|--------|------|
| 320px | Not run | `@myorg/sfood` dependency links missing |
| 768px | Not run | `@myorg/sfood` dependency links missing |
| 1280px | Not run | `@myorg/sfood` dependency links missing |

## 구현 메모

- `packages/web` 설정을 레퍼런스로 삼되 package name과 alias는 각각 `@myorg/sfood`, `@sfood/*`로 분리한다.
- `src/index.css`에서 `@import "@myorg/tokens/css";`, `@import "tailwindcss";`, `@source "../../ui/src";` 패턴을 유지한다.
- SFood 브랜드 색상은 CSS 변수에만 선언하고 컴포넌트 JSX에는 semantic utility class만 사용한다.
- `@myorg/ui`에서 제공하는 컴포넌트를 우선 사용한다: `NavigationMenu`, `Sheet`, `Tabs`, `Accordion`, `Card`, `Badge`, `Separator`, `Button`.
- 외부 API, CMS, DB, 로그인, 검색, 이커머스, 상세 페이지는 이번 범위에 포함하지 않는다.
