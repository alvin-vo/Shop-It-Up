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
      {$push: {"products": productId}}
    );

    return cart;
  } catch (err) {
    return null;
  }
};

const removeProduct = async (findCartId, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: findCartId },
      {$pull: {"products": productId}}
    );

    return true;
  } catch (err) {
    return null;
  }
};

const inCart = async (findCartId, userId) => {
  try {
    const cart = await Cart.findOne(
      { cartId: findCartId },
      { $in : { "contributorIds" : userId } }
    );

    return cart;
  } catch (err) {
    return null;
  }

};

const addContributor = async (cartId) => {
  
};

const removeContributor = async (userId) => {};

const checkout = async (cartId, userId) => {};

const getOnlyCart = async (cartId) => {
  try {
    const cart = await Cart.findOne(
      { cartId: cartId },
    );

    return cart;
  } catch (err) {
    return null;
  }
};

const deleteCart = async (passedInCartId) => {
  try {
    const cart = await Cart.findOneAndDelete({ productId: passedInCartId });
    // Return empty, product deleted ?
    return cart;

  } catch (err) {
    return null; // Return null if error.
  }
};

const createCart = async(userIdForNewCart) => {
  try {
    createdCartId = makeNewId();
    const newCart = new Cart({
      cartId: createdCartId,
      ownerId: userIdForNewCart,
      contributorIds: [userIdForNewCart],
      products: [],
  })
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
  const validChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=!@#$%^&*()_+';
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
};
