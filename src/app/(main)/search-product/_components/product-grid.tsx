import type { Product } from "@prisma/client";
import { ProductCard } from "./product-card";
import type { InfiniteData } from "@tanstack/react-query";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductGridProps {
  data:
    | InfiniteData<
        {
          items: Product[];
          nextCursor: number | undefined;
          totalProducts: number;
        },
        number | null
      >
    | undefined;
  isLoading: boolean;
  fetchNextPage: () => Promise<void>;
  hasNextPage: boolean;
}

export const ProductGrid = ({
  isLoading,
  data,
  fetchNextPage,
  hasNextPage,
}: ProductGridProps) => {
  if (data?.pages[0]?.items.length === 0) {
    return <div>Not product found</div>;
  }

  const renderProduct = () => {
    return data?.pages.map((page) => {
      return page.items.map((product) => {
        // last product in the page
        const isLastItem =
          page.nextCursor === undefined
            ? false
            : page.nextCursor - 1 === product.id;

        // last product in all pages
        const isLastNextCursor =
          data.pages?.slice(-1)[0]?.items?.slice(-1)[0]?.id === product.id;

        // data?.pageParams.slice(-1)[0] === null
        //   ? false
        //   // (-1 + 10) => if lastNextCursor is 11, then 11 - 1 + 10 = 20 (last item in the page)
        //   : (data.pageParams.slice(-1)[0] ?? 0) - 1 + 10 === product.id;

        return (
          <ProductCard
            key={product.id}
            product={product}
            isLastItem={isLastItem}
            isLastNextCursor={isLastNextCursor}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        );
      });
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {renderProduct()}
      {isLoading &&
        Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={`product-skeleton-${index}`} />
        ))}
    </div>
  );
};
