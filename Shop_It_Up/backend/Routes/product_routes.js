const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const productManager = require("../Managers/product_manager.js");
const { authorize } = require("../Managers/authorize_manager.js");

// Get all products.
// RETURNS ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  if (products == null) {
    res.status(400).json({ errorMsg: " Failed to retrieve products." });
  } else {
    res.status(200).json(products);
  }
});

// Find by product ID.
// RETURNS FOUND PRODUCT
router.get("/:productId", async (req, res) => {
  const product = await productManager.getOneProduct(req);
  if (product == null) {
    res.status(404).json({ errorMsg: " Product not found." });
  } else {
    res.status(200).json(product);
  }
});

// Create new product.
// RETURNS CREATED PRODUCT
router.post("/create", async (req, res) => {
  const product = await productManager.createProduct(req);
  if (product == null) {
    res.status(400).json({ errorMsg: " Failed to create product." });
  } else {
    res.status(201).json(product);
  }
});

// Delete product.
// RETURNS DELETED PRODUCT
router.delete("/delete/:productId", async (req, res) => {
  const deletedProduct = await productManager.deleteProduct(req);
  if (deletedProduct == null) {
    res.status(404).json({ errorMsg: " Product not found." });
  } else {
    res.status(200).json(deletedProduct);
  }
});

// Update product.
// RETURNS NEW PRODUCT
router.patch("/update/:productId", async (req, res) => {
  const updatedProduct = await productManager.updateProduct(req);
  if (updatedProduct == null) {
    res.status(404).json({ errorMsg: " Product not found." });
  } else {
    res.status(200).json(updatedProduct);
  }
});

module.exports = router;
