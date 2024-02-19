const { Schema, mongoose } = require("mongoose");

const cartSchema = new Schema({
  cartId: String,
  ownerId: String,
  contributorIds: [String],
  products: [String],
});

cartSchema.set("collection", "carts");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
