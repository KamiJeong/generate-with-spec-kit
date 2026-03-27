import type * as React from 'react';

function Direction({
  dir,
  children,
}: {
  dir: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  return <div dir={dir}>{children}</div>;
}

export { Direction };
