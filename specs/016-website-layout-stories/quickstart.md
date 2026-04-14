# Quickstart: 10가지 웹사이트 레이아웃 스토리북 추가

**Phase**: 1 | **Date**: 2026-04-14 | **Branch**: `016-website-layout-stories`

## 개요

이 가이드는 구현자가 10가지 웹사이트 레이아웃 스토리를 빠르게 파악하고 작업을 시작하기 위한 참조 문서다.

---

## 환경 설정

```bash
# 의존성 설치
pnpm install

# Storybook 개발 서버 실행
pnpm --filter @myorg/ui storybook
```

브라우저에서 `http://localhost:6006` 접속 → 사이드바 `Page/Layouts` 카테고리에서 기존 레이아웃 스토리 확인.

---

## 파일 위치

모든 신규 스토리 파일은 아래 경로에 생성:

```
packages/ui/src/stories/layouts/
```

기존 파일(`BrandSiteLayout.stories.tsx` 등)을 참조 패턴으로 활용.

---

## 스토리 파일 구조 패턴

각 레이아웃 스토리는 아래 구조를 따른다:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
// @myorg/ui 컴포넌트 import
import { Button } from '../../components/button';
// ... 필요한 컴포넌트만 import

// --- 플레이스홀더 상수 ---
const NAV_ITEMS = ['제품', '가격', '문서', '회사'];
const HEADING = '명확한 헤딩 텍스트';
const BODY = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

// 이미지 플레이스홀더 컴포넌트
const ImageBlock = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-muted rounded-lg ${className}`}
    aria-label="이미지 플레이스홀더"
  />
);

// --- Storybook Meta ---
const meta = {
  title: 'Page/Layouts/[PatternName]',  // 예: 'Page/Layouts/ZPattern'
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## [레이아웃 이름]

[레이아웃 설명 1~2문장]

**적용된 품질 특성:**
- ✅ [특성 1]
- ✅ [특성 2]

**적합한 사용 사례:** [사용 사례 목록]
        `,
      },
    },
  },
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      {/* 레이아웃 구현 */}
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant
export const Default: Story = {};

// 두 번째 variant (패턴에 따라 다름)
export const WithCTA: Story = {
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      {/* CTA 강조 변형 */}
    </div>
  ),
};
```

---

## Tailwind 반응형 breakpoint 적용

```tsx
// 모바일 우선 → sm(640px) → md(768px) → lg(1024px)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* ... */}
</div>

// Z-pattern: 데스크탑에서 좌우 2컬럼, 모바일에서 단일 컬럼
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
  <div>{/* 텍스트 영역 */}</div>
  <ImageBlock className="aspect-video" />
</section>
```

---

## 이미지 플레이스홀더 색상 가이드

| 용도 | Tailwind 클래스 |
|------|----------------|
| 일반 이미지 영역 | `bg-muted` |
| 히어로/주요 이미지 | `bg-primary/10` |
| 배경 전체 채움 | `bg-secondary` |
| 다크 오버레이 | `bg-foreground/80` |
| 카드 썸네일 | `bg-accent` |

---

## 10가지 레이아웃 구현 핵심 힌트

| 레이아웃 | 구현 핵심 |
|---|---|
| Z-pattern | 헤더 → 우측 히어로 이미지 → 좌측 본문 → 우측 CTA 배치 |
| F-pattern | 상단 전체 폭 + 하단 좌측 집중 콘텐츠 (우측 여백 활용) |
| Fullscreen image | `min-h-svh relative` + 전체 배경 블록 + `absolute` 중앙 텍스트/CTA |
| Split screen | `grid grid-cols-1 lg:grid-cols-2 min-h-svh` |
| Asymmetrical | `grid grid-cols-3` 또는 `grid-cols-5` 비균등 컬럼 (예: 2:1, 3:2) |
| Single column | `max-w-2xl mx-auto` 단일 컬럼 세로 스크롤 |
| Box-based | `grid grid-cols-2 lg:grid-cols-4` 균등 박스 그리드 |
| Cards | shadcn/ui `Card` 컴포넌트 활용, `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Magazine | `grid grid-cols-12` 비정형 배치 (피처드 아티클 `col-span-8` 등) |
| Horizontal strips | `flex flex-col` + 섹션마다 `w-full` 교대 배경색 |

---

## 완료 기준 체크

각 스토리 파일 완성 후 확인:

- [ ] Storybook `Page/Layouts/[이름]`에서 오류 없이 렌더링
- [ ] `Default` + 1개 이상 variant export
- [ ] `parameters.docs.description`에 품질 특성 명시
- [ ] 모바일/태블릿/데스크탑 뷰포트 전환 시 레이아웃 구조 유지
- [ ] `@storybook/addon-a11y` 검사 통과
