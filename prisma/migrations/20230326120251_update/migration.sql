-- CreateTable
CREATE TABLE "Classes" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "specialSkill" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "combatType" TEXT NOT NULL,
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
