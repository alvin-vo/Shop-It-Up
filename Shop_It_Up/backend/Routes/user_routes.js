const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();
const userManager = require("../Managers/user_manager.js");

//Create user account
router.post("/create", async (req, res) => {
  res.send("create new user");
});

///Update user account
router.patch("/update", async (req, res) => {
  res.send("update user account");
});

//Delete user account
router.delete("/delete", async (req, res) => {
  res.send("deleting user.");
});

//Get user Info
router.get("/getInfo", async (req, res) => {
  res.send("getting use Informaton.");
});

//Add product to sell
router.post("/addProduct", async (req, res) => {
  res.send("add product.");
});

//Remove product to sell
router.delete("/removeProduct", async (req, res) => {
  res.send("remove product");
});

//Send Invite
router.post("/invite", async (req, res) => {
  res.send("sent invite.");
});

//Accept Invite
router.post("/invite/accept", async (req, res) => {
  res.send("accept invite");
});

//Receive Invite
router.get("/invite", async (req, res) => {
  res.send("recieved invite");
});

module.exports = router;
