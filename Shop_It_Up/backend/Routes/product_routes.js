const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

router = express.Router();
const productManager = require("../Managers/product_manager.js");
const { authorize } = require("../Managers/authorize_manager.js");

const getProductsHandler = async (req, res) => {
  const products = await productManager.getProducts();
  if (products == null) {
    res.send("Error: null.");
  } else {
    res.status(200).send(products);
  }
};

const deleteProductHandler = async (req, res) => {
  const product = await productManager.deleteProduct(req); // not working?
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
};

const createProductHandler = async (req, res) => {
  const sellerId = req.userId;
  req.body.sellerId = sellerId;
  const product = await productManager.createProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
};

const findOneProductHandler = async (req, res) => {
  const product = await productManager.getOneProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
};

const updateProductHandler = async (req, res) => {
  const product = await productManager.updateProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
};

// Get all products.
// RETURNS ALL PRODUCTS
router.get("/", async (req, res) => {
  await getProductsHandler(req, res);
});

// Find by product ID.
// RETURNS FOUND PRODUCT
router.get("/:productId", async (req, res) => {
  await findOneProductHandler(req, res);
});

// Create new product.
// RETURNS CREATED PRODUCT
router.post("/create", authorize, async (req, res) => {
  await createProductHandler(req, res);
});

// Delete product.
// RETURNS DELETED PRODUCT
router.delete("/delete/:productId", async (req, res) => {
  await deleteProductHandler(req, res);
});

// Update product.
// RETURNS NEW PRODUCT
router.patch("/update/:productId", async (req, res) => {
  await updateProductHandler(req, res);
});

module.exports = {
  router,
  getProductsHandler,
  createProductHandler,
  findOneProductHandler,
  deleteProductHandler,
  updateProductHandler,
};
