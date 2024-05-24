const express = require("express");
const router = express.Router();
const StoreModel = require("../models/store.model");

router.post("/stores", async (req, res) => {
  const { store_name, owner_id } = req.body;
  try {
    const newStore = await StoreModel.createStore({ store_name, owner_id });
    res.json(newStore);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stores", async (req, res) => {
  try {
    const stores = await StoreModel.getAllStores();
    res.json(stores);
  } catch (error) {
    console.error("Error retrieving stores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/stores/:id", async (req, res) => {
  // Pastikan parameter adalah id
  const storesId = parseInt(req.params.id);
  try {
    const deletedStore = await StoreModel.deleteStore(storesId);
    res.json(deletedStore);
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
