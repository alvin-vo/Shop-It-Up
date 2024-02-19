const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const cartManager = require("../Managers/cart_manager.js");

//create new cart
router.post("/create", async (req, res) => {
  const userId = req.body.userId;

  console.log("UserId: ", userId);
  let cartId = await cartManager.createCart(userId);

  if (cartId) {
    res.status(201).json({ cartId: cartId });
  } else {
    res.status(409).json({ msg: "cart could not be created." });
  }
});

router.get("/:cartId", async (req, res) => {
  let cartId = req.params.cartId;
  console.log("cartId");

  let cart = await cartManager.findCart(cartId);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ msg: "cart could not be found" });
  }
});

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
