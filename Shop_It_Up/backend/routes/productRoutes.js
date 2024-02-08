const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/
const router = express.Router();
const productManager = require("../Managers/ProductManager");

//gets all products
router.get("/", async (req, res) => {
  res.send("get all products");
});

//create new products
router.post("/create", async (req, res) => {
  res.send("create new product");
});

//delete product
router.delete("/delete", async (req, res) => {
  res.send("deleted product");
});

//update product
router.patch("/update", async (req, res) => {
  res.send("update product");
});

module.exports = router;
