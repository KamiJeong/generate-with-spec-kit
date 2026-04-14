import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@myorg/ui';

import type { Brand, BrandType } from '@sfood/content/sfood-content';

interface BrandLineupProps {
  brands: Brand[];
}

function BrandCards({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {brands.map((brand) => (
        <Card key={brand.id} className="overflow-hidden rounded-lg">
          <img
            src={brand.image.src}
            alt={brand.image.alt}
            loading={brand.image.loading}
            className="aspect-[16/9] w-full object-cover"
          />
          <CardHeader>
            <Badge variant="secondary">{brand.type}</Badge>
            <CardTitle className="text-2xl">{brand.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {brand.slogan}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {brand.productCategories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function BrandLineup({ brands }: BrandLineupProps) {
  const types: BrandType[] = ['B2B', 'B2C'];

  return (
    <Tabs defaultValue="B2B">
      <TabsList variant="line" aria-label="브랜드 유형">
        {types.map((type) => (
          <TabsTrigger key={type} value={type}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
      {types.map((type) => (
        <TabsContent key={type} value={type} className="pt-6">
          <BrandCards brands={brands.filter((brand) => brand.type === type)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
