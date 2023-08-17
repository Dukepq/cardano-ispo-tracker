/*
  Warnings:

  - A unique constraint covering the columns `[ticker]` on the table `Pool` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[poolId]` on the table `Pool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Pool_ticker_key` ON `Pool`(`ticker`);

-- CreateIndex
CREATE UNIQUE INDEX `Pool_poolId_key` ON `Pool`(`poolId`);
