import { render, screen } from '@testing-library/react';

import { Avatar, AvatarFallback } from './avatar';

describe('Avatar', () => {
  it('renders the avatar root', () => {
    render(
      <Avatar>
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('TA')).toBeInTheDocument();
  });

  it('shows fallback text when no image is available', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies the requested size', () => {
    render(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );

    expect(
      screen.getByText('LG').closest('[data-slot="avatar"]')
    ).toHaveAttribute('data-size', 'lg');
  });
});
