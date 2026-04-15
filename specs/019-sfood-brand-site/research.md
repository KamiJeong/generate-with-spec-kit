# Research: SFood 브랜드 사이트

**Feature**: `019-sfood-brand-site`  
**Date**: 2026-04-15

---

## 1. React Router v7 클라이언트 라우팅

**Decision**: React Router v7 (`react-router`) 사용, `BrowserRouter` + `<Routes>` 방식으로 클라이언트 사이드 라우팅 구현  
**Rationale**:
- `packages/web`은 React 19 기반으로 React Router v7과 완전 호환
- React Router v7은 Data API, Lazy Loading, Nested Routes를 지원하나, 정적 콘텐츠 단순 사이트에는 `BrowserRouter` + flat routes로 충분
- Vite SPA에서 직접 URL 접근 시 404 이슈 → `vite.config.ts`에서 `server.historyApiFallback: true` 설정으로 해결

**Alternatives considered**:
- TanStack Router: 타입 안전성 우수하나 이 규모에서 오버엔지니어링
- Next.js App Router: SSR/SSG 불필요, 번들 크기 과대
- 파일 기반 정적 HTML: URL 라우팅 불가, SPA 비호환

---

## 2. Sticky 헤더 + 스크롤 투명→불투명 전환

**Decision**: `useState` + `useEffect`로 `window.scrollY`를 추적해 스크롤 위치 0일 때 투명, 그 외 브랜드 배경색(`bg-sfood-red`) 적용  
**Rationale**:
- 외부 라이브러리 없이 표준 DOM API로 구현 가능 (단순성 원칙)
- CSS transition `duration-300`으로 부드러운 전환 처리
- `will-change: background-color`로 레이아웃 흔들림 방지

**Pattern**:
```tsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

---

## 3. 모바일 햄버거 드로어 메뉴

**Decision**: `@myorg/ui`의 Sheet 컴포넌트(Radix UI Dialog 기반)를 활용한 오버레이 드로어  
**Rationale**:
- 기존 디자인 시스템 컴포넌트 재사용 (UX 일관성 원칙 준수)
- Radix UI Sheet는 접근성(포커스 트랩, ESC 닫기, aria-*)이 내장되어 WCAG 2.1 AA 요건 충족
- 모바일(`md:hidden`)에서만 노출, 데스크톱은 인라인 내비게이션 표시

---

## 4. 데스크톱 드롭다운 서브메뉴 (고객지원)

**Decision**: CSS Hover + `@myorg/ui` NavigationMenu 또는 커스텀 `group/peer` Tailwind 패턴  
**Rationale**:
- `@myorg/ui`에 NavigationMenu 컴포넌트가 존재할 경우 우선 사용
- 없을 경우 Tailwind `group-hover:` 패턴으로 순수 CSS 드롭다운 구현 (JS 불필요, 성능 우수)
- 모바일 드로어 내에서는 Accordion 컴포넌트로 서브메뉴 처리

---

## 5. SFood 커스텀 컬러 팔레트

**Decision**: `index.css`의 `@theme` 블록에 CSS 변수로 SFood 브랜드 컬러 정의  
**Rationale**:
- `packages/web/src/index.css`와 동일한 Tailwind v4 `@theme` 패턴 적용
- `@myorg/tokens` 시멘틱 토큰을 오버라이드하지 않고 SFood 전용 변수를 추가 레이어로 정의
- 브랜드 일관성을 위해 전역 CSS 변수로 중앙 관리

**컬러 팔레트**:
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--sfood-red` | `350 72% 38%` (HSL) | 주 강조색 (≈ #B01020) |
| `--sfood-red-light` | `350 72% 95%` | 배경 틴트 |
| `--sfood-cream` | `40 30% 97%` | 오프화이트 배경 (≈ #FAF8F5) |
| `--sfood-dark` | `210 15% 15%` | 텍스트 다크 |
| `--sfood-gold` | `38 80% 52%` | 수상·강조 액센트 |

---

## 6. 테스트 전략

**Decision**: Vitest + Testing Library, 페이지 컴포넌트 렌더링 + 콘텐츠 데이터 타입 검증 위주  
**Rationale**:
- `packages/web`과 동일한 테스트 인프라(jsdom, `@testing-library/react`)로 일관성 유지
- 정적 사이트 특성상 유닛 테스트 초점: 각 페이지가 올바른 텍스트·섹션을 렌더링하는지 검증
- 라우팅 테스트: `MemoryRouter`로 각 경로 렌더링 확인
- 커버리지 목표: src/** 80% 이상 (constitution 준수)
- FAQ 아코디언 인터랙션 테스트: `userEvent.click()` 사용

---

## 7. `app/` 패키지 구조 설정

**Decision**: `app/sfood-brand/package.json`의 `name`은 `@myorg/sfood-brand`, pnpm workspace에 등록  
**Rationale**:
- 기존 `packages/` 외 `app/` 최상위 디렉토리를 신설해 브랜드 앱 영역 분리
- `pnpm-workspace.yaml`에 `app/*` 패턴 추가 필요
- `@myorg/ui`, `@myorg/tokens`를 `workspace:*`로 참조해 모노레포 일관성 유지

---

## 해결된 NEEDS CLARIFICATION 없음

모든 기술적 결정이 스펙·명확화 단계에서 확정됨.
