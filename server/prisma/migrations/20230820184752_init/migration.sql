/*
  Warnings:

  - You are about to drop the column `DistributingAmount` on the `project` table. All the data in the column will be lost.
  - Added the required column `distributingAmount` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `DistributingAmount`,
    ADD COLUMN `distributingAmount` INTEGER NOT NULL;
