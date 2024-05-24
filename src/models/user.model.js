const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const findUserByEmail = async (email) => {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
};
