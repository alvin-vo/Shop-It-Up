const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 3,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 800,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

productSchema.set("collection", "products");

const product = mongoose.model("product", productSchema);

module.exports = product;
