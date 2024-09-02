import type { Prisma } from "@prisma/client";

export type ProductWithAlternatives = Prisma.ProductGetPayload<{
  include: {
    alternatives: true;
  };
}>;
