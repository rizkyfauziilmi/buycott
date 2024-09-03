import { Skeleton } from "~/components/ui/skeleton";

export const ProductTableSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-9 w-96" />
        <Skeleton className="h-9 w-24" />
      </div>
      <Skeleton className="h-96 w-full" />
      <div className="flex items-center justify-between pt-4">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};
