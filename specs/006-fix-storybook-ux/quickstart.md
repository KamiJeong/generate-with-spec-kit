# 빠른 시작: Storybook 품질 개선 가이드

**Feature**: 006-fix-storybook-ux | **Date**: 2026-04-03

## 수정 패턴

### 1. Biome 포맷팅 일괄 수정

```bash
# packages/ui 디렉토리에서 실행
cd packages/ui
pnpm biome check --write src .storybook

# 전체 결과 확인
pnpm lint
```

이 명령 하나로 116개 포맷팅 에러 해결.

---

### 2. variant 스토리에 render 함수 추가 (Controls 수정)

**Before (args만 있고 render 없음 — Controls 미동작)**:
```typescript
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
}
```

**After (render 함수 추가 — Controls 정상 동작)**:
```typescript
export const Destructive: Story = {
  render: (args) => <Button {...args} />,
  args: { variant: 'destructive', children: 'Destructive' },
}
```

**규칙**:
- `Default` 스토리와 meta `render`는 변경하지 않는다 (play 테스트 보호).
- args 패턴을 사용하는 variant/size 스토리에만 적용한다.
- render 패턴을 이미 사용하는 스토리(Sizes, IconSizes, Variants 등)는 수정하지 않는다.

---

### 3. Storybook preview.ts 뷰포트 설정

```typescript
// packages/ui/.storybook/preview.ts
const preview: Preview = {
  parameters: {
    layout: 'padded',          // 'centered' → 'padded' (더 넓은 표시)
    viewport: {
      defaultViewport: 'desktop1280',
      viewports: {
        desktop1280: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
        tablet768: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
      },
    },
    // ... 기존 controls, a11y 설정 유지
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);

      return <Story />;       // Story() → <Story /> (React 권장 패턴)
    },
  ],
};
```

**주의**: `fullscreen` 레이아웃이 필요한 스토리(DashboardPage, AuthPage)는 이미 개별 `parameters: { layout: 'fullscreen' }`으로 설정되어 있으므로 전역 변경의 영향을 받지 않는다.

---

## 적용 대상 스토리 파일 (render 수정 필요)

args 패턴을 사용하는 variant 스토리가 있는 파일:

| 파일 | 수정 대상 스토리 |
|------|----------------|
| `src/stories/button.stories.tsx` | Destructive, Outline, Secondary, Ghost, Link |
| `src/components/badge.stories.tsx` | Secondary, Destructive, Outline, Ghost, Link |
| `src/stories/spinner.stories.tsx` | Small, Large |
| `src/components/avatar.stories.tsx` | Small, Large |
| `src/components/switch.stories.tsx` | Small |

render 패턴 사용 스토리(수정 불필요):
- button: Sizes, IconSizes, Variants (이미 render 함수 있음)
- badge: Variants (이미 render 함수 있음)
- alert: Destructive (render 패턴)
- tabs: Line, Vertical (render 패턴)
- sheet: Left, Top, Bottom (render 패턴)
- avatar: WithBadge, Group (render 패턴)

---

## 검증 방법

```bash
# 1. 린트 검사
pnpm --filter @myorg/ui lint

# 2. 빌드 검증
pnpm --filter @myorg/ui build-storybook

# 3. 개발 서버 실행 후 브라우저 콘솔 에러 0건 확인
pnpm --filter @myorg/ui storybook

# 4. play 테스트 regression 없음 확인
pnpm --filter @myorg/ui test-storybook
```
