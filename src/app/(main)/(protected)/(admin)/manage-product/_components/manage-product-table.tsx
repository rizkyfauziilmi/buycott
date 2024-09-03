import { api } from "~/trpc/react";
import { productColumns } from "./product-columns";
import { ProductTable } from "./product-table";
import { ProductTableSkeleton } from "./product-table-skeleton";

export const ManageProductTable = () => {
  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = api.product.getAllProduct.useQuery();

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <ProductTable
      columns={productColumns}
      data={products ?? []}
      reftech={handleRefresh}
      isRefetching={isRefetching}
    />
  );
};
