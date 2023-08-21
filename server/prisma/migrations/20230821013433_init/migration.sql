-- DropForeignKey
ALTER TABLE `pool` DROP FOREIGN KEY `Pool_project_id_fkey`;

-- AddForeignKey
ALTER TABLE `Pool` ADD CONSTRAINT `Pool_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
