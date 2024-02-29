const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const cartManager = require("../Managers/cart_manager.js");

// PRODUCT UPDATE:
// ADD TO CART: THIS SHOULD ADD TO CART AND RETURN THE NEW CART
router.post("/addProduct/:cartId/:productId", async (req, res) => {
  const cart = await cartManager.addProductToCart(req);
  if (cart == null) {
    res.status(400).json({ errorMsg: "Failed to add product to cart." });
  } else {
    res.status(200).json(cart);
  }
});

// REMOVE FROM CART: THIS SHOULD REMOVE PRODUCT RELATED TO CART AND RETURN THE NEW CART
router.delete("/removeProduct/:cartId/:productId", async (req, res) => {
  const cart = await cartManager.removeProductFromCart(req);
  if (cart == null) {
    res.status(400).json({ errorMsg: "Failed to remove product from cart." });
  } else {
    res.status(200).json(cart);
  }
});

// USER UPDATE:

// REMOVE CONTRIBUTOR: SHOULD RETURN NEW CART WITH NEW CONTRIBUTORS
router.post("/removeUser/:cartId/:userId", async (req, res) => {
  const cart = await cartManager.removeContributorFromCart(req);
  if (cart == null) {
    res
      .status(400)
      .json({ errorMsg: "Failed to remove user from contributors." });
  } else {
    res.status(200).json(cart);
  }
});

// ADD CONTRIBUTOR: SHOULD RETURN NEW CART WITH NEW CONTRIBUTORS
router.post("/addUser/:cartId/:userId", async (req, res) => {
  const cart = await cartManager.addContributorToCart(req);
  if (cart == null) {
    res.status(400).json({ errorMsg: "Failed to add user to contributors." });
  } else {
    res.status(200).json(cart);
  }
});

// CART UPDATE:

// GET ALL CARTS
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts(req);
  if (carts == null) {
    res.status(400).json({ errorMsg: "Failed to retrieve carts." });
  } else {
    res.status(200).json(carts);
  }
});

// CHECKOUT CART: SHOULD RETURN ALL PRODUCTS BASED ON USERID'S CART
router.get("/checkout/:userId", async (req, res) => {
  const cart = await cartManager.checkoutCart(req);
  if (cart == null) {
    res.status(400).json({ errorMsg: "Failed to checkout cart for the user." });
  } else {
    res.status(200).json(cart);
  }
});

// REMOVE CART: SHOULD RETURN NULL
router.delete("/removeCart/:cartId", async (req, res) => {
  const cart = await cartManager.deleteCart(req);
  if (cart == null) {
    res.status(400).json({ errorMsg: " Failed to remove cart." });
  } else {
    res.status(200).json(cart);
  }
});

module.exports = router;
