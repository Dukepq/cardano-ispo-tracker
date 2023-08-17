import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // stuff
  } catch (err) {
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
}
main();
