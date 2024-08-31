import { PackageSearch, Search } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

interface SearchProductTopbarProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | undefined;
  totalProducts: number | undefined;
  isProductsNotFound: boolean;
}

export const SearchProductTopbar = ({
  handleInputChange,
  inputValue,
  totalProducts,
  isProductsNotFound,
}: SearchProductTopbarProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="rounded-full">
          Clear All
        </Button>
        {totalProducts || isProductsNotFound ? (
          <div className="flex items-center">
            <PackageSearch className="mr-2 size-4" />
            <p className="text-sm text-muted-foreground">
              {totalProducts ?? 0} products
            </p>
          </div>
        ) : (
          <Skeleton className="h-4 w-[100px]" />
        )}
      </div>
      <div className="relative">
        <Search className="absolute left-2 size-4 h-full" />
        <Input
          placeholder="Search products..."
          className="rounded-full pl-8"
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>
    </div>
  );
};
