import type { Prisma } from "@prisma/client";
import { SearchProductSchema } from "../schemas/product-schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  search: publicProcedure
    .input(SearchProductSchema)
    .query(async ({ input, ctx }) => {
      const { name, limit, cursor, skip, categories } = input;

      const whereQueries: Prisma.ProductWhereInput = {
        name: {
          contains: name,
          mode: "insensitive",
        },
        categories: {
          hasSome: categories ?? [
            "household",
            "target",
            "weapons",
            "healthcare",
            "insurance",
            "web3",
            "hardware",
            "development",
            "hr",
            "contractor",
            "finance",
            "security",
            "travel",
            "entertainment",
            "manufacturer",
            "pharmaceuticals",
            "fintech",
            "developer",
            "marketing",
            "commerce",
            "others",
            "sales",
            "fashion",
            "charity",
            "cosmetics",
            "books",
            "dates",
            "productivity",
            "semiconductors",
            "clothing",
            "politics",
            "coffee",
            "drinks",
            "supermarket",
            "energy",
            "car",
            "cloud",
            "technology",
            "other",
            "petcare",
            "food",
          ],
        },
      };

      const items = await ctx.db.product.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: whereQueries,
        include: {
          alternatives: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      // determine total of products
      const totalProducts = await ctx.db.product.count({
        where: whereQueries,
      });

      return {
        items,
        nextCursor,
        totalProducts,
      };
    }),
});
