# Feature Specification: DESIGN.md for AI Coding Agents

**Feature Branch**: `003-design-md`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "make DESIGN.md for claude code and codex - reference: https://github.com/VoltAgent/awesome-design-md - make our DESIGN.md - should use our design system"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Agent Generates Consistent UI from DESIGN.md (Priority: P1)

An AI coding agent (Claude Code or Codex) is given a task to build a new UI screen or component. Before writing any code, it reads DESIGN.md at the project root. Using only that document, the agent can identify the correct color tokens, component names, variant options, and composition patterns to produce output that matches the design system without any additional instructions.

**Why this priority**: This is the primary reason DESIGN.md exists. If an AI agent can generate design-consistent UI from this single document, every other story becomes possible. It is also the hardest to get right and therefore the most valuable to validate first.

**Independent Test**: Can be fully tested by giving an AI agent a UI task with no context other than DESIGN.md and checking whether the generated code uses correct token names and component APIs.

**Acceptance Scenarios**:

1. **Given** an AI agent has only DESIGN.md available, **When** asked to build a login form, **Then** it uses `Button` with `variant="default"`, `Input` with proper Field wrapper, and semantic color tokens (`primary`, `muted-foreground`) without guessing arbitrary hex values.
2. **Given** an AI agent has only DESIGN.md available, **When** asked to display a data table with pagination, **Then** it uses `DataTable` with the correct props signature (`columns`, `data`, `searchKey`, `pageSize`) without inventing a custom table implementation.
3. **Given** an AI agent has only DESIGN.md available, **When** asked to add a toast notification, **Then** it uses `toast.success()` / `toast.error()` from Sonner rather than building a custom notification component.

---

### User Story 2 - Developer Validates AI Output Against DESIGN.md (Priority: P2)

A developer reviews AI-generated UI code and uses DESIGN.md as the single source of truth to check whether the agent followed design conventions. The document is clear enough that the review takes minutes, not hours.

**Why this priority**: Even after DESIGN.md exists, developers must be able to catch deviations quickly. If the document is ambiguous or incomplete, review is slow and inconsistent.

**Independent Test**: Can be fully tested by reviewing a sample of AI-generated code against each section of DESIGN.md and confirming every naming question can be answered without opening source files.

**Acceptance Scenarios**:

1. **Given** an AI-generated component uses an unknown color class, **When** the developer opens DESIGN.md, **Then** they can immediately determine whether that color exists in the palette and what its semantic meaning is.
2. **Given** an AI-generated form uses a `Select` component, **When** the developer checks DESIGN.md, **Then** they can confirm the correct size values (`sm`, `default`) and sub-component names (`SelectTrigger`, `SelectContent`, `SelectItem`) without reading source code.

---

### User Story 3 - Developer Updates DESIGN.md After Design System Changes (Priority: P3)

When a new component is added or a token changes, the developer responsible for the design system updates DESIGN.md to reflect the new state. The document's structure is clear enough that the update can be made precisely without rewriting unrelated sections.

**Why this priority**: DESIGN.md only remains valuable if it stays accurate. A well-structured document makes targeted updates easy and reduces the risk of stale documentation.

**Independent Test**: Can be fully tested by simulating a token change (e.g., adding a new color), updating only the relevant DESIGN.md section, and confirming no other sections require editing.

**Acceptance Scenarios**:

1. **Given** a new `warning` semantic color is added to the token system, **When** the developer edits DESIGN.md, **Then** they can add it to the Color System section without touching any other section.
2. **Given** a new `Stepper` component is added to `packages/ui`, **When** the developer updates DESIGN.md, **Then** they add it to the Components section with the same format as existing component entries.

---

### Edge Cases

- What should an AI agent do when DESIGN.md references a component that does not exist in the installed package version? — DESIGN.md must include version context so agents can recognize potential drift.
- What happens when two component variants look similar but have different semantic meaning (e.g., `ghost` vs `outline` Button)? — DESIGN.md must include the functional role of each variant, not just its name.
- What if an AI agent is working in a file that already uses hardcoded hex values? — DESIGN.md must clearly state that semantic tokens always take precedence over raw values, giving agents a rule to apply retroactively.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: DESIGN.md MUST document all semantic color tokens with their token name, resolved value, and functional role (e.g., when to use `muted-foreground` vs `foreground`).
- **FR-002**: DESIGN.md MUST document the full color palette (gray 50–950, primary 50–950) with each step's hex value and intended use case.
- **FR-003**: DESIGN.md MUST document typography — font families (NanumBarunGothic primary stack), supported weights (400, 500, 600, 700), and line-height/tracking guidelines.
- **FR-004**: DESIGN.md MUST document all 53 UI components, each entry including: component name(s), exported sub-components, key props with accepted values, and a minimal usage example.
- **FR-005**: DESIGN.md MUST document the Button component's full variant set (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) and size set (`xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`) with the intended use case of each.
- **FR-006**: DESIGN.md MUST document motion tokens — duration values (`fast: 0.15s`, `normal: 0.25s`, `slow: 0.4s`) and easing curves, with guidance on which to use for which interaction type.
- **FR-007**: DESIGN.md MUST document dark mode: that it is automatically handled by CSS variables, that no manual dark-mode overrides are needed for semantic tokens, and the `dark:` Tailwind prefix pattern for structural overrides.
- **FR-008**: DESIGN.md MUST document the component composition patterns: `data-slot` attributes, `asChild` prop, Class Variance Authority variant helpers (e.g., `buttonVariants`), and the `cn()` utility. Specifically, DESIGN.md MUST include a rule stating that `data-slot` attributes are present on all components for internal targeting purposes, and that AI agents MUST NOT use them as styling hooks — variant props and `cn()` are the correct styling interface.
- **FR-009**: DESIGN.md MUST document accessibility conventions: required `aria-*` attributes per component type, `aria-invalid` for form validation states, and `focus-visible:` ring patterns.
- **FR-010**: DESIGN.md MUST follow the 9-section quality structure from the awesome-design-md standard: Identity, Typography, Color System, Spacing & Layout, Components, Motion, Dark Mode, Accessibility, and Usage Rules.
- **FR-011**: DESIGN.md MUST be a single plain-text Markdown file placed at the repository root.
- **FR-012**: DESIGN.md MUST include a "Do / Don't" or "Rules" section that gives AI agents explicit behavioral constraints (e.g., "never use raw hex values", "always use semantic tokens over palette steps").
- **FR-013**: DESIGN.md MUST document border radius conventions (default `0.5rem`, `lg`, `md`, `sm` variants) and the Tailwind utilities that map to them.
- **FR-014**: DESIGN.md MUST document the `Field` component's role as the required wrapper for all labeled form inputs, including its `label`, `error`, and `required` props.

### Key Entities

- **Design Token**: A named design decision (color, spacing, radius, motion) with a semantic name, resolved value, and a documented functional role that guides when it should be used.
- **UI Component**: A reusable interface element from `@myorg/ui` with sub-components, variant options, data-slot attributes, and accessibility requirements.
- **Usage Rule**: An explicit do/don't constraint that AI agents must follow when generating code — takes precedence over any inferred behavior.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An AI agent given only DESIGN.md can generate a complete, functional form (input, label, error state, submit button) using correct component names and token names on the first attempt, with zero invented values.
- **SC-002**: 100% of semantic color token names in DESIGN.md match the actual exported token names in `packages/tokens/`, verified by cross-referencing the document against the package source.
- **SC-003**: 100% of the 53 UI components in `packages/ui/src/components/` are documented in DESIGN.md with at minimum their name, all exported sub-components (verified against the actual source files, not only the primary component name), and one usage example.
- **SC-004**: A developer reviewing AI-generated UI can answer any naming or variant question using only DESIGN.md without opening any source file, within 30 seconds per question.
- **SC-005**: DESIGN.md passes the awesome-design-md CONTRIBUTING.md quality bar — all 9 required sections present, every color entry has semantic name + hex + functional role.

## Assumptions

- DESIGN.md will be placed at the repository root (`/DESIGN.md`) so both Claude Code and Codex discover it automatically via standard project file scanning.
- Claude Code and Codex are the two primary consumers; the document is optimized for machine readability (consistent formatting, explicit naming) while remaining human-readable.
- English is the authoring language for DESIGN.md since AI agent prompts and code are in English.
- The document will be maintained manually; no automated sync tooling is required for v1.
- Dark mode is always supported via CSS variables — no opt-in or configuration is needed; DESIGN.md documents this as a default behavior.
- Icon usage references Lucide React (already integrated in the component library); DESIGN.md does not need to enumerate all icons, only the sizing pattern.
- The `cn()` utility is available in all UI files; DESIGN.md documents it as the standard class-merging approach without elaborating on its implementation.
- Chart components (`ChartContainer`, etc.) are documented at a higher level (config shape, color token mapping) rather than per-chart-type, as chart type selection is data-driven.
