/*
  Warnings:

  - The primary key for the `UserDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_pkey",
DROP COLUMN "id",
ADD COLUMN     "userdetail_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("userdetail_id");
