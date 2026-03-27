import type { VariantProps } from 'class-variance-authority';

export type WithVariants<T extends (...args: any[]) => string> =
  VariantProps<T>;

export type Orientation = 'horizontal' | 'vertical';
