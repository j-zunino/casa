/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_inviterId_fkey";

-- DropIndex
DROP INDEX "invitation_email_idx";

-- AlterTable
ALTER TABLE "invitation" ADD COLUMN     "code" TEXT,
ADD COLUMN     "maxUses" INTEGER,
ADD COLUMN     "useCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invitation_code_key" ON "invitation"("code");

-- CreateIndex
CREATE INDEX "invitation_code_idx" ON "invitation"("code");

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
