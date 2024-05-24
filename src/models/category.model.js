const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (data) => {
  return prisma.categoryProduct.create({
    data,
  });
};

const getAllCategories = async () => {
  return prisma.categoryProduct.findMany();
};

const deleteCategory = async (category_id) => {
  // Ganti parameter menjadi category_id
  return prisma.categoryProduct.delete({
    // Ganti properti yang dihapus menjadi category_id
    where: {
      category_id, // Gunakan category_id sebagai kriteria penghapusan
    },
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
