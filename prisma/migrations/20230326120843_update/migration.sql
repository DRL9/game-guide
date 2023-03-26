/*
  Warnings:

  - You are about to drop the column `desc` on the `Classes` table. All the data in the column will be lost.
  - Added the required column `combatDesc` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillDesc` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Classes" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "specialSkill" TEXT NOT NULL,
    "skillDesc" TEXT NOT NULL,
    "combatType" TEXT NOT NULL,
    "combatDesc" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "hpMax" INTEGER NOT NULL,
    "powerMax" INTEGER NOT NULL,
    "magicMax" INTEGER NOT NULL,
    "skillMax" INTEGER NOT NULL,
    "speedMax" INTEGER NOT NULL,
    "luckMax" INTEGER NOT NULL,
    "resistanceMax" INTEGER NOT NULL,
    "defenseMax" INTEGER NOT NULL,
    "constitutionMax" INTEGER NOT NULL
);
INSERT INTO "new_Classes" ("combatType", "constitutionMax", "defenseMax", "hpMax", "level", "luckMax", "magicMax", "name", "order", "powerMax", "remark", "resistanceMax", "skillMax", "specialSkill", "speedMax", "weapon") SELECT "combatType", "constitutionMax", "defenseMax", "hpMax", "level", "luckMax", "magicMax", "name", "order", "powerMax", "remark", "resistanceMax", "skillMax", "specialSkill", "speedMax", "weapon" FROM "Classes";
DROP TABLE "Classes";
ALTER TABLE "new_Classes" RENAME TO "Classes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
