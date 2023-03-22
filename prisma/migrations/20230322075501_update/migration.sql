/*
  Warnings:

  - The primary key for the `Weapon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `kind` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weapon" (
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "desc" TEXT,
    "approach" TEXT,
    "price" INTEGER,
    "might" INTEGER,
    "hit" INTEGER,
    "weight" INTEGER,
    "crit" INTEGER,
    "avoid" INTEGER,
    "ddg" INTEGER,
    "rng" INTEGER,
    "level" TEXT,
    "eff" TEXT
);
INSERT INTO "new_Weapon" ("avoid", "crit", "ddg", "eff", "hit", "level", "might", "name", "rng", "weight") SELECT "avoid", "crit", "ddg", "eff", "hit", "level", "might", "name", "rng", "weight" FROM "Weapon";
DROP TABLE "Weapon";
ALTER TABLE "new_Weapon" RENAME TO "Weapon";
CREATE UNIQUE INDEX "Weapon_name_type_key" ON "Weapon"("name", "type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
