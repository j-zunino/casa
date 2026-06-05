/*
  Warnings:

  - The `status` column on the `invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `role` on table `invitation` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('active', 'revoked', 'expired');

-- DropForeignKey
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_inviterId_fkey";

-- AlterTable
ALTER TABLE "invitation" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'member',
DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'active',
ALTER COLUMN "expiresAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
