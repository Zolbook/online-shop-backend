/*
  Warnings:

  - You are about to drop the `Colors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colors` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" JSONB NOT NULL;

-- DropTable
DROP TABLE "Colors";
