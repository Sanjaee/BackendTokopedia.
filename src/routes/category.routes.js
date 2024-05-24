const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/category.model");

router.post("/categories", async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await CategoryModel.createCategory({ category_name });
    res.json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/categories/:id", async (req, res) => {
  // Pastikan parameter adalah id
  const { id } = req.params;
  try {
    const deletedCategory = await CategoryModel.deleteCategory(parseInt(id)); // Parse id menjadi integer jika perlu
    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
