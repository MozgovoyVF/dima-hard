/*
  Warnings:

  - Made the column `photoUrl` on table `galery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "galery" ALTER COLUMN "photoUrl" SET NOT NULL;
