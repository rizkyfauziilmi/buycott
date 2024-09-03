import type { InfiniteData } from "@tanstack/react-query";
import type { ProductWithAlternativesAndAuthor } from "types";
import { ProductCard } from "./product-card";
import { ProductCardNotFound } from "./product-card-not-found";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductGridProps {
	data:
		| InfiniteData<
				{
					items: ProductWithAlternativesAndAuthor[];
					nextCursor: string | undefined;
					totalProducts: number;
				},
				string | null
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
	const isProductsNotFound = data?.pages[0]?.items.length === 0;

	if (isProductsNotFound) {
		return <ProductCardNotFound />;
	}

	const renderProduct = () => {
		return data?.pages.map((page) => {
			return page.items.map((product) => {
				// last product in the page
				const isLastItem =
					page.items.indexOf(product) === page.items.length - 1;

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
		<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{renderProduct()}
			{isLoading &&
				Array.from({ length: 9 }).map((_, index) => (
					<ProductCardSkeleton key={`product-skeleton-${index}`} />
				))}
		</div>
	);
};
