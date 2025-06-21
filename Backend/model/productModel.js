const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  userId: { type: mongoose.Schema.ObjectId, require: true, ref: "user" },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;