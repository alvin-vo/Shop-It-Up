/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const Product = require("../models/productsModel.js");

const getAllProducts = async () => {
  let products = await Product.find({});
  return products;
};

const updateProduct = async () => {};

const createProduct = async () => {};

const deleteProduct = async () => {};

module.exports = {
  getAllProducts,
};
