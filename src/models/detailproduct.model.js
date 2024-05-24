const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDetailProduct = async (data) => {
  return prisma.detailProduct.create({
    data,
  });
};

module.exports = {
  createDetailProduct,
};
