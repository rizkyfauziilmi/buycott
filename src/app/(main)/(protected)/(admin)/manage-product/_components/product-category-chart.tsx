import { RefreshCw, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import type { ChartConfig } from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export const description = "A mixed bar chart";

export function ProductCategoryChart() {
  const {
    data: topCategories,
    isLoading,
    refetch,
    isRefetching,
  } = api.product.getMostCategories.useQuery();

  if (isLoading) {
    return <Skeleton className="h-96 w-full md:w-1/2" />;
  }

  const hasNoData = !topCategories || topCategories.length === 0;

  if (hasNoData) {
    return (
      <Card className="h-full w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Top 5 Product Categories</CardTitle>
          <CardDescription>
            A mixed bar chart showing the top 5 product categories by count
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isRefetching ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight text-muted-foreground">
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

  const chartData = topCategories.slice(0, 5).map((category) => ({
    category: category.category === "technology" ? "tech" : category.category,
    total: category.count,
    fill: `var(--color-${category.category === "technology" ? "tech" : category.category})`,
  }));

  const chartConfig = {
    total: {
      label: "Total",
    },
    ...chartData.reduce((acc, { category }, index) => {
      acc[category] = {
        label: category === "technology" ? "tech" : category,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  } satisfies ChartConfig;

  const topOnePercentageOfAllCategories =
    ((topCategories[0]?.count ?? 0) /
      topCategories.reduce((acc, { count }) => acc + count, 0)) *
    100;

  return (
    <Card className="h-full w-full md:w-1/2">
      <CardHeader>
        <CardTitle>Top 5 Product Categories</CardTitle>
        <CardDescription>
          A mixed bar chart showing the top 5 product categories by count
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Category {topCategories[0]?.category} Trending up by{" "}
          {topOnePercentageOfAllCategories.toFixed(2)}% this year{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 5 categories out of {topCategories.length} total
        </div>
      </CardFooter>
    </Card>
  );
}
