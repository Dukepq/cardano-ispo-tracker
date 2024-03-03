/*
  Warnings:

  - Made the column `publicId` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Image` MODIFY `publicId` VARCHAR(191) NOT NULL;
