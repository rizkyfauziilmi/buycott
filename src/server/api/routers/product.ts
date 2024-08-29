import { SearchProductSchema } from "../schemas/product-schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
    search: publicProcedure
        .input(SearchProductSchema)
        .query(async ({ input, ctx }) => {
            const { name } = input;

            return ctx.db.product.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive",
                    }
                },
                take: 10
            })
        })
})