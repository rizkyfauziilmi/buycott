import type { Prisma } from "@prisma/client";

export type ProductWithAuthor = Prisma.ProductGetPayload<{
	include: {
		author: {
			select: {
				id: true;
				name: true;
				role: true;
				image: true;
			};
		};
	};
}>;

export type ProductWithAlternativesAndAuthor = Prisma.ProductGetPayload<{
	include: {
		alternatives: true;
		author: {
			select: {
				id: true;
				name: true;
				role: true;
				image: true;
			};
		};
	};
}>;
