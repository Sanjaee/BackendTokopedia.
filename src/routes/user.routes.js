const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const { generateToken } = require("../auth/auth");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validasi bidang yang diperlukan
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    // Cek apakah email sudah digunakan
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Buat pengguna baru
    const newUser = await UserModel.createUser({ username, email, password });

    // Menghasilkan token JWT setelah pengguna berhasil mendaftar
    const token = generateToken({
      id: newUser.user_id, // Mengambil ID dari pengguna yang baru dibuat
      username: newUser.username,
      email: newUser.email,
    });

    res.json({ user: newUser, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validasi bidang yang diperlukan
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Cari pengguna berdasarkan email
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verifikasi password
    // (Perhatikan bahwa cara ini tidak aman dan Anda sebaiknya menggunakan hashing password)
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Mengambil data toko terkait dengan pengguna dari basis data
    const store = await prisma.store.findFirst({
      where: {
        owner_id: user.user_id,
      },
    });

    // Mengambil produk yang dijual oleh pengguna
    const products = await prisma.product.findMany({
      where: {
        seller_id: user.user_id,
      },
    });

    // Jika tidak ada toko terkait, kita mungkin ingin menangani kasus ini sesuai kebutuhan aplikasi.

    // Jika password valid, buat token JWT dengan menambahkan store_name dan produk ke dalam payload
    const tokenPayload = {
      id: user.user_id,
      username: user.username,
      email: user.email,
      store_name: store ? store.store_name : null, // Menambahkan store_name jika toko ditemukan, jika tidak, mengembalikan null
      products: products.map((product) => ({
        product_id: product.product_id,
      })),
    };

    const token = generateToken(tokenPayload);

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/v1/users/scret", async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
