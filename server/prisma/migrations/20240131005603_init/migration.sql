/*
  Warnings:

  - Added the required column `margin` to the `Pool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pool` ADD COLUMN `margin` INTEGER NOT NULL;
