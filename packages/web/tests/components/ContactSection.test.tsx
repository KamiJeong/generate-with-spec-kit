import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ContactSection } from '@web/components/sections/ContactSection';

describe('ContactSection', () => {
  it('renders the contact fields', () => {
    // @req FR-005
    render(<ContactSection />);

    expect(screen.getByRole('textbox', { name: '이름' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '이메일' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '메시지' })).toBeInTheDocument();
  });

  it('shows validation messages for empty submission and invalid email', async () => {
    // @req FR-005 @req SC-002
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole('button', { name: '문의하기' }));

    expect(await screen.findByText('이름을 입력해주세요')).toBeInTheDocument();
    expect(
      screen.getByText('이메일 형식이 올바르지 않습니다')
    ).toBeInTheDocument();
    expect(
      screen.getByText('메시지를 10자 이상 입력해주세요')
    ).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: '이름' }), '홍길동');
    await user.type(screen.getByRole('textbox', { name: '이메일' }), 'invalid');
    await user.type(
      screen.getByRole('textbox', { name: '메시지' }),
      '충분한 문의 메시지입니다'
    );
    await user.click(screen.getByRole('button', { name: '문의하기' }));

    expect(
      await screen.findByText('이메일 형식이 올바르지 않습니다')
    ).toBeInTheDocument();
  });
});
