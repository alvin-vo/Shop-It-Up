const cartDAO = require("../models/cart_dao.js");

// PRODUCT UPDATE:

// 0: CHECK IF CART IS EMPTY
// 1: IF CART IS EMPTY -> 2, ELSE -> 3
// 2: CREATE CART 
// 3: ADD PRODUCT TO CART
// 4: RETURN NEW CART
const addProductToCart = async (cartId) => {
  
};

const removeProductFromCart = async (productId) => {};


// USER UPDATE:

const addContributorToCart = async (cartId) => {};

const removeContributorFromCart = async (userId) => {};

// CART UPDATE

const checkoutCart = async (cartId, userId) => {};

const deleteCart = async (cartId) => {};

module.exports = {
  addProductToCart,
  deleteCart,
  removeContributorFromCart,
  removeProductFromCart,
  addContributorToCart,
  checkoutCart,
};
