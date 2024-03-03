-- AlterTable
ALTER TABLE `image` ADD COLUMN `provider` ENUM('Cloudinary', 'local') NOT NULL DEFAULT 'local';
