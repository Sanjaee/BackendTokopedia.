const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStore = async (data) => {
  return prisma.store.create({
    data,
  });
};

const getAllStores = async () => {
  return prisma.store.findMany();
};

const deleteStore = async (store_id) => {
  return prisma.store.delete({
    where: {
      store_id,
    },
  });
};

module.exports = {
  createStore,
  getAllStores,
  deleteStore,
};
