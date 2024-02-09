/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const ProductDAO = require("../AccessObjects/ProductDAO.js");

const getProducts = async () => {
  return ProductDAO.getAllProducts();
};

const getOneProduct = async (req) => {
  return ProductDAO.getOnlyProduct(req.params.productId);

};

const createProduct = async (req) => {
  return ProductDAO.createdProduct(req.body);
};

const deleteProduct = async (req) => {
  deletedProduct(req.params.id);
};

// Might need to change later based on req setup.
const updateProduct = async (req) => {
  updatedProduct(req.params.id, req.body);
};

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
