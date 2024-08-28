/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import products from "./boycott-without-id.json"

async function main() {
  // clean the database
  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        status: product.status === "avoid" ? "AVOID" : product.status === "neutral" ? "NEUTRAL" : "SUPPORT",
        reason: product.reasons,
        countries: product.countries,
        // "technology, healthcare" to [technology, healthcare]
        categories: product.categories.split(", ").map((category) => category.trim()),
        website: product.website,
        logo_url: product.logo_url,
        alternatives: product.alternative
      },
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })