import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

function renderSheet() {
  return render(
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

describe('Sheet', () => {
  it('opens when the trigger is clicked', async () => {
    renderSheet();

    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }));

    expect(await screen.findByText('Edit profile')).toBeInTheDocument();
  });

  it('closes when the close button is clicked', async () => {
    renderSheet();

    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }));
    fireEvent.click(
      within(document.body).getByRole('button', { name: 'Close' })
    );

    await waitFor(() => {
      expect(screen.queryByText('Edit profile')).not.toBeInTheDocument();
    });
  });
});
