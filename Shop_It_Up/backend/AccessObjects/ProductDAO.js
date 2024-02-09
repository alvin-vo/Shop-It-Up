/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const Product = require("../models/productsModel.js");

const getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products; 
  } catch(err) {
    res.status(404).send({error: "Could not find products."});
  }
};

// How to only pass in product ID? req.params.id
const getOnlyProduct = async (passedInId) => {
  try {
    const product = await Product.findById(passedInId);
    return product; 
  } catch(err) {
    res.status(404).send({error: "Could not find product."}); // won't work return null
  }
};

const createdProduct = async (passedInBody) => {
  try {
    const product = new Product(passedInBody);
    await product.save();
    // return created product
    return product;
  } catch(err) {
    res.status(404).send({error: "Could not find product."});
  }

};

const deletedProduct = async (passedInId) => {
  try {
    const product = await Product.findById(passedInId);
    await product.remove();
    // return empty, product deleted ?
    return product;
  } catch(err) {
    res.status(404).send({error: "Could not find product."});
  }

};

// Might need to change later based on req setup.
const updatedProduct = async (passedInId, passedInBody) => {
  try {
    const product = await Product.findById(passedInId);
    Object.assign(product, passedInBody)
    // return updated product
    return product;
  } catch(err) {
    res.status(404).send({error: "Could not find product."});
  }

};

module.exports = {
  getAllProducts,
  getOnlyProduct,
  createdProduct,
  deletedProduct,
  updatedProduct,
};
