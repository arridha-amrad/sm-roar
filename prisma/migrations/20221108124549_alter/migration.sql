/*
  Warnings:

  - Added the required column `userId` to the `post_replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post_replies" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
