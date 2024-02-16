-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_projectId_fkey`;

-- AlterTable
ALTER TABLE `image` MODIFY `projectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
