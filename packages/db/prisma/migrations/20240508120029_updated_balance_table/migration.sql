-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "locked" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;
