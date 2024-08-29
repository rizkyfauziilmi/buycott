"use client";

import type { ChangeEvent } from "react";
import type { SearchProductSchema } from "~/server/api/schemas/product-schemas";
import type { z } from "zod";

import { useState } from "react";
import { api } from "~/trpc/react";

import { SearchProductTopbar } from "./search-product-topbar";
import { ProductGrid } from "./product-grid";

// TODO: implement infinite scroll
export const SearchProductContent = () => {
  const [queries, setQueries] = useState<z.infer<typeof SearchProductSchema>>({
    name: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueries({
      name: e.target.value,
    });
  };

  const products = api.product.search.useQuery(queries, {
    enabled: true,
  });

  return (
    <div>
      <SearchProductTopbar handleInputChange={handleInputChange} />
      <ProductGrid products={products.data} isLoading={products.isLoading} />
    </div>
  );
};
