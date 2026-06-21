-- AlterTable
ALTER TABLE "invitation" ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "revokedById" TEXT;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_revokedById_fkey" FOREIGN KEY ("revokedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
