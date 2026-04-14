import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';
import { ChefHat, Flame, PackageCheck, Sandwich, Utensils } from 'lucide-react';

import type { ProductCategory } from '@sfood/content/sfood-content';

const iconMap = {
  Sandwich,
  Utensils,
  Flame,
  ChefHat,
  PackageCheck,
};

interface ProductCategoryGridProps {
  categories: ProductCategory[];
}

export function ProductCategoryGrid({ categories }: ProductCategoryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = iconMap[category.iconName as keyof typeof iconMap] ?? PackageCheck;

        return (
          <Card key={category.id} className="h-full rounded-lg">
            <CardHeader>
              <Icon className="size-8 text-primary" aria-hidden="true" />
              <CardTitle className="text-xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
