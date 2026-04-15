import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppLayout } from '@wiki/components/layout/AppLayout';
import { renderRoute } from './test-utils';

describe('Role perspective', () => {
  it('changes visible recommendations when the selected role changes', async () => {
    renderRoute({ path: '/', route: '/', element: <AppLayout /> });
    expect(screen.getByText('비개발자')).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByLabelText('역할 관점 선택'), 'support');
    expect(screen.getByText('지원 담당자')).toBeInTheDocument();
    expect(await screen.findByText(/문서와 AI Agent 답변을 함께 확인하기/)).toBeInTheDocument();
  });
});
