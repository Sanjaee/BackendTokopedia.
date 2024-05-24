const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async () => {
  return prisma.product.findMany();
};

const getProductById = async (product_id) => {
  return prisma.product.findUnique({
    where: {
      product_id,
    },
  });
};

const deleteProduct = async (product_id) => {
  return prisma.product.delete({
    where: {
      product_id,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
};
