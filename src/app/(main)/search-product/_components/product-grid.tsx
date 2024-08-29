import type { Product } from "@prisma/client";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!products || products?.length === 0) {
    return <div>Not product found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
