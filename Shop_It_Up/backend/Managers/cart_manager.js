const cartDAO = require("../AccessObjects/cart_dao.js");

const addProductToCart = async (productId) => {};

const removeProductFromCart = async (productId) => {};

const addContributorToCart = async (cartId, userId) => {
  const contributorCartId = cartId;
  const contributorUserId = userId;

  let confirmation = await cartDAO.addContributor(
    contributorCartId,
    contributorUserId
  );

  if (confirmation) {
    return confirmation;
  } else {
    return null;
  }
};

const removeContributorFromCart = async (userId) => {};

const checkoutCart = async (cartId, userId) => {};

const deleteCart = async (cartId) => {};

const findCart = async (cartId) => {
  try {
    let cart = await cartDAO.findCart(cartId);
    return cart;
  } catch (e) {
    console.error("Error when fiding cart: ", e);
  }
};

const createCart = async (userId) => {
  let cart = await cartDAO.createCart(userId);
  console.log("Cart manager cart: ", cart);
  if (cart) {
    return cart.cartId;
  } else {
    return null;
  }
};

module.exports = {
  addProductToCart,
  deleteCart,
  removeContributorFromCart,
  removeProductFromCart,
  addContributorToCart,
  checkoutCart,
  createCart,
  findCart,
};
