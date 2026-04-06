import { render, screen } from '@testing-library/react';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders badge text', () => {
    render(<Badge>Status</Badge>);

    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('applies the destructive variant classes', () => {
    render(<Badge variant="destructive">Error</Badge>);

    expect(screen.getByText('Error')).toHaveClass('bg-destructive');
  });

  it('renders arbitrary children content', () => {
    render(
      <Badge>
        <span>Beta</span>
      </Badge>
    );

    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
