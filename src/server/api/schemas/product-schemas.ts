import { z } from "zod";

export const SearchProductSchema = z.object({
  name: z.string().optional(),
  limit: z.number(),
  cursor: z.string().nullish(),
  skip: z.number().optional(),
  categories: z.array(z.string()).optional(),
});
