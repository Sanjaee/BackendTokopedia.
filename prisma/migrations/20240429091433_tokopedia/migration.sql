/*
  Warnings:

  - Added the required column `location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sales" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT[];

-- CreateTable
CREATE TABLE "DetailProduct" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "DetailProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetailProduct" ADD CONSTRAINT "DetailProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
