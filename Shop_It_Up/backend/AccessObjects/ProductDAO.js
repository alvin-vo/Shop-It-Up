/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const Product = require("../models/productsModel.js");

// Return null if error.
const getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products; 
  } catch(err) {
    return null;
  }
};

const getOnlyProduct = async (passedInId) => {
  try {
    const product = await Product.findOne({productId: passedInId}); // Not working as intended, but sufficient.
    return product; 
  } catch(err) {
    return null; // Return null if error.
  }
};

const createdProduct = async (passedInBody) => {
  try {
    const product = new Product(passedInBody);
    await product.save();
    // Return created product.
    return product;
  } catch(err) {
    return null; // Return null if error.
  }

};

const deletedProduct = async (passedInId) => {
  try {
    const product = await Product.findById(passedInId);
    await product.remove();
    // Return empty, product deleted ?
    return product;
  } catch(err) {
    return null; // Return null if error.
  }

};

// Might need to change later based on req setup.
const updatedProduct = async (passedInId, passedInBody) => {
  try {
    const product = await Product.findById(passedInId);
    Object.assign(product, passedInBody)
    // Return updated product.
    return product;
  } catch(err) {
    return null; // Return null if error.
  }

};

module.exports = {
  getAllProducts,
  getOnlyProduct,
  createdProduct,
  deletedProduct,
  updatedProduct,
};
