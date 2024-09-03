import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
	CreateProductSchema,
	DeleteProductSchema,
	DeleteProductsSchema,
	SearchProductSchema,
	UpdateProductSchema,
	UpdateProductsSchema,
} from "../schemas/product-schemas";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

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
				isApproved: true,
			};

			const items = await ctx.db.product.findMany({
				take: limit + 1,
				skip: skip,
				cursor: cursor ? { id: cursor } : undefined,
				where: whereQueries,
				include: {
					alternatives: true,
					author: {
						select: {
							id: true,
							name: true,
							role: true,
							image: true,
						},
					},
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
	getAllProduct: adminProcedure.query(async ({ ctx }) => {
		return ctx.db.product.findMany({
			include: {
				author: {
					select: {
						id: true,
						name: true,
						role: true,
						image: true,
					},
				},
			},
		});
	}),
	getMostCategories: adminProcedure.query(async ({ ctx }) => {
		const products = await ctx.db.product.findMany({
			select: {
				categories: true,
			},
		});

		// calculate the frequency of each category
		const categoryCount: Record<string, number> = {};

		products.forEach((product) => {
			product.categories.forEach((category) => {
				if (categoryCount[category]) {
					categoryCount[category]++;
				} else {
					categoryCount[category] = 1;
				}
			});
		});

		// sort the categories by frequency
		const sortedCategories = Object.entries(categoryCount)
			.sort((a, b) => b[1] - a[1])
			.map(([category, count]) => ({ category, count }));

		return sortedCategories;
	}),
	createProduct: adminProcedure
		.input(CreateProductSchema)
		.mutation(async ({ input, ctx }) => {
			const {
				name,
				evidence,
				reason,
				categories,
				countries,
				evidence_url,
				alternatives,
				logo_url,
				website,
			} = input;

			const product = await ctx.db.product.create({
				data: {
					name,
					evidence,
					reason,
					categories,
					countries,
					evidence_url,
					logo_url,
					website,
					isApproved: true,
					authorId: ctx.session.user.id,
				},
			});

			// connect alternatives if alternatives are provided
			if (alternatives && alternatives.length !== 0) {
				await ctx.db.product.update({
					where: {
						id: product.id,
					},
					data: {
						alternatives: {
							connect: alternatives.map((id) => ({ id })),
						},
					},
				});
			}

			return product;
		}),
	getProductByApproval: adminProcedure.query(async ({ ctx }) => {
		// return count of products that are not approved and approved
		const notApproved = await ctx.db.product.count({
			where: {
				isApproved: false,
			},
		});

		const approved = await ctx.db.product.count({
			where: {
				isApproved: true,
			},
		});

		return {
			notApproved,
			approved,
		};
	}),
	updateProductById: adminProcedure
		.input(UpdateProductSchema)
		.mutation(async ({ input, ctx }) => {
			const { id, product } = input;

			const isProductsExist = await ctx.db.product.findUnique({
				where: {
					id,
				},
			});

			if (!isProductsExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}

			return ctx.db.product.update({
				where: {
					id,
				},
				data: {
					name: product.name,
					evidence: product.evidence,
					reason: product.reason,
					categories: product.categories,
					countries: product.countries,
					evidence_url: product.evidence_url,
					logo_url: product.logo_url,
					website: product.website,
					isApproved: product.isApproved,
				},
			});
		}),
	updateProductsByIds: adminProcedure
		.input(UpdateProductsSchema)
		.mutation(async ({ input, ctx }) => {
			const { ids, product } = input;

			const productsExist = await ctx.db.product.findMany({
				where: {
					id: {
						in: ids,
					},
				},
			});

			const isProductsExist = productsExist.length === ids.length;

			if (!isProductsExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}

			return ctx.db.product.updateMany({
				where: {
					id: {
						in: ids,
					},
				},
				data: {
					name: product.name,
					evidence: product.evidence,
					reason: product.reason,
					categories: product.categories,
					countries: product.countries,
					evidence_url: product.evidence_url,
					logo_url: product.logo_url,
					website: product.website,
					isApproved: product.isApproved,
				},
			});
		}),
	deleteProductById: adminProcedure
		.input(DeleteProductSchema)
		.mutation(async ({ input, ctx }) => {
			const isProductsExist = await ctx.db.product.findUnique({
				where: {
					id: input.id,
				},
			});

			if (!isProductsExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}

			return ctx.db.product.delete({
				where: {
					id: input.id,
				},
			});
		}),
	deleteProductsByIds: adminProcedure
		.input(DeleteProductsSchema)
		.mutation(async ({ input, ctx }) => {
			const productsExist = await ctx.db.product.findMany({
				where: {
					id: {
						in: input.ids,
					},
				},
			});

			const isProductsExist = productsExist.length === input.ids.length;

			if (!isProductsExist) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}

			return ctx.db.product.deleteMany({
				where: {
					id: {
						in: input.ids,
					},
				},
			});
		}),
});
