import type { Prisma } from "@prisma/client";
import { SearchProductSchema } from "../schemas/product-schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  search: publicProcedure
    .input(SearchProductSchema)
    .query(async ({ input, ctx }) => {
      const { name, limit, cursor, skip } = input;

      const whereQueries: Prisma.ProductWhereInput = {
        name: {
          contains: name,
          mode: "insensitive",
        },
      };

      const items = await ctx.db.product.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: whereQueries,
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
