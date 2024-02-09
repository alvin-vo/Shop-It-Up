const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/
const router = express.Router();
const productManager = require("../Managers/ProductManager.js");
const { createProduct, deleteProduct } = require("../AccessObjects/ProductDAO.js");

// Get all products.
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  if (products == null) {
    res.send("Error: null.");
  } else {
    res.send(products);
  }

});

// Find by product ID.
router.get("/:productId", async (req, res) => {
  const product = await productManager.getOneProduct(req);
  if (product == null) { // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

// Create new product.
router.post("/create", async (req, res) => {
  const product = await productManager.createProduct(req);
  if (product == null) { // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(product);
  }
});

// Delete product.
router.delete("/delete", async (req, res) => {
  res.send("Deleted product.");
});

// Update product.
router.patch("/update", async (req, res) => {
  res.send("Updated product.");
});

module.exports = router;
