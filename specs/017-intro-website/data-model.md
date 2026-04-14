# Data Model: 서비스 소개 웹사이트 (017)

**Branch**: `017-intro-website` | **Date**: 2026-04-14

정적 콘텐츠 사이트이므로 데이터베이스나 API 스키마는 없다. 이 파일은 페이지를 구성하는 콘텐츠 데이터 형태와 폼 데이터 구조를 정의한다.

---

## 콘텐츠 데이터 구조 (정적)

### SiteConfig

```ts
interface SiteConfig {
  name: string;           // 서비스 이름 (예: "My Service")
  tagline: string;        // 헤드라인 (예: "더 빠르게, 더 스마트하게")
  description: string;    // 보조 설명 (2-3문장)
  ctaLabel: string;       // 기본 CTA 버튼 텍스트 (예: "문의하기")
}
```

### NavItem

```ts
interface NavItem {
  label: string;          // 표시 텍스트 (예: "서비스 소개")
  href: string;           // 섹션 앵커 (예: "#features")
}
```

### Feature (강점 카드)

```ts
interface Feature {
  icon: LucideIcon;       // Lucide 아이콘 컴포넌트
  title: string;          // 강점 제목 (1-4단어)
  description: string;    // 강점 설명 (1-2문장)
}
```

제약: 3개 이상 6개 이하 (FR-003)

### Stat (숫자 지표)

```ts
interface Stat {
  value: string;          // 지표 값 (예: "120+", "98%")
  label: string;          // 지표 설명 (예: "고객사")
}
```

### Testimonial (후기)

```ts
interface Testimonial {
  quote: string;          // 후기 본문
  author: string;         // 이름
  role: string;           // 직책 / 소속 (선택)
  initials: string;       // 아바타 이니셜 (예: "JP")
}
```

---

## 폼 데이터 구조 (ContactForm)

```ts
interface ContactFormValues {
  name: string;           // 필수, 최소 1자
  email: string;          // 필수, 이메일 형식
  message: string;        // 필수, 최소 10자
}
```

**유효성 검사 규칙**:
- `name`: 필수 (비어있으면 "이름을 입력해주세요")
- `email`: 필수 + 이메일 형식 ("이메일 형식이 올바르지 않습니다")
- `message`: 필수, 10자 이상 ("메시지를 10자 이상 입력해주세요")

**제출 동작**: 이번 범위에서 서버 전송은 없다. 제출 버튼 클릭 시 클라이언트 사이드 유효성 검사만 수행하고, 성공 시 인라인 성공 메시지를 표시한다 (플레이스홀더).

---

## 섹션 구성 요약

| 섹션 ID | 섹션 이름 | 주요 데이터 |
|---------|-----------|------------|
| `#hero` | 히어로 | SiteConfig (name, tagline, description, ctaLabel) |
| `#about` | 개요 | 정적 텍스트 블록 |
| `#features` | 강점 | Feature[] (3-6개) |
| `#trust` | 신뢰 | Stat[] + Testimonial[] |
| `#contact` | 문의 폼 | ContactFormValues |
