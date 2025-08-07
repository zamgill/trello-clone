-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "isClosed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
