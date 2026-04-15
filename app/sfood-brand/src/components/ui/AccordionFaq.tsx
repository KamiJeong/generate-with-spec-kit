import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@myorg/ui';

import type { FaqCategory, FaqItem } from '@sfood/content/support';

interface AccordionFaqProps {
  items: FaqItem[];
}

const ALL_CATEGORY = '전체';

export function AccordionFaq({ items }: AccordionFaqProps) {
  const categories = [ALL_CATEGORY, ...Array.from(new Set(items.map((i) => i.category)))];
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const filtered =
    activeCategory === ALL_CATEGORY
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-sfood-red text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Accordion type="multiple" className="rounded-xl border border-gray-100 bg-white shadow-sm px-4">
        {filtered.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-sfood-dark font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
