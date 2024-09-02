/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import products from "./boycott-without-id.json";
import { separateTextAndUrl } from "~/lib/string";

let count = 0;

async function main() {
  // clean the database
  await prisma.product.deleteMany();

  const filteredProducts = products.filter(
    (product) => product.status === "avoid",
  );

  for (const product of filteredProducts) {
    await prisma.product.create({
      data: {
        evidence: separateTextAndUrl(product.description).text,
        evidence_url: separateTextAndUrl(product.description).url,
        name: product.name,
        reason: product.reasons ?? "Supporting Israel",
        categories: product.categories
          .split(", ")
          .map((category) => category.trim()),

        website: product.website,
        countries:
          product.countries === null
            ? []
            : product.countries.split(", ").map((country) => country.trim()),
        logo_url: product.logo_url,
      },
    });

    // clear the console
    process.stdout.write("\u001b[2J\u001b[0;0H");

    count++;
    console.log(`Created product ${count}/${filteredProducts.length}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
