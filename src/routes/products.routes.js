const express = require("express");
const router = express.Router();
const cloudinary = require("../Utils/Cloudnary");
const ProductModel = require("../models/products.models");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/upload", upload.array("images", 5), async function (req, res) {
  try {
    const uploadedUrls = [];

    for (const file of req.files) {
      const cloudinaryUploadResult = await cloudinary.uploader.upload(
        file.path
      );
      uploadedUrls.push(cloudinaryUploadResult.secure_url);
    }

    const detailProducts = { urls: uploadedUrls };

    const savedProduct = await prisma.product.create({
      data: {
        product_name: req.body.product_name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        rating: parseFloat(req.body.rating),
        location: req.body.location,
        sales: parseInt(req.body.sales),
        detailproduct: detailProducts,
        seller_id: parseInt(req.body.seller_id),
        category_id: parseInt(req.body.category_id),
        created_at: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/products/:id", async (req, res) => {
  // Ambil ID produk dari parameter URL
  const product_id = parseInt(req.params.id);
  try {
    const product = await ProductModel.getProductById(product_id);
    if (!product) {
      // Jika produk tidak ditemukan, kirim respons dengan status 404 Not Found
      return res.status(404).json({ error: "Product not found" });
    }
    // Kirim produk dalam respons
    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  // Pastikan parameter adalah id
  const product_id = parseInt(req.params.id);
  try {
    const deletedProduct = await ProductModel.deleteProduct(product_id);
    if (!deletedProduct) {
      // Jika produk tidak ditemukan, kirim respons dengan status 404 Not Found
      return res.status(404).json({ error: "Product not found" });
    }
    // Kirim respons bahwa produk berhasil dihapus
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
