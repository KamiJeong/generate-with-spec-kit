# 데이터 모델: DESIGN.md 콘텐츠 스키마

**Feature**: 003-design-md | **Date**: 2026-04-03

> DESIGN.md는 코드 없는 문서 산출물이다. 이 파일은 DESIGN.md의 콘텐츠 구조(스키마)를 정의한다.

## DESIGN.md 섹션 구조

### Section 1: Identity & Brand

**목적**: 프로젝트의 디자인 개성과 핵심 원칙을 AI 에이전트에게 전달

**필수 항목**:
- 프로젝트명: `generate-with-spec-kit`
- 디자인 철학: 기능적이고 접근 가능한 개발자 도구 UI
- 주요 디자인 원칙 (3–5개)
- 주요 브랜드 색상: `primary` (`#d92b33` — 레드 계열)

---

### Section 2: Typography

**목적**: 폰트 패밀리, 웨이트, 크기 사용 규칙을 문서화

**필수 항목**:

| 항목 | 값 | 용도 |
|------|-----|------|
| 기본 폰트 | NanumBarunGothic, AppleGothic, Tahoma, Arial | Body, UI 전반 |
| 웨이트 | 400 (normal), 500 (medium), 600 (semibold), 700 (bold) | 계층 구분 |
| 행간 (line-height) | Tailwind 기본값 (tight/snug/normal/relaxed) | 컨텍스트별 |

---

### Section 3: Color System

**목적**: 시맨틱 토큰과 팔레트 스케일을 functional role과 함께 문서화

**시맨틱 토큰 목록** (CSS 변수 → 토큰명 → hex → 기능):

| CSS Variable | 목적 | Light (Hex) | 사용 상황 |
|-------------|------|-------------|----------|
| `--background` | 페이지 배경 | `#ffffff` | 최상위 배경 |
| `--foreground` | 기본 텍스트 | `#09090b` | 본문 텍스트 |
| `--primary` | 브랜드 강조색 | `#d92b33` | 주요 CTA, 강조 요소 |
| `--primary-foreground` | primary 위 텍스트 | `#fff1f1` | primary 배경 위 텍스트 |
| `--secondary` | 보조 배경 | `#f4f4f5` | 보조 버튼, 뱃지 배경 |
| `--secondary-foreground` | secondary 위 텍스트 | `#18181b` | secondary 배경 위 텍스트 |
| `--muted` | 비강조 배경 | `#f4f4f5` | 비활성 영역 배경 |
| `--muted-foreground` | 보조 텍스트 | `#71717a` | 레이블, 설명 텍스트 |
| `--accent` | 인터랙션 강조 | `#f4f4f5` | hover 상태, 선택 강조 |
| `--destructive` | 위험/삭제 액션 | `#d92b33` | 삭제 버튼, 에러 상태 |
| `--border` | 테두리 | `#e4e4e7` | 카드, 인풋 테두리 |
| `--input` | 인풋 테두리 | `#e4e4e7` | form 요소 경계 |
| `--ring` | 포커스 링 | `#d92b33` | 포커스 표시 |
| `--chart-1` ~ `--chart-5` | 차트 색상 | (HSL 값) | 데이터 시각화 전용 |

**팔레트 스케일** (참조용):
- `gray-50` ~ `gray-950`: `#fafafa` ~ `#09090b` (11단계)
- `primary-50` ~ `primary-950`: `#fff1f1` ~ `#2e0405` (11단계, 브랜드 레드)

---

### Section 4: Spacing & Layout

**목적**: 간격, border-radius, 반응형 브레이크포인트 문서화

**필수 항목**:

| 항목 | 값 | 설명 |
|------|-----|------|
| 기본 radius | `0.5rem` (8px) | `rounded-lg` → Tailwind 기본 |
| radius-md | `calc(0.5rem - 2px)` | `rounded-md` |
| radius-sm | `calc(0.5rem - 4px)` | `rounded-sm` |
| 모바일 브레이크포인트 | 768px | `useIsMobile()` hook 기준 |
| 반응형 prefix | `sm:` 640px, `md:` 768px, `lg:` 1024px | Tailwind 기본 |

---

### Section 5: Components

**목적**: 53개 컴포넌트 카탈로그 — 각 컴포넌트의 이름, 서브컴포넌트, 주요 variant/prop, 최소 예시

**컴포넌트 카테고리 및 목록**:

#### 레이아웃
- `Card` (CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter)
- `Sidebar` (SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, ...)
- `Breadcrumb`, `NavigationMenu`, `Tabs`, `Pagination`

#### 인터랙션
- `Button` — variant: `default|destructive|outline|secondary|ghost|link`, size: `xs|sm|default|lg|icon|icon-xs|icon-sm|icon-lg`
- `Badge` — variant: `default|secondary|destructive|outline|ghost|link`
- `ButtonGroup`, `Input`, `InputGroup`, `InputOTP`, `NativeSelect`, `Select`, `Combobox`
- `Checkbox`, `RadioGroup`, `Switch`, `Label`, `Field`

#### 다이얼로그/모달
- `Dialog`, `AlertDialog`, `Drawer`, `Sheet`, `Popover`, `HoverCard`, `Tooltip`
- `ContextMenu`, `DropdownMenu`, `Menubar`

#### 데이터 표시
- `Table`, `DataTable` (columns, data, searchKey, pageSize)
- `Chart` (ChartContainer, ChartTooltip, ChartLegend — config 객체 기반)

#### 진행/피드백
- `Progress`, `Skeleton`, `Spinner` (size: `sm|default|lg`), `Alert` (variant: `default|destructive`)

#### 콘텐츠
- `Accordion`, `Collapsible`, `Separator`, `Textarea`, `KBD`, `Empty`, `Item`

#### 날짜/시간
- `Calendar`, `DatePicker`

#### 특수
- `Avatar` (AvatarGroup, AvatarBadge, size: `sm|default|lg`)
- `Carousel`, `Command`, `Direction`, `Resizable`
- `Sonner` (toast.success(), toast.error(), toast.loading())
- `AspectRatio`

---

### Section 6: Motion & Animation

**목적**: 애니메이션 토큰과 인터랙션별 사용 가이드

**필수 항목**:

| 토큰 | 값 | 사용 상황 |
|------|-----|----------|
| `fast` | `0.15s` | hover 전환, 즉각적 피드백 |
| `normal` | `0.25s` | 모달 열기/닫기, 상태 전환 |
| `slow` | `0.4s` | 페이지 전환, 복잡한 레이아웃 변화 |
| `ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | 대부분의 전환 (기본값) |
| `easeIn` | `cubic-bezier(0.4, 0, 1, 1)` | 요소 사라질 때 |
| `easeOut` | `cubic-bezier(0, 0, 0.2, 1)` | 요소 나타날 때 |
| `spring` | `{type: 'spring', stiffness: 300, damping: 30}` | framer-motion 스프링 |

---

### Section 7: Dark Mode

**목적**: 다크 모드 자동 처리 메커니즘과 사용 패턴 문서화

**핵심 규칙**:
- 시맨틱 토큰(`--background`, `--primary` 등)은 다크 모드를 **자동으로** 처리함 — 별도 `dark:` 오버라이드 불필요
- 구조적 변경(e.g., 레이아웃 조정)에만 `dark:` Tailwind prefix 사용
- `.dark` 클래스 또는 `[data-theme="dark"]` 셀렉터로 테마 전환
- Sidebar는 별도 dark 변수 세트 보유 (`--sidebar-*`)

---

### Section 8: Accessibility

**목적**: WCAG 2.1 AA 기준 접근성 규칙 — AI 에이전트가 자동으로 준수해야 할 패턴

**필수 항목**:
- `aria-invalid="true"`: 폼 유효성 검사 실패 시 모든 form 요소에 적용
- `aria-label` / `aria-labelledby`: 텍스트 없는 아이콘 버튼에 필수
- `aria-current="page"`: Breadcrumb, Pagination의 현재 항목에 적용
- `focus-visible:ring-2 focus-visible:ring-ring`: 모든 인터랙티브 요소의 포커스 표시
- `Field` 컴포넌트: 모든 레이블이 있는 form 인풋의 필수 래퍼 (aria-* 자동 연결)
- 키보드 내비게이션: Radix UI 기반 컴포넌트에서 자동 처리

---

### Section 9: Usage Rules & Don'ts

**목적**: AI 에이전트에게 명시적인 행동 제약 제공

**Do**:
- 색상은 시맨틱 토큰 우선 (`primary`, `muted-foreground` 등)
- form 인풋은 항상 `Field` 컴포넌트로 래핑
- 클래스 병합은 `cn()` 유틸리티 사용
- 컴포넌트 variant는 명시적으로 지정 (기본값에 의존하지 말 것)

**Don't**:
- 원시 hex 값 직접 사용 (`#d92b33` 대신 `text-primary` 또는 `bg-primary`)
- 팔레트 스케일 직접 사용 (`gray-700` 대신 `muted-foreground`)
- 임의 CSS 오버라이드 (shadcn/ui 컴포넌트 스타일을 직접 수정)
- 새 컴포넌트 빌드 — 기존 53개 컴포넌트 중 적합한 것 선택

## AGENTS.md 구조

**목적**: Codex가 읽는 에이전트 규칙 파일 — DESIGN.md 참조 + speckit 워크플로우 안내

**필수 섹션**:
1. 프로젝트 개요
2. DESIGN.md 참조 안내
3. Speckit 워크플로우 (`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → 구현)
4. 주요 제약사항 (헌법 핵심 원칙 요약)
5. 명령어 참조 (`pnpm --filter @myorg/ui build` 등)
