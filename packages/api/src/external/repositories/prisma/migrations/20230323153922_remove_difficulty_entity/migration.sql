/*
  Warnings:

  - You are about to alter the column `last_difficulty` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `difficulties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_last_difficulty_fkey`;

-- AlterTable
ALTER TABLE `cards` MODIFY `last_difficulty` INTEGER NULL;

-- DropTable
DROP TABLE `difficulties`;
