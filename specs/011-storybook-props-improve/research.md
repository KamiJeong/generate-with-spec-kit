# 연구: Storybook Stories Props 정의 보강

**생성일**: 2026-04-08  
**브랜치**: `011-storybook-props-improve`

## 1. 현재 스토리 파일 현황 분석

### 대상 범위 결정

스펙의 Assumptions에 따라 다음은 **제외**:
- `packages/ui/src/stories/layouts/` (페이지 단위 데모)
- `packages/ui/src/stories/guide/` (색상/타이포그래피 가이드)
- `packages/ui/src/stories/AuthPage.stories.tsx`, `DashboardPage.stories.tsx`, `FormPage.stories.tsx`, `SettingsPage.stories.tsx` (페이지 단위 스토리)
- `packages/ui/src/stories/composition.stories.tsx` (합성 데모)
- `packages/ui/src/stories/combobox.stories.tsx`, `data-table.stories.tsx`, `dialog.stories.tsx` (복잡한 compound 컴포넌트, Controls 연동이 주 목적이 아님)
- `packages/ui/src/components/` 내 복잡 compound 스토리: `alert-dialog`, `calendar`, `chart`, `carousel`, `breadcrumb`, `button-group`, `collapsible`, `command`, `context-menu`, `date-picker`, `direction`, `drawer`, `dropdown-menu`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `resizable`, `sheet`, `sidebar`, `sonner`, `table`, `aspect-ratio`

**이유**: 위 컴포넌트들은 복잡한 합성 구조를 가지며, Controls 단독 조작보다 데모/예시 목적이 강하다.

### argTypes 개선 대상 스토리 현황

| 파일 | 현재 상태 | 필요한 개선 |
|------|-----------|-------------|
| `stories/button.stories.tsx` | argTypes 있음(variant/size/disabled), Default render가 args 무시 | Default render → args 연동, 또는 Playground 스토리 추가 |
| `stories/alert.stories.tsx` | argTypes 있음(variant), Default render가 args 무시 | Default render → Playground 스토리 추가 |
| `stories/checkbox.stories.tsx` | argTypes 없음, render 하드코딩 | argTypes 추가(checked/disabled), render → args 연동 |
| `stories/input.stories.tsx` | argTypes 없음, render 하드코딩 | argTypes 추가(type/placeholder/disabled), render → args 연동 |
| `stories/spinner.stories.tsx` | argTypes 있음(size), Default render 하드코딩 | Default render → args 연동 |
| `stories/tabs.stories.tsx` | argTypes 있음(orientation), named stories 하드코딩 render | named stories 유지(복잡 구조), Playground 스토리 추가 |
| `stories/card.stories.tsx` | argTypes 없음, compound 컴포넌트 | argTypes 없이 description만 추가 (compound 구조상 Controls 어려움) |
| `stories/radio-group.stories.tsx` | argTypes 없음 | argTypes 추가(orientation/disabled) |
| `stories/native-select.stories.tsx` | argTypes 없음 | argTypes 추가(disabled/required) |
| `stories/field.stories.tsx` | argTypes 없음 | argTypes 추가(label/error/required) |
| `stories/input-group.stories.tsx` | argTypes 없음 | argTypes 추가(prefix/suffix as text) |
| `stories/accordion.stories.tsx` | argTypes 없음 | argTypes 추가(type/collapsible) |
| `components/badge.stories.tsx` | argTypes 있음(variant), named stories 완비 | ✅ 충분 |
| `components/switch.stories.tsx` | argTypes 있음(size/disabled), Small story args 있음 | ✅ 충분 |
| `components/avatar.stories.tsx` | argTypes 있음(size), named stories args 있음 | ✅ 충분 |
| `components/progress.stories.tsx` | argTypes 없음, meta args 있음(value) | argTypes 추가(value number/max number) |
| `components/separator.stories.tsx` | argTypes 없음 | argTypes 추가(orientation/decorative) |
| `components/kbd.stories.tsx` | argTypes 없음 | argTypes 추가(children text) + Playground 스토리 |
| `components/label.stories.tsx` | argTypes 없음 | argTypes 추가(children text) + Playground 스토리 |
| `components/empty.stories.tsx` | argTypes 없음 | argTypes 추가(title/description text) + Playground 스토리 |
| `components/item.stories.tsx` | argTypes 없음 | argTypes 추가(label/shortcut text) + Playground 스토리 |

## 2. Storybook 10.3.3 argTypes API 패턴

### 결정: 표준 argTypes 패턴 사용

```typescript
// enum/union 타입
argTypes: {
  variant: {
    control: 'select',
    options: ['default', 'destructive', 'outline'],
    description: '컴포넌트 스타일 변형',
    table: { defaultValue: { summary: 'default' } },
  },
  // boolean 타입
  disabled: {
    control: 'boolean',
    description: '비활성화 상태',
    table: { defaultValue: { summary: 'false' } },
  },
  // string 타입
  children: {
    control: 'text',
    description: '컴포넌트 내용',
  },
  // number 타입
  value: {
    control: { type: 'number', min: 0, max: 100 },
    description: '현재 값',
  },
}
```

**근거**: Storybook 10.3.3은 `argTypes`의 `control` 필드로 Controls 패널 UI를 결정한다. `description`과 `table.defaultValue`는 Docs 탭 Props 테이블에 표시된다.

### 결정: Default 스토리 args 연동 방법

**방법 A**: Default render 함수에서 args를 받도록 변경
```typescript
// 변경 전
render: () => <Component />,

// 변경 후 (play 함수가 있는 경우 하드코딩 유지 + Playground 추가)
```

**방법 B**: Default 스토리는 현재 play 함수 호환을 위해 유지하고, 별도 `Playground` 스토리 추가
```typescript
export const Playground: Story = {
  render: (args) => <Component {...args} />,
  args: { variant: 'default', children: 'Button' },
};
```

**선택**: Default 스토리에 play 함수가 있는 경우 **방법 B** 적용 (FR-008: 기존 play 함수 유지 필수). play 함수가 없는 스토리는 **방법 A** 적용.

### 결정: Checkbox와 같은 controlled/uncontrolled 컴포넌트

Radix UI `Checkbox`는 `checked`(controlled)와 `defaultChecked`(uncontrolled)를 지원한다. Controls 연동에는 `defaultChecked`가 더 적합하다(controlled는 onChange 핸들러 필요).

```typescript
argTypes: {
  defaultChecked: { control: 'boolean' },
  disabled: { control: 'boolean' },
}
```

### 결정: 복잡한 children prop 처리

`children`이 복잡한 JSX인 경우(Card, RadioGroup 등), argTypes에 description만 추가하고 text control은 생략한다. 스펙 Assumptions에서 이 경우를 명시적으로 허용했다.

## 3. 컴포넌트별 타입 분석 결과

| 컴포넌트 | 주요 props (타입) | argTypes 제어 타입 |
|---------|-------------------|-------------------|
| Input | type, placeholder, disabled (HTML input props) | text/boolean |
| Checkbox | defaultChecked, disabled (Radix props) | boolean |
| Accordion | type ('single'/'multiple'), collapsible (boolean) | select/boolean |
| RadioGroup | orientation, disabled (Radix props) | select/boolean |
| NativeSelect | disabled, required (HTML select props) | boolean |
| Field | label (string), error (string), required (boolean) | text/boolean |
| InputGroup | prefix (ReactNode as text), suffix (ReactNode as text) | text |
| Progress | value (number), max (number) | number |
| Separator | orientation ('horizontal'/'vertical'), decorative (boolean) | select/boolean |
| Kbd | children (ReactNode as text) | text |
| Label | children (ReactNode as text) | text |
| Empty | title (string), description (string) | text |
| Item | label (string), shortcut (string) | text |

## 4. NEEDS CLARIFICATION 해소

**Q: InputGroup의 prefix/suffix는 ReactNode인데 text control로 가능한가?**
→ ReactNode를 text로 control하면 문자열 prefix/suffix만 표현 가능하다. 아이콘 등은 불가. 스펙 Assumptions("한국어로 표현이 어렵거나 불명확한 경우")에 준하여 text control로 단순 텍스트만 지원하고 description에 제약을 명시한다.

**Q: Card는 compound 컴포넌트인데 어떻게 처리?**
→ Card 컴포넌트 자체(CardHeader/CardContent 등)는 children 구조가 복잡하여 Controls 연동이 의미없다. argTypes 정의 없이 현재 상태 유지. Assumptions에서 이를 허용했다.

**Q: Spinner Default 스토리의 play 함수와 args 연동 충돌?**
→ Default 스토리의 play 함수는 `getByLabelText('Loading')`을 검색하므로 args를 받는 render로 변경해도 안전하다. render를 `(args) => <Spinner {...args} />`로 변경한다.

**Q: Tabs의 named stories는 복잡한 JSX 구조인데 args로 전환 가능한가?**
→ `Tabs` 컴포넌트는 `TabsList`/`TabsTrigger`/`TabsContent`를 children으로 구성하므로, 최상위 Tabs props(orientation 등)만 args로 전달하는 Playground 스토리를 추가한다. named stories(Line, Vertical, AllOrientations)는 현재 render 유지.
