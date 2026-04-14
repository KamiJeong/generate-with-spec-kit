# Quickstart: 서비스 소개 웹사이트 (017)

**Branch**: `017-intro-website` | **Date**: 2026-04-14

---

## 전제조건

- Node.js 20+, pnpm 10+
- 리포지토리 클론 및 `pnpm install` 완료

## 개발 서버 실행

```bash
# packages/web 패키지 개발 서버
pnpm --filter @myorg/web dev
```

기본 포트: `http://localhost:5173`

## 빌드

```bash
pnpm --filter @myorg/web build
```

출력: `packages/web/dist/`

## 테스트

```bash
pnpm --filter @myorg/web test
```

## 린트

```bash
pnpm --filter @myorg/web lint
```

---

## 패키지 구조

```text
packages/web/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx       # sticky 헤더 + 모바일 Sheet 드로어
│   │   │   └── SiteFooter.tsx       # 푸터
│   │   └── sections/
│   │       ├── HeroSection.tsx      # FR-001
│   │       ├── AboutSection.tsx     # FR-002
│   │       ├── FeaturesSection.tsx  # FR-003
│   │       ├── TrustSection.tsx     # FR-004
│   │       └── ContactSection.tsx   # FR-005
│   ├── content/
│   │   └── site.ts                  # 정적 콘텐츠 데이터 (SiteConfig, Feature[], Stat[], Testimonial[])
│   ├── App.tsx                      # 전체 페이지 조합
│   ├── main.tsx                     # Vite 진입점
│   └── index.css                    # Tailwind CSS v4 진입점
├── tests/
│   ├── components/
│   │   ├── SiteHeader.test.tsx
│   │   ├── HeroSection.test.tsx
│   │   ├── FeaturesSection.test.tsx
│   │   ├── TrustSection.test.tsx
│   │   └── ContactSection.test.tsx  # 폼 유효성 검사 포함
│   └── content/
│       └── site.test.ts             # 데이터 제약(강점 3-6개) 검증
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 콘텐츠 수정 방법

`src/content/site.ts` 파일에서 플레이스홀더 텍스트를 실제 마케팅 카피로 교체한다:

```ts
// src/content/site.ts 예시
export const siteConfig: SiteConfig = {
  name: "[서비스 이름]",
  tagline: "[핵심 가치를 담은 헤드라인]",
  description: "[서비스를 2-3문장으로 설명]",
  ctaLabel: "문의하기",
};

export const features: Feature[] = [
  // 3-6개 항목
];
```

---

## @myorg/ui 컴포넌트 재사용

`packages/web`에서 `@myorg/ui`를 직접 임포트한다:

```ts
import { Button } from '@myorg/ui/button';
import { Card, CardContent } from '@myorg/ui/card';
import { Input } from '@myorg/ui/input';
// ...
```

새 UI 패턴이 필요한 경우, Storybook(`pnpm --filter @myorg/ui storybook`)에서 먼저 기존 패턴을 확인하고 재사용한다.
