const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const cartManager = require("../Managers/cart_manager.js");

//adding product to cart
router.post("/addProduct", async (req, res) => {});

//removing cart
router.delete("/:cartid", async (req, res) => {});

//removing contributor from cart
router.delete("/:userId", async (req, res) => {});

//adding contributor to cart
router.post("/addContributor", async (req, res) => {});

//getting all products based on cart info
router.get("/checkout/:cartId", async (req, res) => {
  res.send("get all cart products");
});

module.exports = router;
