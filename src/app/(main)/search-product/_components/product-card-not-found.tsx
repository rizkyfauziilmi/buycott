import { PackageX } from "lucide-react";

export const ProductCardNotFound = () => {
  return (
    <div className="flex pt-36 md:pt-0 md:h-screen flex-col items-center justify-center gap-2">
      <PackageX className="size-14" />
      <p className="text-xl text-muted-foreground text-center">
        Product not found, please search with another keyword or filter.
      </p>
    </div>
  );
};
