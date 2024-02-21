-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isMale` BOOLEAN NOT NULL,
    `useImperial` BOOLEAN NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `health_goal` ENUM('weightloss', 'stabile', 'weightgain') NOT NULL,
    `goal_tempo` INTEGER NOT NULL,
    `activity_level` DOUBLE NOT NULL,
    `bmr` INTEGER NOT NULL,
    `energy_intake` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Foodpreference` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `pref_MealModels` VARCHAR(191) NOT NULL,
    `meals_PerDayIs` INTEGER NOT NULL,
    `pref_CookingTimeIs` JSON NOT NULL,

    UNIQUE INDEX `Foodpreference_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intolerances` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Foodpreference` ADD CONSTRAINT `Foodpreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intolerances` ADD CONSTRAINT `Intolerances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Foodpreference`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
