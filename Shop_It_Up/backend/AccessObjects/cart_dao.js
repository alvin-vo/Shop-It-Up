/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const Cart = require("../models/cart_model,js");

// ADD PRODUCT TO CART
const addProduct = async (fidnCartId, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: fidnCartId },
      {"products.$": productId}
    );

    return cart;
  } catch (err) {
    return null;
  }
};

const removeProduct = async (productId) => {};

const addContributor = async (cartId) => {};

const removeContributor = async (userId) => {};

const checkout = async (cartId, userId) => {};

//I can't remeber why we have this
const syncCart = async (userId) => {};

const deleteCart = async (cartId) => {};

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
  syncCart,
  deleteCart,
  createCart,
};
