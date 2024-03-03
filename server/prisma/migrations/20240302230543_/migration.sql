-- AlterTable
ALTER TABLE `Image` ADD COLUMN `provider` ENUM('Cloudinary', 'local') NOT NULL DEFAULT 'local';
