/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const cartModel = require("../models/cart_model,js");

const addProduct = async (productId) => {};

const removeProduct = async (productId) => {};

const addContributor = async (cartId) => {};

const removeContributor = async (userId) => {};

const checkout = async (cartId, userId) => {};

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
};
