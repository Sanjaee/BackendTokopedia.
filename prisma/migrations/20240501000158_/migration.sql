/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `DetailProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetailProduct" DROP CONSTRAINT "DetailProduct_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnail",
ADD COLUMN     "detailproduct" JSONB;

-- DropTable
DROP TABLE "DetailProduct";
