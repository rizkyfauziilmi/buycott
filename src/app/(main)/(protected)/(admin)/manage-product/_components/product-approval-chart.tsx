import { RefreshCw } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import type { ChartConfig } from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export const description = "A donut chart with text";

const chartConfig = {
  product: {
    label: "Product",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-1))",
  },
  notapprove: {
    label: "Not Approved",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ProductApprovalChart() {
  const {
    data: approvalProduct,
    isLoading,
    refetch,
    isRefetching,
  } = api.product.getProductByApproval.useQuery();

  if (isLoading) {
    return <Skeleton className="h-80 w-full md:w-1/2" />;
  }

  const hasNoData =
    !approvalProduct ||
    (approvalProduct.approved === 0 && approvalProduct.notApproved === 0);

  if (hasNoData) {
    return (
      <Card className="flex h-full w-full flex-col md:w-1/2">
        <CardHeader className="items-center">
          <CardTitle>Product Approval</CardTitle>
          <CardDescription>
            A donut chart showing the approved and not approved products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isRefetching ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <h4 className="text-center text-xl font-semibold tracking-tight text-muted-foreground">
              No data available
            </h4>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={async () => {
              await refetch();
            }}
            disabled={isRefetching}
          >
            <RefreshCw
              className={cn(isRefetching && "animate-spin", "mr-2 size-4")}
            />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const chartDatas = [
    {
      title: "approved",
      product: approvalProduct.approved,
      fill: "var(--color-approved)",
    },
    {
      title: "notapprove",
      product: approvalProduct.notApproved,
      fill: "var(--color-notapprove)",
    },
  ];

  const totalProducts = approvalProduct.approved + approvalProduct.notApproved;
  const approvedPercentage = (approvalProduct.approved / totalProducts) * 100;
  const notApprovedPercentage =
    (approvalProduct.notApproved / totalProducts) * 100;

  return (
    <Card className="flex h-full w-full flex-col md:w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Approval</CardTitle>
        <CardDescription>
          {approvedPercentage.toFixed(2)}% Approved |{" "}
          {notApprovedPercentage.toFixed(2)}% Not Approved
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDatas}
              dataKey="product"
              nameKey="title"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProducts}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="title" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
