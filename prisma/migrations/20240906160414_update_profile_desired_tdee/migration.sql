/*
  Warnings:

  - You are about to drop the column `desiredtTdee` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "desiredtTdee",
ADD COLUMN     "desiredTdee" DECIMAL(10,2);
