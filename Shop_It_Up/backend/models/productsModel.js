const { Schema, mongoose } = require("mongoose");

const productSchema = new Schema({
  productId: String,
  sellerId: String,
  title: String,
  quantity: Number,
  description: String,
  price: Number,
  img: String,
});

productSchema.set("collection", "products");

const Product = mongoose.model("product", productSchema);

module.exports = Product;
