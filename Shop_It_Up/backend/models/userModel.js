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
    products: [String],
  },
});

userSchema.set("collection", "users");

const User = mongoose.model("user", userSchema);

module.exports = User;
