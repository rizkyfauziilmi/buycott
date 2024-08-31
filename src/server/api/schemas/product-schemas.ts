import { Status } from "@prisma/client";
import { z } from "zod";

export const SearchProductSchema = z.object({
  name: z.string().optional(),
  limit: z.number(),
  cursor: z.number().nullish(),
  skip: z.number().optional(),
  status: z.nativeEnum(Status).optional(),
  categories: z.array(z.string()).optional(),
});
