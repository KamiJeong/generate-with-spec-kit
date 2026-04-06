import { render, screen } from '@testing-library/react';

import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders with a loading label', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('uses the small size class when requested', () => {
    render(<Spinner size="sm" />);

    expect(screen.getByLabelText('Loading')).toHaveClass('size-4');
  });

  it('uses the large size class when requested', () => {
    render(<Spinner size="lg" />);

    expect(screen.getByLabelText('Loading')).toHaveClass('size-6');
  });
});
