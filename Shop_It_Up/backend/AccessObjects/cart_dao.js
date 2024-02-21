/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const { v4: uuidv4 } = require("uuid");

const cartModel = require("../Models/cart_model.js");

const addProduct = async (productId) => {};

const removeProduct = async (productId) => {};

const addContributor = async (cartId, userId) => {
  try {
    const confirmation = await cartModel.findOneAndUpdate(
      { cartId: cartId },
      { $push: { contributorIds: userId } },
      { new: true }
    );

    return confirmation;
  } catch (e) {
    console.error("add contributor error: ", e);
  }
};

const removeContributor = async (userId) => {};

const checkout = async (cartId, userId) => {};

//returns the whole cart
const findCart = async (cartId) => {
  try {
    const cart = await cartModel.findOne({ cartId: cartId });
    return cart;
  } catch (err) {
    return null;
  }
};

const createCart = async (userId) => {
  try {
    const cart = new cartModel({
      cartId: uuidv4(),
      contributorIds: [userId],
      products: [],
    }).save();

    return cart;
  } catch (e) {
    console.error("Cart Error: ", e);
  }
  //create new cart

  return cart;
};
//I can't remeber why we have this
const syncCart = async (userId) => {};

const deleteCart = async (cartId) => {};
module.exports = {
  addProduct,
  removeProduct,
  removeContributor,
  addContributor,
  checkout,
  syncCart,
  createCart,
  findCart,
};
