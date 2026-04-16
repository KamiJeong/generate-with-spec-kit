import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Card,
  CardContent,
} from '@kamijeong/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SupportNav } from '@sfood/components/sections/SupportNav';
import { faqItems, pageContent } from '@sfood/content/site';

interface FaqPageProps {
  currentPath: string;
}

const categoryLabel = {
  brand: '브랜드',
  product: '제품',
  quality: '품질',
  business: '구매/제휴',
  talent: '채용',
} as const;

export function FaqPage({ currentPath }: FaqPageProps) {
  return (
    <>
      <PageHero content={pageContent.faq} />
      <SupportNav currentPath={currentPath} />
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <Card className="border-border/70">
          <CardContent className="p-4 sm:p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={`item-${item.order}`}>
                  <AccordionTrigger className="gap-4 text-left">
                    <span className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Badge variant="secondary" className="w-fit">
                        {categoryLabel[item.category]}
                      </Badge>
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
