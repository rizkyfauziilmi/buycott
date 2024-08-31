import { z } from "zod";

export const SearchProductSchema = z.object({
  name: z.string().optional(),
  limit: z.number(),
  cursor: z.number().nullish(),
  skip: z.number().optional(),
});
