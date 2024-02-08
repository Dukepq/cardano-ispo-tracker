/*
  Warnings:

  - You are about to alter the column `maxSupply` on the `project` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `distributingAmount` on the `project` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `maxSupply` INTEGER NULL,
    MODIFY `distributingAmount` INTEGER NOT NULL;
