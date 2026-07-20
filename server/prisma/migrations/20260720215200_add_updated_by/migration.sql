-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "updatedById" TEXT;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
