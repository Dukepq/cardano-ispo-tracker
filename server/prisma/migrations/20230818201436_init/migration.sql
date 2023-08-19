-- AlterTable
ALTER TABLE `pool` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `distributingPercentage` INTEGER NULL,
    ADD COLUMN `logoImageURL` VARCHAR(191) NULL,
    ADD COLUMN `websiteURL` VARCHAR(191) NULL;
