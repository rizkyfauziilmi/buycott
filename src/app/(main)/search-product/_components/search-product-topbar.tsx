import {
  Check,
  ListTree,
  Meh,
  PackageSearch,
  Search,
  SlidersHorizontal,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { Status } from "@prisma/client";
import { capitalizeString } from "~/lib/string";
import type { z } from "zod";
import type { SearchProductSchema } from "~/server/api/schemas/product-schemas";
import { Separator } from "~/components/ui/separator";
import { MultiSelect } from "~/components/multi-select";

interface SearchProductTopbarProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | undefined;
  totalProducts: number | undefined;
  isProductsNotFound: boolean;
  searchQuery: z.infer<typeof SearchProductSchema>;
  setSearchQuery: Dispatch<SetStateAction<z.infer<typeof SearchProductSchema>>>;
}

const categoriesList = [
  { value: "sales", label: "Sales", icon: PackageSearch },
  { value: "supermarket", label: "Supermarket", icon: PackageSearch },
  { value: "fashion", label: "Fashion", icon: PackageSearch },
  { value: "pharmaceuticals", label: "Pharmaceuticals", icon: PackageSearch },
  { value: "dates", label: "Dates", icon: PackageSearch },
  { value: "technology", label: "Technology", icon: PackageSearch },
  { value: "clothing", label: "Clothing", icon: PackageSearch },
  { value: "cosmetics", label: "Cosmetics", icon: PackageSearch },
  { value: "car", label: "Car", icon: PackageSearch },
  { value: "drinks", label: "Drinks", icon: PackageSearch },
  { value: "insurance", label: "Insurance", icon: PackageSearch },
  { value: "petcare", label: "Petcare", icon: PackageSearch },
  { value: "hardware", label: "Hardware", icon: PackageSearch },
  { value: "coffee", label: "Coffee", icon: PackageSearch },
  { value: "marketing", label: "Marketing", icon: PackageSearch },
  { value: "energy", label: "Energy", icon: PackageSearch },
  { value: "cloud", label: "Cloud", icon: PackageSearch },
  { value: "books", label: "Books", icon: PackageSearch },
  { value: "commerce", label: "Commerce", icon: PackageSearch },
  { value: "other", label: "Other", icon: PackageSearch },
  { value: "semiconductors", label: "Semiconductors", icon: PackageSearch },
  { value: "security", label: "Security", icon: PackageSearch },
  { value: "developer", label: "Developer", icon: PackageSearch },
  { value: "target", label: "Target", icon: PackageSearch },
  { value: "web3", label: "Web3", icon: PackageSearch },
  { value: "development", label: "Development", icon: PackageSearch },
  { value: "charity", label: "Charity", icon: PackageSearch },
  { value: "food", label: "Food", icon: PackageSearch },
  { value: "entertainment", label: "Entertainment", icon: PackageSearch },
  { value: "household", label: "Household", icon: PackageSearch },
  { value: "contractor", label: "Contractor", icon: PackageSearch },
  { value: "politics", label: "Politics", icon: PackageSearch },
  { value: "weapons", label: "Weapons", icon: PackageSearch },
  { value: "others", label: "Others", icon: PackageSearch },
  { value: "finance", label: "Finance", icon: PackageSearch },
  { value: "fintech", label: "Fintech", icon: PackageSearch },
  { value: "travel", label: "Travel", icon: PackageSearch },
  { value: "hr", label: "Hr", icon: PackageSearch },
  { value: "healthcare", label: "Healthcare", icon: PackageSearch },
  { value: "productivity", label: "Productivity", icon: PackageSearch },
  { value: "manufacturer", label: "Manufacturer", icon: PackageSearch },
];

export const SearchProductTopbar = ({
  handleInputChange,
  inputValue,
  totalProducts,
  isProductsNotFound,
  searchQuery,
  setSearchQuery,
}: SearchProductTopbarProps) => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const clearAllFilters = () => {
    setSearchQuery((prev) => ({
      ...prev,
      status: undefined,
      categories: undefined,
      name: "",
    }));
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            {searchQuery.status && (
              <Button
                variant="secondary"
                className="group space-x-2 rounded-full"
                onClick={() => {
                  setSearchQuery((prev) => ({ ...prev, status: undefined }));
                }}
              >
                <div className="flex items-center gap-1">
                  <p className="text-sm text-muted-foreground">Status:</p>
                  {capitalizeString(searchQuery.status)}
                </div>
                <X className="ml-2 size-4 text-muted-foreground group-hover:text-primary" />
              </Button>
            )}
            {searchQuery.categories && (
              <Button variant="secondary" className="space-x-2 rounded-full">
                <div className="flex items-center gap-1">
                  <p className="text-sm text-muted-foreground">Categories:</p>
                  {searchQuery.categories.slice(0, 2).map((category) => (
                    <p
                      key={category}
                      className="hover:underline"
                      onClick={() => {
                        // remove category from search query string[] use filter when 1 more category is selected onClick undefined
                        setSearchQuery((prev) => ({
                          ...prev,
                          categories:
                            prev.categories?.filter((c) => c !== category)
                              .length === 0
                              ? undefined
                              : prev.categories?.filter((c) => c !== category),
                        }));
                      }}
                    >
                      {capitalizeString(category)}
                    </p>
                  ))}
                  {searchQuery.categories.length > 2 && (
                    <p className="hover:underline">
                      +{searchQuery.categories.length - 2} more
                    </p>
                  )}
                </div>
                <X
                  className="ml-2 size-4 text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setSearchQuery((prev) => ({
                      ...prev,
                      categories: undefined,
                    }));
                  }}
                />
              </Button>
            )}
          </div>
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 size-4 h-full" />
            <Input
              placeholder="Search products..."
              className="rounded-full pl-8"
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setIsOpenSheet(true)}
          >
            <SlidersHorizontal className="mr-2 size-4" /> Filters
          </Button>
        </div>
      </div>
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetContent className="space-y-2">
          <div className="flex items-center gap-2 pb-2">
            <SlidersHorizontal className="mr-2 size-4" /> Filters
          </div>
          <Separator />
          <p>Status</p>
          <div>
            <Button
              className="w-full justify-between"
              variant="ghost"
              onClick={() => {
                setSearchQuery((prev) => ({
                  ...prev,
                  status: undefined,
                }));
              }}
            >
              <div className="flex items-center">
                <ListTree className="mr-2 size-4" /> All Status
              </div>
              {searchQuery.status === undefined && <Check className="size-4" />}
            </Button>
            {Object.values(Status).map((status) => (
              <Button
                key={status}
                className="w-full justify-between"
                variant="ghost"
                onClick={() => {
                  setSearchQuery((prev) => ({
                    ...prev,
                    status,
                  }));
                }}
              >
                <div className="flex items-center">
                  {status === Status.AVOID && (
                    <ThumbsDown className="mr-2 size-4" />
                  )}
                  {status === Status.NEUTRAL && <Meh className="mr-2 size-4" />}
                  {status === Status.SUPPORT && (
                    <ThumbsUp className="mr-2 size-4" />
                  )}
                  {capitalizeString(status)}
                </div>
                {searchQuery.status === status && <Check className="size-4" />}
              </Button>
            ))}
          </div>
          <Separator />
          <p>Categories</p>
          <MultiSelect
            options={categoriesList}
            onValueChange={(values) => {
              setSearchQuery((prev) => ({
                ...prev,
                categories: values.length === 0 ? undefined : values,
              }));
            }}
            defaultValue={searchQuery.categories ?? []}
            placeholder="Select categories..."
            variant="inverted"
            animation={2}
            maxCount={3}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
