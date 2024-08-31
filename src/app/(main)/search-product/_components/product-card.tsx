import type { Product } from "@prisma/client";
import { Status } from "@prisma/client";
import { capitalizeString } from "~/lib/string";

import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import MarkdownToReact from "~/components/markdown-to-react";
import { useEffect, useRef } from "react";
import { useElementVisibility } from "~/app/hooks/use-observer";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
interface ProductCardProps {
  product: Product;
  isLastItem: boolean;
  isLastNextCursor: boolean;
  fetchNextPage: () => Promise<void>;
  hasNextPage: boolean;
}

export const ProductCard = ({
  product,
  isLastItem,
  isLastNextCursor,
  fetchNextPage,
  hasNextPage,
}: ProductCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useElementVisibility(ref);

  useEffect(() => {
    if (isVisible && isLastItem && isLastNextCursor && hasNextPage) {
      fetchNextPage()
        .then(() => {
          console.log("Fetched next page");
        })
        .catch((error) => {
          toast("Failed to fetch next page", {
            description: `Error: ${error}`,
            icon: <XCircle className="size-4" />,
          });
        });
    }
  }, [isVisible, isLastItem, isLastNextCursor, fetchNextPage, hasNextPage]);

  return (
    <div ref={ref} key={product.id} className="rounded-2xl border-[1px]">
      <div
        className={cn(
          !product.logo_url && "bg-muted",
          "relative flex h-80 w-full items-center justify-center overflow-hidden rounded-t-2xl",
        )}
      >
        {product.logo_url ? (
          <Image
            src={product.logo_url ?? ""}
            alt={""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={product.logo_url}
            className="h-full w-full rounded-2xl object-cover object-center"
          />
        ) : (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {product.name}
          </h3>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium leading-7 [&:not(:first-child)]:mt-6">
              {product.name}
            </p>
            <small className="text-sm font-semibold leading-none">
              {product.reason ?? "No reason provided"}
            </small>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant={
                    product.status === Status.AVOID
                      ? "destructive"
                      : product.status === Status.NEUTRAL
                        ? "secondary"
                        : "success"
                  }
                >
                  {capitalizeString(product.status)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {product.status === Status.AVOID
                  ? "This product is boycotted"
                  : product.status === Status.SUPPORT
                    ? "This product is safe"
                    : "This product need more information"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ScrollArea className="my-2 h-[100px] w-full rounded-md text-sm text-muted-foreground">
          <MarkdownToReact markdown={product.description} />
        </ScrollArea>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-wrap gap-2 p-4">
        {product.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {capitalizeString(category)}
          </Badge>
        ))}
      </div>
    </div>
  );
};
