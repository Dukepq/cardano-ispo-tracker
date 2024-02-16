/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Image_projectId_key` ON `Image`(`projectId`);
