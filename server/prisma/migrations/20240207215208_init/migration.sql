/*
  Warnings:

  - You are about to alter the column `margin` on the `pool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `pool` MODIFY `margin` DECIMAL(9, 2) NOT NULL;
