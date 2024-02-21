/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/


const product = require("../Models/product_model.js");


// Return null if error.
const getAllProducts = async () => {
  try {
    const products = await product.find({});

    return products;
  } catch (err) {
    return null;
  }
};

const getOnlyProduct = async (passedInId) => {
  try {
    const products = await product.findOne({ productId: passedInId });

    return products;
  } catch (err) {
    return null; // Return null if error.
  }
};

const createdProduct = async (passedInBody) => {
  try {

    const products = new product(passedInBody);
    await products.save();
    // Return created product.
    return products;

  } catch (err) {
    return null; // Return null if error.
  }
};

const deletedProduct = async (passedInId) => {
  try {
    const products = await product.findOneAndDelete({ productId: passedInId });
    // Return empty, product deleted ?
    return products;

  } catch (err) {
    return null; // Return null if error.
  }
};

// Might need to change later based on req setup.
const updatedProduct = async (passedInId, passedInBody) => {
  try {
    const products = await product.findOneAndUpdate(

      { productId: passedInId },
      passedInBody
    );
    // Return updated product.

    return products;

  } catch (err) {
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
