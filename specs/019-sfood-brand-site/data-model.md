# Data Model: SFood 브랜드 사이트

**Feature**: `019-sfood-brand-site`  
**Date**: 2026-04-15

모든 데이터는 `app/sfood-brand/src/content/` 아래 TypeScript 파일에 정적 상수로 정의된다. 외부 API 없음.

---

## 엔티티 정의

### SiteConfig
**파일**: `content/site.ts`

```ts
interface SiteConfig {
  name: string;          // "SFood" | "에쓰푸드"
  tagline: string;       // 미션 슬로건
  description: string;   // SEO 설명
}
```

### NavItem
**파일**: `content/site.ts`

```ts
interface NavItem {
  label: string;         // 표시 이름
  href: string;          // 경로 (e.g. "/about")
  children?: SubNavItem[]; // 서브메뉴 (고객지원 등)
}

interface SubNavItem {
  label: string;
  href: string;
}
```

### Brand
**파일**: `content/brands.ts`

```ts
type BrandType = 'B2C' | 'B2B';

interface Brand {
  id: string;              // 고유 slug (e.g. "joncook")
  name: string;            // 브랜드명
  type: BrandType;         // B2C | B2B
  tagline: string;         // 슬로건
  categories: string[];    // 대표 제품 카테고리 (e.g. ["프리미엄 소시지", "델리 미트"])
  description: string;     // 소개 문구
  accentColor: string;     // 브랜드 고유 색상 (Tailwind 클래스 또는 hex)
}
// 데이터: B2C 2개(존쿡 델리미트, SFood 홈 그릴), B2B 2개(SFood 프로, SFood 캐터링)
```

### SustainabilityPillar
**파일**: `content/sustainability.ts`

```ts
type PillarArea = '환경' | '사회' | '식품 안전';

interface SustainabilityPillar {
  id: string;
  area: PillarArea;
  title: string;
  description: string;
  metric?: string;         // 수치 목표 (e.g. "2030년까지 탄소 배출 30% 감축")
  icon: string;            // lucide-react 아이콘명
}
```

### TalentPersona
**파일**: `content/talent.ts`

```ts
interface TalentPersona {
  keyword: string;         // 인재상 키워드 (e.g. "도전", "협업", "전문성")
  description: string;
  icon: string;            // lucide-react 아이콘명
}

interface HiringStep {
  order: number;
  title: string;           // "서류 접수", "서류 심사", "면접", "최종 합격"
  description: string;
}

interface Benefit {
  category: string;        // "복지", "성장", "보상"
  title: string;
  description: string;
  icon: string;
}
```

### Notice
**파일**: `content/support.ts`

```ts
interface Notice {
  id: string;
  category: '공지' | '업데이트' | '이벤트';
  title: string;
  date: string;            // ISO 8601 (e.g. "2026-03-15")
  summary: string;
}
```

### NewsItem
**파일**: `content/support.ts`

```ts
interface NewsItem {
  id: string;
  title: string;
  date: string;            // ISO 8601
  summary: string;
  imagePlaceholderColor: string; // Tailwind bg 클래스 (이미지 대체)
}
```

### FaqItem
**파일**: `content/support.ts`

```ts
type FaqCategory = '제품' | '주문·구매' | '회사' | '파트너십';

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}
```

---

## 상태 전이

| 엔티티 | 상태 | 전이 |
|--------|------|------|
| FaqItem | 접힘(closed) ↔ 펼침(open) | 클릭 토글, 단일 열림 또는 다중 열림 모두 허용 |
| SiteHeader | 투명(transparent) → 불투명(solid) | `scrollY > 10` 조건 충족 시 단방향 전환 (스크롤 복귀 시 투명 복귀) |
| MobileMenu | 닫힘(closed) ↔ 열림(open) | 햄버거 버튼 클릭, ESC 키, 오버레이 클릭으로 토글 |

---

## 유효성 규칙

- `Brand.type`: 반드시 `'B2C'` 또는 `'B2B'` 중 하나 (TypeScript union으로 강제)
- `NavItem.children`: 최대 5개 (UI 드롭다운 레이아웃 제약)
- `Notice.date` / `NewsItem.date`: ISO 8601 문자열, `YYYY-MM-DD` 형식
- `HiringStep.order`: 1부터 시작하는 연속 정수 (갭 없음)
- `FaqItem.id`: 전역 고유 slug
