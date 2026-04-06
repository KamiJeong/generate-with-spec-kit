# Quickstart: Storybook 품질 고도화

**Branch**: `007-storybook-setup` | **Date**: 2026-04-06

## 핵심 결정사항 요약

| 영역 | 결정 |
|------|------|
| Controls 위젯 | union/enum 타입 → 모두 `select` (일관성) |
| 코드 표시 | canvas 탭 "Show code" 토글 + `docs.source.type: 'dynamic'` |
| 단위 테스트 러너 | Vitest + `@storybook/experimental-addon-test` |
| 커버리지 | `@vitest/coverage-v8` (HTML + lcov 리포트) |
| 접근성 | 위반 0건 달성 (컴포넌트 소스 수정 포함) |
| 시각적 테스트 | `@storybook/test-runner` + Playwright `toHaveScreenshot()` |
| 기준선 저장 | `__snapshots__/` — git 커밋 (팀 공유) |
| CI 자동화 | 제외 |

---

## 빠른 시작: 주요 명령어

```bash
# Storybook 실행
pnpm --filter @myorg/ui storybook

# 단위 테스트 실행
pnpm --filter @myorg/ui test

# 단위 테스트 + 커버리지
pnpm --filter @myorg/ui test:coverage

# play 테스트 (기존 유지)
pnpm --filter @myorg/ui test-storybook

# 시각적 스냅샷 기준선 초기 생성
pnpm --filter @myorg/ui test-storybook -- --snapshot-update

# 시각적 스냅샷 비교 (기준선 대비)
pnpm --filter @myorg/ui test-storybook

# lint
pnpm --filter @myorg/ui lint
```

---

## 핵심 패턴

### 1. argTypes select 위젯 (자동 추론이 동작하는 경우)

`react-docgen-typescript`가 TypeScript union 타입을 자동으로 `select`로 매핑한다. `controls.expanded: true` 설정으로 모든 prop이 Controls 패널에 표시된다.

```typescript
// preview.tsx — 전역 설정
parameters: {
  controls: {
    matchers: { color: /(background|color)$/i, date: /Date$/i },
    expanded: true,   // 추가: 모든 prop 표시
  },
  docs: {
    source: { type: 'dynamic' },  // 추가: Controls 변경 시 코드 실시간 반영
  },
}
```

### 2. argTypes 수동 정의 (자동 추론 실패 시)

```typescript
// 스토리 파일 meta
const meta = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;
```

### 3. 단위 테스트 패턴

```typescript
// button.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('기본 렌더링', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('variant prop 반영', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('disabled 상태', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('onClick 이벤트', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### 4. 시각적 스냅샷 설정

```typescript
// .storybook/test-runner-setup.ts
import { expect } from '@playwright/test';

module.exports = {
  async postVisit(page, context) {
    // 애니메이션 완료 대기
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(`${context.id}.png`, {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  },
};
```

---

## 주의사항

- **play 테스트 보호**: `Default` 스토리의 play 함수와 meta `render`는 절대 변경하지 않는다.
- **argTypes 우선순위**: 스토리 개별 `argTypes`가 meta `argTypes`를 덮어쓴다. meta에 전역 정의 권장.
- **스냅샷 기준선 업데이트**: 의도된 시각적 변경 시 `--snapshot-update` 플래그로 기준선 재생성 후 git 커밋.
- **a11y 위반 수정**: `@storybook/addon-a11y` Accessibility 패널에서 위반 항목 확인 후 컴포넌트 소스 수정.
- **커버리지 제외**: 스토리 파일(`*.stories.tsx`)은 커버리지 측정 대상에서 제외.
