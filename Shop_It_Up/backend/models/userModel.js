const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
const userSchema = new Schema({
  userId: String,
  productsToSell: [String],
  recievedInvites: [String],
  cart: {
    cartId: String,
    ownerId: String,
    contributors: [String],
    products: String,
  },
});

productSchema.set("collection", "users");

const Product = mongoose.model("product", userSchema);

module.exports = Product;
