const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
const cartSchema = new Schema({});

cartSchema.set("collection", "carts");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
