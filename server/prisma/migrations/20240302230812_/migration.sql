/*
  Warnings:

  - You are about to alter the column `provider` on the `image` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Image` MODIFY `provider` ENUM('CLOUDINARY', 'LOCAL') NOT NULL DEFAULT 'LOCAL';
