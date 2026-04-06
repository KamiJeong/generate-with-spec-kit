import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('applies the destructive variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass(
      'bg-destructive'
    );
  });

  it('respects the disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('calls the click handler when pressed', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Run</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
