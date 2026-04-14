import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@myorg/ui';

import type { FaqItem } from '@sfood/content/sfood-content';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="rounded-lg border border-border">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="px-5">
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
