import { Skeleton } from "~/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="space-y-1 overflow-hidden rounded-2xl border">
      <Skeleton className="h-80 w-full" />
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-5 w-[50px] rounded-md" />
        </div>
        <Skeleton className="h-[100px]" />
      </div>
      <div className="flex flex-wrap gap-2 border-t p-4">
        <Skeleton className="h-5 w-[50px] rounded-md" />
        <Skeleton className="h-5 w-[50px] rounded-md" />
        <Skeleton className="h-5 w-[50px] rounded-md" />
      </div>
    </div>
  );
};
