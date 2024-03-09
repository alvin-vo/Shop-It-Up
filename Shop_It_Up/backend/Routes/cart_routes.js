const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const cartManager = require("../Managers/cart_manager.js");
const { authorize } = require("../Managers/authorize_manager");

// PRODUCT UPDATE:

// ADD TO CART: THIS SHOULD ADD TO CART AND RETURN THE NEW CART
router.post("/addProduct/:productId", async (req, res) => {
  const userId = req.userId;
  if (userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const cart = await cartManager.addProductToCart(req, userId);
    if (cart == null) {
      res.send("Error: null."); // ERROR
    } else {
      res.send(cart);
    }
  }
});

// ADD TO CART: THIS SHOULD REMOVE PRODUCT RELATED TO CART AND RETURN THE NEW CART
router.post("/removeProduct/:productId", authorize, async (req, res) => {
  const userId = req.userId;
  if (userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const cart = await cartManager.removeProductFromCart(req, userId);
    if (cart == null) {
      // null or empty ?
      res.send("Error: null.");
    } else if (cart == false) {
      // empty cart, delete cart
      res.send("Cart Empty: Deleted.");
    } else {
      res.send("Product Removed.");
    }
  }
});

// USER UPDATE:

// REMOVE CONTRIBUTOR: SHOULD RETURN NEW CART WITH NEW CONTRIBUTORS
router.post("/removeUser/:cartid/:userId", async (req, res) => {
  const cart = await cartManager.removeContributorFromCart(req);
  if (cart == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(cart);
  }
});

// ADD CONTRIBUTOR: SHOULD RETURN NEW CART WITH NEW CONTRIBUTORS
router.post("/addUser/:cartid/:userId", async (req, res) => {
  const cart = await cartManager.addContributorToCart(req);
  if (cart == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(cart);
  }
});

// CART UPDATE:

router.get("/", async (req, res) => {
  const userId = req.userId;
  const carts = await cartManager.getCarts(userId);
  if (carts == null) {
    res.send("Error: null.");
  } else {
    res.send(carts);
  }
});

//GET CART: SHOULD RETURN USER SPECIFIC CART
router.get("/cart", async (req, res) => {
  const userId = req.userId;
  if (userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const cart = await cartManager.getUserCart(userId);
    if (cart == null) {
      // null or empty ?
      res.send("Error: null.");
    } else {
      res.json(cart);
    }
  }
});

// CHECKOUT CART: SHOULD RETURN ALL PRODUCTS BASED ON USERID'S CART
router.post("/checkout", authorize, async (req, res) => {
  const userId = req.userId;
  if (userId == undefined) {
    res.send("Error: invalid user.");
  } else {
    const cart = await cartManager.checkoutCart(userId);
    if (cart == null) {
      // null or empty ?
      res.send("Error: null.");
    } else {
      res.send(cart);
    }
  }
});

// REMOVE CART: SHOULD RETURN NULL
router.delete("/removeCart/:cartId", async (req, res) => {
  const cart = await cartManager.deleteCart(req);
  if (cart == null) {
    // null or empty ?
    res.send("Error: null.");
  } else {
    res.send(cart);
  }
});

module.exports = router;
