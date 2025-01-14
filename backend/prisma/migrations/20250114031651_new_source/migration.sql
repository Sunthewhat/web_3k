-- CreateTable
CREATE TABLE `Announcement` (
    `announcementId` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `createdTime` DATETIME(0) NOT NULL,
    `isShowing` BOOLEAN NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Announcement_User_userId_fk`(`userId`),
    PRIMARY KEY (`announcementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Athlete` (
    `Id` VARCHAR(15) NOT NULL,
    `Prefix` VARCHAR(10) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `SID` VARCHAR(30) NULL,
    `Concern` VARCHAR(255) NULL,

    INDEX `SID`(`SID`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckinLogs` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `MID` INTEGER NOT NULL,
    `AID` VARCHAR(15) NOT NULL,
    `stamp` DATETIME(0) NOT NULL,

    INDEX `CheckinLogs_Athlete_Id_fk`(`AID`),
    INDEX `CheckinLogs___Match_Id_fk`(`MID`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `startTime` DATETIME(0) NOT NULL,
    `CompetitionRoom` VARCHAR(100) NOT NULL,
    `CompetitionInstitute` VARCHAR(20) NOT NULL,
    `Description` VARCHAR(100) NULL,
    `TID1` INTEGER NOT NULL,
    `TID2` INTEGER NOT NULL,
    `Result` VARCHAR(10) NULL,
    `isVerify` BOOLEAN NOT NULL,
    `Scoreinput` DATETIME(0) NULL,

    INDEX `Match_Team_Id_fk`(`TID1`),
    INDEX `Match_Team_Id_fk2`(`TID2`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TId` INTEGER NULL,
    `AId` VARCHAR(15) NULL,

    INDEX `Member_Athlete_Id_fk`(`AId`),
    INDEX `Member_Team_Id_fk`(`TId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Match_Id` INTEGER NOT NULL,
    `Round` VARCHAR(20) NOT NULL,
    `T1_Score` INTEGER NOT NULL,
    `T2_Score` INTEGER NOT NULL,

    INDEX `Score_Match_Id_fk`(`Match_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sport` (
    `Id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` ENUM('male', 'female', 'mix') NOT NULL,
    `type` ENUM('solo', 'duo', 'team') NOT NULL,
    `group` VARCHAR(1) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `Id` VARCHAR(255) NOT NULL,
    `Prefix` VARCHAR(10) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `Telephone` VARCHAR(15) NULL,
    `Position` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TID` INTEGER NOT NULL,
    `SID` VARCHAR(255) NOT NULL,

    INDEX `StaffTeam_Staff_Id_fk`(`SID`),
    INDEX `StaffTeam_Team_Id_fk`(`TID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StdStaff` (
    `Id` VARCHAR(50) NOT NULL,
    `Prefix` VARCHAR(10) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `StudentId` VARCHAR(15) NULL,
    `Major` VARCHAR(20) NULL,
    `Faculty` VARCHAR(20) NOT NULL,
    `University` ENUM('KMUTT', 'KMITL', 'KMUTNB') NULL,
    `Concern` VARCHAR(20) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `Id` INTEGER NOT NULL,
    `Institute` ENUM('KMUTT', 'KMITL', 'KMUTNB') NOT NULL,
    `SID` INTEGER NULL,

    INDEX `Team_Sport_Id_fk`(`SID`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `privilege` ENUM('admin', 'moderator') NOT NULL,
    `role` ENUM('Dev', 'Union', 'Football', 'Futsal', 'Basketball', 'Volleyball', 'Badminton', 'Bridge', 'Esport', 'Petangue', 'Tabletennis') NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medal` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NULL,
    `institute` ENUM('KMUTT', 'KMITL', 'KMUTNB') NULL,
    `medal` ENUM('gold', 'silver', 'bronze') NULL,
    `point` INTEGER NULL,

    INDEX `medal_Match_Id_fk`(`matchId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regisTracking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sport` VARCHAR(50) NOT NULL,
    `sex` VARCHAR(10) NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    `institute` VARCHAR(25) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staffCheckinLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SID` VARCHAR(20) NOT NULL,
    `stamp` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_User_userId_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `CheckinLogs` ADD CONSTRAINT `CheckinLogs_Athlete_Id_fk` FOREIGN KEY (`AID`) REFERENCES `Athlete`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `CheckinLogs` ADD CONSTRAINT `CheckinLogs___Match_Id_fk` FOREIGN KEY (`MID`) REFERENCES `Match`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_Team_Id_fk` FOREIGN KEY (`TID1`) REFERENCES `Team`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_Team_Id_fk2` FOREIGN KEY (`TID2`) REFERENCES `Team`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_Athlete_Id_fk` FOREIGN KEY (`AId`) REFERENCES `Athlete`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_Team_Id_fk` FOREIGN KEY (`TId`) REFERENCES `Team`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_Match_Id_fk` FOREIGN KEY (`Match_Id`) REFERENCES `Match`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `StaffTeam` ADD CONSTRAINT `StaffTeam_Staff_Id_fk` FOREIGN KEY (`SID`) REFERENCES `Staff`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `StaffTeam` ADD CONSTRAINT `StaffTeam_Team_Id_fk` FOREIGN KEY (`TID`) REFERENCES `Team`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_Sport_Id_fk` FOREIGN KEY (`SID`) REFERENCES `Sport`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `medal` ADD CONSTRAINT `medal_Match_Id_fk` FOREIGN KEY (`matchId`) REFERENCES `Match`(`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
