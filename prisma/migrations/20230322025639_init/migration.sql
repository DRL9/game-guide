-- CreateTable
CREATE TABLE "Emblem" (
    "emblem" TEXT NOT NULL PRIMARY KEY,
    "imbue" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "hit" INTEGER NOT NULL,
    "crit" INTEGER NOT NULL,
    "avoid" INTEGER NOT NULL,
    "ddg" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Weapon" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "might" INTEGER NOT NULL,
    "hit" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "crit" INTEGER NOT NULL,
    "avoid" INTEGER NOT NULL,
    "ddg" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "rng" INTEGER NOT NULL,
    "eff" TEXT NOT NULL
);
