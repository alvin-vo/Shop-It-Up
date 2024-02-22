const cartDAO = require("../AccessObjects/cart_dao.js");
const userDAO = require("../AccessObjects/user_dao.js");

const addProductToCart = async (productId) => {};

const removeProductFromCart = async (productId) => {};

const addContributorToCart = async (cartId, userId) => {
  const contributorCartId = cartId;
  const contributorUserId = userId;

  console.log("cart manager: ", userId, " ", cartId);

  let confirmation = await cartDAO.addContributor(
    contributorCartId,
    contributorUserId
  );

  if (confirmation) {
    let updatedUserId = await userDAO.updateUser(userId, { cartId: cartId });
    return updatedUserId;
  } else {
    return null;
  }
};

const removeContributorFromCart = async (userId) => {};

const checkoutCart = async (cartId, userId) => {};

const deleteCart = async (cartId) => {};

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
};
