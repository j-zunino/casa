-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "todo_parentId_idx" ON "todo"("parentId");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
