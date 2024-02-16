/*
  Warnings:

  - You are about to drop the column `ext` on the `image` table. All the data in the column will be lost.
  - Added the required column `extension` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `ext`,
    ADD COLUMN `extension` VARCHAR(191) NOT NULL,
    MODIFY `width` INTEGER NULL,
    MODIFY `height` INTEGER NULL;
