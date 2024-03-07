/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/


// SCHEMA
const Joi = require('joi');
// MIRROR CHANGES HERE! (FROM "../Models/products_model.js")
const schemaChecker = Joi.object({
  productId: Joi.string().required(),
  sellerId: Joi.string().required(),
  title: Joi.string().required(),
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  img: Joi.string().required(),
});

const productDAO = require("../AccessObjects/product_dao.js");

const getProducts = async () => {
  return await productDAO.getAllProducts();
};

const getOneProduct = async (req) => {
  return await productDAO.getOnlyProduct(req.params.productId);

};

const createProduct = async (req) => {
  const checkOne = await checkId(req.body.productId); // Check product id for any matches, FALSE if match
  const checkTwo = await checkBody(req.body); // Check body to ensure correct values, FALSE if not
  if(checkOne && checkTwo) { // THIS NEEDS TO BE TRUE TRUE
    return await productDAO.createdProduct(req.body);
  } else {
    return null;
  }
};

const deleteProduct = async (req) => {
  return await productDAO.deletedProduct(req.params.productId);
};

const updateProduct = async (req) => {
  const checkOne = await checkId(req.params.productId); // Check product id for any matches, FALSE if match
  const checkTwo = await checkBody(req.body); // Check body to ensure correct values, FALSE if not
  if(!checkOne && checkTwo) { // THIS NEEDS TO BE !(FALSE) TRUE
    await productDAO.updatedProduct(req.params.productId, req.body); // UPDATE
    return await productDAO.getOnlyProduct(req.body.productId); // RETURN UPDATED OBJECT
  } else {
    return null;
  }
};

// Function to check that req.body matches our schema!
// RETURNS true IF req.body IS VALID, false OTHERWISE.
async function checkBody(bodyToCheck) {
  const bodyResult = schemaChecker.validate(bodyToCheck);
  if(bodyResult.error) {
    return false;
  }
  return true;
};

// Function to check that req.body.productId is not duplicated!
// RETURNS true IF THERE IS NOT AN EXISTING PRODUCT, false OTHERWISE.
async function checkId(productIdToCheck) {
  const idResult = await productDAO.getOnlyProduct(productIdToCheck); 
  if(idResult == null) {
    return true;
  }
  return false;
};


module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  checkBody,
};
