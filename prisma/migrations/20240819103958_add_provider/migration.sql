/*
  Warnings:

  - Added the required column `provider` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('credentials', 'google');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "provider" "Provider" NOT NULL;
