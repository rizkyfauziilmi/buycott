import { Skeleton } from "~/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="space-y-1 overflow-hidden rounded-2xl border">
      <Skeleton className="h-60 w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <div className="mt-2 flex items-center gap-2 overflow-y-auto">
          <Skeleton className="h-5 w-[50px] rounded-md" />
          <Skeleton className="h-5 w-[50px] rounded-md" />
          <Skeleton className="h-5 w-[50px] rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t p-4">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-md" />
      </div>
    </div>
  );
};
