"use client";

import type { ChangeEvent } from "react";
import type { SearchProductSchema } from "~/server/api/schemas/product-schemas";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import type { z } from "zod";
import { api } from "~/trpc/react";
import { SearchProductTopbar } from "./search-product-topbar";
import { ProductGrid } from "./product-grid";

export const SearchProductContent = () => {
  const [searchQuery, setSearchQuery] = useState<
    z.infer<typeof SearchProductSchema>
  >({
    name: "",
    limit: 9,
  });

  const [debounceName] = useDebounce(searchQuery.name, 300);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const { data, fetchNextPage, isFetching, hasNextPage } =
    api.product.search.useInfiniteQuery(
      {
        limit: searchQuery.limit,
        name: debounceName,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 1,
      },
    );

  const handleFetchNextPage = async () => {
    await fetchNextPage();
  };

  return (
    <div>
      <SearchProductTopbar
        handleInputChange={handleInputChange}
        inputValue={searchQuery.name}
        totalProducts={data?.pages[0]?.totalProducts}
        isProductsNotFound={data?.pages[0]?.items.length === 0}
      />
      <ProductGrid
        data={data}
        isLoading={isFetching}
        fetchNextPage={handleFetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};
