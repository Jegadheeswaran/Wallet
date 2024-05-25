/*
  Warnings:

  - Added the required column `status` to the `P2PTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "status" "OnRampStatus" NOT NULL;
