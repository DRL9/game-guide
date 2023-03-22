/*
  Warnings:

  - You are about to drop the `Emblem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Emblem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EmblemImbue" (
    "emblem" TEXT NOT NULL PRIMARY KEY,
    "imbue" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "hit" INTEGER NOT NULL,
    "crit" INTEGER NOT NULL,
    "avoid" INTEGER NOT NULL,
    "ddg" INTEGER NOT NULL
);
