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
  });

  const [debounceName] = useDebounce(searchQuery.name, 300)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const products = api.product.search.useQuery(
    {
      name: debounceName,
    },
    {
      enabled: true,
    },
  );

  return (
    <div>
      <SearchProductTopbar
        handleInputChange={handleInputChange}
        inputValue={searchQuery.name}
      />
      <ProductGrid products={products.data} isLoading={products.isLoading} />
    </div>
  );
};
