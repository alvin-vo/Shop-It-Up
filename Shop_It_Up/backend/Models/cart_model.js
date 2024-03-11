const { Schema, mongoose } = require("mongoose");

const cartSchema = new Schema({
  cartId: {
    type: String,
    required: true,
  },
  contributorIds: [String],
  products: [{ productId: String, quantity: Number }],
});

cartSchema.set("collection", "carts");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
