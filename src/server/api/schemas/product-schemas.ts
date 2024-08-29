import { z } from "zod";

export const SearchProductSchema = z.object({
    name: z.string().optional(),
})