-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "author" SET DEFAULT '';