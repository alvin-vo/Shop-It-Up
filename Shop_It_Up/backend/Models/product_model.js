const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
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

const product = mongoose.model("product", productSchema);

module.exports = product;
