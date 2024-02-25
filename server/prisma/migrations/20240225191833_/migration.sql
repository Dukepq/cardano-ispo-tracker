-- AlterTable
ALTER TABLE `project` ADD COLUMN `endsAt` DATETIME(3) NULL,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `startsAt` DATETIME(3) NULL;
