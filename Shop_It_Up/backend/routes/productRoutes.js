const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const productManager = require("../Managers/ProductManager.js");
const {
  createProduct,
  deleteProduct,
} = require("../AccessObjects/ProductDAO.js");
const { authorize } = require("../Managers/AuthorizeManager.js");

// Get all products.
// RETURNS ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  if (products == null) {
    res.send("Error: null.");
  } else {
    res.send(products);
  }
});

// Find by product ID.
// RETURNS FOUND PRODUCT
router.get("/:productId", async (req, res) => {
  const product = await productManager.getOneProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

// Create new product.
// RETURNS CREATED PRODUCT
router.post("/create", async (req, res) => {
  const product = await productManager.createProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

// Delete product.
// RETURNS DELETED PRODUCT
router.delete("/delete/:productId", async (req, res) => {
  const product = await productManager.deleteProduct(req); // not working?
  if (product == null) { // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

// Update product.
// RETURNS NEW PRODUCT
router.patch("/update/:productId", async (req, res) => {
  const product = await productManager.updateProduct(req);
  if (product == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

module.exports = router;
