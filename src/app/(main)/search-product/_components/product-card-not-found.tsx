import { PackageX } from "lucide-react";

export const ProductCardNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <PackageX className="size-14" />
      <p className="text-xl text-muted-foreground">
        Product not found, please search with another keyword or filter.
      </p>
    </div>
  );
};
