/*
  Warnings:

  - You are about to alter the column `tdee` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `bmi` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `bmr` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "tdee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "bmi" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "bmr" SET DATA TYPE DOUBLE PRECISION;
