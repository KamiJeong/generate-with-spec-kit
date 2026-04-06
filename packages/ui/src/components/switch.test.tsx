import { fireEvent, render, screen } from '@testing-library/react';

import { Switch } from './switch';

describe('Switch', () => {
  it('renders an interactive switch', () => {
    render(<Switch aria-label="Notifications" />);

    expect(
      screen.getByRole('switch', { name: 'Notifications' })
    ).toBeInTheDocument();
  });

  it('toggles checked state when clicked', () => {
    render(<Switch aria-label="Notifications" />);

    const switchElement = screen.getByRole('switch', {
      name: 'Notifications',
    });

    fireEvent.click(switchElement);

    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('respects the disabled state', () => {
    render(<Switch aria-label="Notifications" disabled />);

    expect(
      screen.getByRole('switch', { name: 'Notifications' })
    ).toBeDisabled();
  });
});
