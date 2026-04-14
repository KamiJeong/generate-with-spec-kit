import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { FaqAccordion } from '@sfood/components/support/FaqAccordion';
import { faqs } from '@sfood/content/sfood-content';

describe('FaqAccordion', () => {
  it('keeps only one FAQ item open at a time', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={faqs.slice(0, 2)} />);

    const firstQuestion = screen.getByRole('button', { name: faqs[0].question });
    const secondQuestion = screen.getByRole('button', { name: faqs[1].question });

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });
});
