-- CreateTable
CREATE TABLE `decks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards` (
    `id` VARCHAR(191) NOT NULL,
    `term` VARCHAR(191) NOT NULL,
    `definition` VARCHAR(191) NOT NULL,
    `last_view` DATETIME(3) NULL,
    `deck_id` VARCHAR(191) NOT NULL,
    `last_difficulty` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `difficulties` (
    `name` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_deck_id_fkey` FOREIGN KEY (`deck_id`) REFERENCES `decks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_last_difficulty_fkey` FOREIGN KEY (`last_difficulty`) REFERENCES `difficulties`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
