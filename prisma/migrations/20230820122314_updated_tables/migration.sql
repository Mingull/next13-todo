/*
  Warnings:

  - You are about to drop the column `complete` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `todos` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `passwords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_userId_fkey`;

-- AlterTable
ALTER TABLE `passwords` ADD COLUMN `serviceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `complete`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `completed` BOOLEAN NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passwords` ADD CONSTRAINT `passwords_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
