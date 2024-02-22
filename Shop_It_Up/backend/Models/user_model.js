const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
const userSchema = new Schema({
  userId: String,
  email: String,
  productsToSell: [String],
  cartId: String,
});

userSchema.set("collection", "users");

const user = mongoose.model("user", userSchema);

module.exports = user;

