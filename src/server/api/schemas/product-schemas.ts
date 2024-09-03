import { z } from "zod";

export const SearchProductSchema = z.object({
	name: z.string().optional(),
	limit: z.number(),
	cursor: z.string().nullish(),
	skip: z.number().optional(),
	categories: z.array(z.string()).optional(),
});

export const CreateProductSchema = z.object({
	name: z
		.string({
			required_error: "Name is required",
		})
		.min(2, {
			message: "Name must be at least 2 characters",
		}),
	reason: z
		.string({
			required_error: "Reason is required",
		})
		.min(5, {
			message: "Reason must be at least 5 characters",
		}),
	evidence: z
		.string({
			required_error: "Evidence is required",
		})
		.min(15, {
			message: "Evidence must be at least 15 characters",
		}),
	evidence_url: z
		.string({
			required_error: "Evidence URL is required",
		})
		.url(),
	countries: z.array(z.string()),
	categories: z.array(z.string()),
	website: z.string().url().optional(),
	logo_url: z.string().url().optional(),
	alternatives: z.array(z.string()).optional(),
	isApproved: z.boolean().optional(),
});

const UpdateProductFields = z.object({
	name: z.string().optional(),
	reason: z.string().optional(),
	evidence: z.string().optional(),
	evidence_url: z.string().url().optional(),
	countries: z.array(z.string()).optional(),
	categories: z.array(z.string()).optional(),
	website: z.string().url().optional(),
	logo_url: z.string().url().optional(),
	alternatives: z.array(z.string()).optional(),
	isApproved: z.boolean().optional(),
});

export const UpdateProductSchema = z.object({
	id: z.string(),
	product: UpdateProductFields,
});
export const UpdateProductsSchema = z.object({
	ids: z.array(z.string()),
	product: UpdateProductFields,
});

export const DeleteProductSchema = z.object({
	id: z.string(),
});
export const DeleteProductsSchema = z.object({
	ids: z.array(z.string()),
});
