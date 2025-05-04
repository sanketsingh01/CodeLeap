/*
  Warnings:

  - You are about to drop the column `strerr` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `strout` on the `TestCaseResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "strerr",
ADD COLUMN     "stderr" TEXT;

-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "strout",
ADD COLUMN     "stdout" TEXT;
