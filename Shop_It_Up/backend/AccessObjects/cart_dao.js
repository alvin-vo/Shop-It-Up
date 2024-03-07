/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const Cart = require("../Models/cart_model.js");

// ADD PRODUCT TO CART
const addProduct = async (findCartId, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: findCartId },
      { $push: {"products": productId} }
    );
    return true;
  } catch (err) {
    return null;
  }
};

const firstProduct = async (findCartId, passedInProductId, passedInUserId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: findCartId },
      { $set: {"products": passedInProductId} },
      { $set: {"contributorIds": passedInUserId} },
    );
    return true;
  } catch (err) {
    return null;
  }
};

const removeProduct = async (findCartId, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: findCartId },
      { $pull: {"products": productId} }
    );

    return true;
  } catch (err) {
    return null;
  }
};

const inCart = async (findCartId, passedInUserId) => {
  try {
    const cart = await Cart.findOne(
      { cartId: findCartId },
      { "contributorIds": passedInUserId }
    );
    if(cart.contributorIds.length == 0) {
      return false;
    }
    return true;
  } catch (err) {
    return null;
  }

};

const addContributor = async (cartId) => {
  
};

const removeContributor = async (userId) => {};

const checkout = async (cartId, userId) => {};

const getOnlyCart = async (passedInCartId) => {
  try {
    const cart = await Cart.findOne(
      { "cartId": passedInCartId },
    );

    return cart;
  } catch (err) {
    return null;
  }
};

const deleteCart = async (passedInCartId) => {
  try {
    const cart = await Cart.findOneAndDelete({ "cartId": passedInCartId });
    return cart;
  } catch (err) {
    return null; // Return null if error.
  }
};

const createCart = async () => {
  try {
    createdCartId = makeNewId();
    const newCart = new Cart({
      "cartId": createdCartId
  });
  newCart.save();
    // Return created cartId.
    return createdCartId;
  } catch (err) {
    return null; // Return null if error.
  }
};

const getAllCarts = async () => {
  try {
    const carts = await Cart.find({});
    return carts;
  } catch (err) {
    return null;
  }
};

// HELPER FUNCTIONS

// MAKE NEW ID (FOR CART) OF LENGTH 13
function makeNewId() {
  // SET VALUES CARTID CAN BE
  const validChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const validCharLength = validChar.length;
  // VALUE TO RETURN
  var returnVal = '';
  // CREATE VALUE
  let count = 0;
  while (count < 13) {
    returnVal += validChar.charAt(Math.floor(Math.random() * validCharLength));
    count += 1;
  }
  // RETURN
  return returnVal;
}

module.exports = {
  addProduct,
  removeProduct,
  removeContributor,
  addContributor,
  checkout,
  deleteCart,
  createCart,
  getAllCarts,
  getOnlyCart,
  inCart,
  firstProduct,
};
