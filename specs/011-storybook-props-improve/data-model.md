# 데이터 모델: Storybook Stories Props 정의 보강

**생성일**: 2026-04-08

이 feature는 데이터 모델(스키마, 상태 전환, 엔티티 관계)이 없는 **스토리 메타데이터 보강 작업**이다. 따라서 이 문서는 각 스토리 파일에서 정의할 `argTypes` 스펙을 엔티티 단위로 기술한다.

## Story Meta 엔티티 정의

### argTypes 표준 구조

```typescript
type ArgTypeDefinition = {
  control: 'select' | 'boolean' | 'text' | 'number' | { type: 'number'; min?: number; max?: number };
  options?: string[];          // control: 'select' 인 경우 필수
  description?: string;        // Docs 탭 Props 테이블에 표시
  table?: {
    defaultValue?: { summary: string };
  };
};
```

### 컴포넌트별 argTypes 엔티티

#### Input

```typescript
argTypes: {
  type: {
    control: 'select',
    options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    description: 'HTML input type 속성',
    table: { defaultValue: { summary: 'text' } },
  },
  placeholder: {
    control: 'text',
    description: '입력 힌트 텍스트',
  },
  disabled: {
    control: 'boolean',
    description: '비활성화 상태',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### Checkbox

```typescript
argTypes: {
  defaultChecked: {
    control: 'boolean',
    description: '초기 체크 상태 (비제어 모드)',
    table: { defaultValue: { summary: 'false' } },
  },
  disabled: {
    control: 'boolean',
    description: '비활성화 상태',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### Accordion

```typescript
argTypes: {
  type: {
    control: 'select',
    options: ['single', 'multiple'],
    description: '단일 또는 다중 아이템 열기 모드',
    table: { defaultValue: { summary: 'single' } },
  },
  collapsible: {
    control: 'boolean',
    description: 'single 모드에서 열린 아이템을 클릭해 닫을 수 있는지 여부',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### RadioGroup

```typescript
argTypes: {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
    description: '라디오 그룹 방향',
    table: { defaultValue: { summary: 'vertical' } },
  },
  disabled: {
    control: 'boolean',
    description: '전체 비활성화 상태',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### NativeSelect

```typescript
argTypes: {
  disabled: {
    control: 'boolean',
    description: '비활성화 상태',
    table: { defaultValue: { summary: 'false' } },
  },
  required: {
    control: 'boolean',
    description: '필수 입력 여부',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### Field

```typescript
argTypes: {
  label: {
    control: 'text',
    description: '필드 레이블 텍스트',
  },
  error: {
    control: 'text',
    description: '오류 메시지 (표시 시 입력 필드 aria-invalid 설정)',
  },
  required: {
    control: 'boolean',
    description: '필수 입력 여부 (레이블 옆 * 표시)',
    table: { defaultValue: { summary: 'false' } },
  },
}
```

#### InputGroup

```typescript
argTypes: {
  prefix: {
    control: 'text',
    description: '입력 필드 앞에 표시되는 텍스트 (단순 문자열만 지원)',
  },
  suffix: {
    control: 'text',
    description: '입력 필드 뒤에 표시되는 텍스트 (단순 문자열만 지원)',
  },
}
```

#### Progress

```typescript
argTypes: {
  value: {
    control: { type: 'number', min: 0, max: 100 },
    description: '현재 진행 값 (0–max 범위)',
    table: { defaultValue: { summary: '50' } },
  },
  max: {
    control: { type: 'number', min: 1 },
    description: '최대 값',
    table: { defaultValue: { summary: '100' } },
  },
}
```

#### Separator

```typescript
argTypes: {
  orientation: {
    control: 'select',
    options: ['horizontal', 'vertical'],
    description: '구분선 방향',
    table: { defaultValue: { summary: 'horizontal' } },
  },
  decorative: {
    control: 'boolean',
    description: '장식 목적 여부 (false이면 role=separator 적용)',
    table: { defaultValue: { summary: 'true' } },
  },
}
```

#### Kbd

```typescript
argTypes: {
  children: {
    control: 'text',
    description: '키보드 단축키 텍스트',
  },
}
```

#### Label

```typescript
argTypes: {
  children: {
    control: 'text',
    description: '레이블 텍스트',
  },
}
```

#### Empty

```typescript
argTypes: {
  title: {
    control: 'text',
    description: '빈 상태 제목',
  },
  description: {
    control: 'text',
    description: '빈 상태 설명 (선택 사항)',
  },
}
```

#### Item

```typescript
argTypes: {
  label: {
    control: 'text',
    description: '아이템 레이블',
  },
  shortcut: {
    control: 'text',
    description: '키보드 단축키 표시 (선택 사항)',
  },
}
```

## Story Args 엔티티 (Playground 스토리)

Playground 스토리는 Controls 패널에서 시작값을 제공한다.

| 컴포넌트 | Playground 초기 args |
|---------|---------------------|
| Button | `{ variant: 'default', size: 'default', disabled: false, children: 'Button' }` |
| Checkbox | `{ defaultChecked: false, disabled: false }` |
| Input | `{ type: 'text', placeholder: 'Enter text...', disabled: false }` |
| Spinner | `{ size: 'default' }` |
| Separator | `{ orientation: 'horizontal', decorative: false }` |
| Kbd | `{ children: 'K' }` |
| Label | `{ children: 'Label' }` |
| Empty | `{ title: 'No data', description: '' }` |
| Item | `{ label: 'Profile', shortcut: 'P' }` |
| Accordion | `{ type: 'single', collapsible: true }` |
| Tabs | `{ orientation: 'horizontal' }` |
| RadioGroup | `{ orientation: 'vertical', disabled: false }` |
| NativeSelect | `{ disabled: false, required: false }` |
| Field | `{ label: 'Email', error: '', required: false }` |
| InputGroup | `{ prefix: 'https://', suffix: '.com' }` |
| Progress | `{ value: 50, max: 100 }` |
| Alert | `{ variant: 'default' }` |
