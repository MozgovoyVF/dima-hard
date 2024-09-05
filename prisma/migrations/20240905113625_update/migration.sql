/*
  Warnings:

  - You are about to alter the column `tdee` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `bmi` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `bmr` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "tdee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "bmi" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "bmr" SET DATA TYPE DECIMAL(10,2);
