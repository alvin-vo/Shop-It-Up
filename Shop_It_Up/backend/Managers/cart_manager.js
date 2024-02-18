const cartDAO = require("../models/cart_model,js");

const addProductToCart = async (productId) => {};

const removeProductFromCart = async (productId) => {};

const addContributorToCart = async (cartId) => {};

const removeContributorFromCart = async (userId) => {};

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
