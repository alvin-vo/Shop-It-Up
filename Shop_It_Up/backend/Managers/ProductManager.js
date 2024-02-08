/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const ProductDAO = require("../AccessObjects/ProductDAO");

const getProducts = async () => {};

const createProduct = async () => {};

const deleteProduct = async () => {};

const updateProduct = async () => {};

module.exports = {
  getProducts,
};
