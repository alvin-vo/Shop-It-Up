const { Schema, mongoose } = require("mongoose");

const cartSchema = new Schema({
  cartId: String,
  ownerId: String,
  contributorIds: [String],
  products: Product[String],
});

cartSchema.set("collection", "carts");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
