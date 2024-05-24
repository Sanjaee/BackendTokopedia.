const cloudnary = require("cloudinary").v2;
require("dotenv").config();

cloudnary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

module.exports = cloudnary;
