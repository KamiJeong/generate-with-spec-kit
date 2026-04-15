# Spec Drift Report

Generated: 2026-04-15T10:55:00+09:00
Project: generate-with-spec-kit

## Summary

| Category | Count |
|----------|-------|
| Specs Analyzed | 1 (active: 019-sfood-brand-site) |
| Requirements Checked | 19 (FR×12 + SC×7) |
| ✓ Aligned | 17 (89.5%) |
| ⚠️ Drifted | 2 (10.5%) |
| ✗ Not Implemented | 0 (0%) |
| 🆕 Unspecced Code | 2 (의도적, tasks.md 명시) |

---

## Detailed Findings

### Spec: 019-sfood-brand-site — SFood 브랜드 사이트

#### Aligned ✓

- **FR-001**: 클라이언트 사이드 라우팅 8개 경로 → `app/sfood-brand/src/App.tsx:21-29`
- **FR-002**: sticky 헤더 + scrollY>10 불투명 전환 + Sheet 드로어 + NavLink active → `SiteHeader.tsx`, `SiteFooter.tsx`
- **FR-004**: 외부 API 없음 — fetch/axios 0건, `content/*.ts` 정적 데이터만 사용
- **FR-005**: 전체 한국어 가상 콘텐츠, Lorem Ipsum 0건 확인
- **FR-006**: 메인 5개 섹션 — `HeroSection`, `StatsSection`, `BrandsPreviewSection`, `SustainabilityTeaser`, `CtaSection` (`HomePage.tsx:15-19`)
- **FR-007**: B2C 2개 + B2B 2개 카드 그리드 구분 → `BrandsGrid.tsx:5-6`, `brands.ts`
- **FR-008**: `/talent` 인재상·채용 프로세스·복리후생 → `PersonaSection`, `ProcessSection`, `BenefitsSection`
- **FR-009**: FAQ `@myorg/ui Accordion` (`type="multiple"`) + 카테고리 필터 탭 → `AccordionFaq.tsx:46`
- **FR-010**: Tailwind `sm:`, `lg:` 반응형 클래스 전체 컴포넌트에 적용
- **FR-011**: `@theme` 블록 5개 SFood 커스텀 컬러 토큰 → `index.css:36-40`
- **FR-012**: FSSC 22000, HACCP, DLG 국제 품평회 배지·아이콘 → `CertificationSection.tsx:6,15,24`
- **SC-001**: 8개 라우트 빌드 성공 (TypeScript 0 오류, Vite 빌드 통과)
- **SC-002**: 헤더 내비게이션에서 모든 서브 페이지 1클릭 도달
- **SC-004**: 전체 한국어 가상 콘텐츠 완비, Lorem Ipsum 0건
- **SC-005**: `bg-sfood-red`, `text-sfood-gold`, `bg-sfood-cream` 등 브랜드 컬러 일관 적용
- **SC-006**: FAQ 아코디언 `userEvent.click()` 테스트 통과 (`FaqPage.test.tsx`)
- **SC-007**: 모든 NavLink/Link → App.tsx 라우트 대응; 미매핑 경로는 `NotFoundPage`로 처리

#### Drifted ⚠️

- **FR-003**: Spec — "모바일 드로어에서는 **아코디언 서브메뉴**를 제공"  
  Implementation — `SiteHeader.tsx:129-156`: `useState(mobileSubOpen)` 커스텀 toggle + ChevronDown 애니메이션. `@myorg/ui Accordion` 미사용.  
  - Location: `app/sfood-brand/src/components/layout/SiteHeader.tsx:129-156`  
  - Severity: **minor** — 기능·시각 동일, 사용자 경험 차이 없음

- **SC-003**: 반응형 검증(375px/768px/1280px) — Tailwind 반응형 클래스로 구현됨. 브라우저 수동 시각 검증 미완료(T054 Phase 9 태스크).  
  - Location: `app/sfood-brand/src/` 전체  
  - Severity: **minor** — 코드 구조 완비, 수동 검증 권장

#### Not Implemented ✗

없음.

---

### Unspecced Code 🆕

| Feature | Location | Rationale |
|---------|----------|-----------|
| FAQ 카테고리 필터 탭 | `AccordionFaq.tsx:19-32` | FR-009 초과 구현이나 UX 개선. spec 위반 없음 |
| `document.title` 동적 업데이트 | 각 `*Page.tsx` (`useEffect`) | T056 태스크 명시 구현 |

---

## Inter-Spec Conflicts

없음.

---

## Recommendations

1. **FR-003 (minor)**: 모바일 드로어 서브메뉴를 `@myorg/ui Accordion` 교체 시 spec 표현 완전 일치. 선택적.
2. **SC-003**: `pnpm --filter @myorg/sfood-brand dev` 후 375px/768px/1280px 수동 검증 권장.
3. **PR 준비**: Critical/High drift 없음 — `019-sfood-brand-site` PR 생성 가능.
