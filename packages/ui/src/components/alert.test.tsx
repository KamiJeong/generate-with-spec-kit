import { render, screen } from '@testing-library/react';

import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders an alert landmark', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Descriptive alert copy.</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies destructive variant styling', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('text-destructive');
  });

  it('renders the title and description content', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Descriptive alert copy.</AlertDescription>
      </Alert>
    );

    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Descriptive alert copy.')).toBeInTheDocument();
  });
});
