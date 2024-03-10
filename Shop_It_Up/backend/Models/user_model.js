const { Schema, mongoose } = require("mongoose");

// IF YOU CHANGE SCHEMA, REMEMBER TO GO TO PRODUCT MANAGER AND MIRROR THE CHANGES!
const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  productsToSell: [String],
  cartId: {
    type: String,
    required: true,
  },
});

userSchema.set("collection", "users");

const user = mongoose.model("user", userSchema);

module.exports = user;
