const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const storeRoutes = require("./src/routes/store.routes");
const categoryRoutes = require("./src/routes/category.routes");
const productRoutes = require("./src/routes/products.routes");
const midtrans = require("./src/routes/midtrans.routes");
require("dotenv").config();

app.use(express.json());

app.use(cors());

app.use(userRoutes);
app.use(storeRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(midtrans);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
