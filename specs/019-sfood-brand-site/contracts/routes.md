# Route Contracts: SFood 브랜드 사이트

**Feature**: `019-sfood-brand-site`  
**Date**: 2026-04-15  
**Router**: React Router v7, BrowserRouter (클라이언트 사이드 SPA)

---

## 라우트 정의

| 경로 | 컴포넌트 | 페이지 제목 | 설명 |
|------|----------|------------|------|
| `/` | `HomePage` | SFood - 더 좋은 식품으로 더 좋은 세상을 | 메인 랜딩 페이지 |
| `/about` | `AboutPage` | 회사소개 - SFood | 미션·비전·연혁·품질 인증 |
| `/sustainability` | `SustainabilityPage` | 지속가능성 - SFood | ESG 활동·2030 목표 |
| `/brands` | `BrandsPage` | 브랜드 - SFood | B2C/B2B 브랜드 카드 그리드 |
| `/talent` | `TalentPage` | 인재채용 - SFood | 인재상·채용 프로세스·복리후생 |
| `/support/notice` | `NoticePage` | 공지사항 - SFood | 공지사항 목록 |
| `/support/news` | `NewsPage` | 회사소식 - SFood | 뉴스 카드 목록 |
| `/support/faq` | `FaqPage` | FAQ - SFood | 아코디언 FAQ |
| `*` | `NotFoundPage` | 페이지를 찾을 수 없습니다 - SFood | 404 폴백 |

---

## 내비게이션 계층 구조

```text
Home (/)
├── 회사소개 (/about)
├── 지속가능성 (/sustainability)
├── 브랜드 (/brands)
├── 인재채용 (/talent)
└── 고객지원 [드롭다운]
    ├── 공지사항 (/support/notice)
    ├── 회사소식 (/support/news)
    └── FAQ (/support/faq)
```

---

## Active 상태 규칙

- `/support/notice`, `/support/news`, `/support/faq` 중 하나에 있을 때 → "고객지원" 메뉴 아이템 active 처리
- `NavLink`의 `isActive` prop 또는 `useMatch('/support/*')` 활용

---

## 라우트 보호 및 리다이렉트

- 인증 없음 (모든 경로 공개 접근)
- `*` 와일드카드 → `NotFoundPage` 렌더링 (메인 리다이렉트는 하지 않고 404 안내 제공)

---

## Vite 개발 서버 설정 (SPA fallback)

```ts
// vite.config.ts
server: {
  historyApiFallback: true,
}
```

빌드 배포 시 정적 서버에서도 `index.html`로 폴백 설정 필요 (Nginx `try_files`, GitHub Pages `404.html` 복사 등).
