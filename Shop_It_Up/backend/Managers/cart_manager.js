const cartDAO = require("../models/cart_dao.js");
const userManager = require("../Managers/user_manager.js");
const productManager = require("../Managers/product_manager.js");

// PRODUCT UPDATE:

// 0: CHECK IF CART IS EMPTY
// 1: CHECK IF PRODUCT EXISTS
// 2: RETURN IF PRODUCT DOESN'T EXIST
// 3: IF CART IS EMPTY -> 4, ELSE -> 5
// 4: CREATE CART 
// 5: ADD PRODUCT TO CART
// 6: RETURN NEW CART
const addProductToCart = async (passedInInfo) => {
  const realCart = await userManager.checkValidCart(passedInInfo.params.cartId); // Should be TRUE
  const realProduct = await productManager.getOneProduct(passedInInfo); // Should be set to a valid product

  if(realProduct) { // REAL PRODUCT
    if(realCart) { // REAL CART
      return await cartDAO.addProduct(passedInInfo.params.cartId, realProduct.productId);
    } else { // NEW CART
      const userIdForCart = "707"; // TEMPORARY ID
      const newCart = await createCart(userIdForCart); // PASS IN USER ID -> RETURNS NEW CART ID
      return await cartDAO.addProduct(newCart, realProduct.productId);
    }
  }

  return null;  // PRODUCT DOESN'T EXIST, ERROR
};

const removeProductFromCart = async (productId) => {};


// USER UPDATE:

const addContributorToCart = async (cartId) => {};

const removeContributorFromCart = async (userId) => {};

// CART UPDATE

const checkoutCart = async (cartId, userId) => {};

const deleteCart = async (cartId) => {};

// HELPER FUNCTIONS

async function createCart(passedInUserId) {
  const newCartId = await cartDAO.createCart(passedInUserId); 
  if(newCartId == null) {
    return null;
  }
  return newCartId;
};

module.exports = {
  addProductToCart,
  deleteCart,
  removeContributorFromCart,
  removeProductFromCart,
  addContributorToCart,
  checkoutCart,
};
