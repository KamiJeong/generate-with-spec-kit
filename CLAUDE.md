# generate-with-spec-kit Development Guidelines

## Stack
TypeScript 5.x, React 18+, Storybook 10.3.4 (`@storybook/react-vite`), Tailwind CSS v4, shadcn/ui, Radix UI, Biome v2.4.9, Vitest 2.x, tsup v8, `@storybook/addon-vitest`, `@storybook/addon-mcp`, `pretendard`, `@fontsource/noto-sans-kr`

## Project Structure

```text
packages/
  tokens/
    src/
    tests/
  ui/
    src/
    .storybook/
```

## Design System

- Canonical guide: `/DESIGN.md`
- For any UI task, read `/DESIGN.md` first before proposing or editing components.
- Use semantic tokens and existing `@myorg/ui` component variants from that file.

## Commands

pnpm --filter @myorg/tokens build
pnpm --filter @myorg/tokens test
pnpm --filter @myorg/tokens lint
pnpm --filter @myorg/ui build
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui build-storybook
pnpm --filter @myorg/ui storybook

<!-- MANUAL ADDITIONS START -->

## MCP (Storybook)

- **전제조건**: Storybook 개발 서버가 실행 중이어야 MCP 도구 사용 가능 (`pnpm --filter @myorg/ui storybook`)
- **컴포넌트 작업 전**: 반드시 MCP 도구로 해당 컴포넌트 문서를 먼저 조회할 것

### 사용 가능한 MCP 도구

| 도구 | 기능 |
|------|------|
| `list-all-documentation` | 전체 컴포넌트 및 문서 목록 조회 |
| `get-documentation` | 특정 컴포넌트의 props, 스토리, 사용 예시 조회 |
| `get-documentation-for-story` | 특정 스토리의 소스 코드 및 관련 문서 조회 |
| `get-storybook-story-instructions` | 스토리 작성 가이드 및 인터랙션 테스트 지침 |
| `preview-stories` | 스토리 렌더링 미리보기 (이미지 또는 링크) |
| `run-story-tests` | 스토리 테스트 실행 및 결과 반환 (접근성 이슈 포함) |

<!-- MANUAL ADDITIONS END -->
