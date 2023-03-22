/*
  Warnings:

  - You are about to drop the column `damage` on the `EmblemImbue` table. All the data in the column will be lost.
  - Added the required column `might` to the `EmblemImbue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmblemImbue" (
    "order" INTEGER NOT NULL,
    "emblem" TEXT NOT NULL PRIMARY KEY,
    "imbue" TEXT NOT NULL,
    "might" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "hit" INTEGER NOT NULL,
    "crit" INTEGER NOT NULL,
    "avoid" INTEGER NOT NULL,
    "ddg" INTEGER NOT NULL
);
INSERT INTO "new_EmblemImbue" ("avoid", "crit", "ddg", "emblem", "hit", "imbue", "order", "weight") SELECT "avoid", "crit", "ddg", "emblem", "hit", "imbue", "order", "weight" FROM "EmblemImbue";
DROP TABLE "EmblemImbue";
ALTER TABLE "new_EmblemImbue" RENAME TO "EmblemImbue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
