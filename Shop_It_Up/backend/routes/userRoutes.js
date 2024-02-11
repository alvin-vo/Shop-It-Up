const express = require("express");
/*
    All the routes need to handle is what to do with the request and response and what managers to call. 
    They will only communicate with the the req and res object, and managers interfaces.
*/

const router = express.Router();

//Create user account
router.post("/create", async (req, res) => {});

///Update user account
router.patch("/update", async (req, res) => {});

//Delete user account
router.delete("/delete", async (req, res) => {});

//Get user Info
router.get("/getInfo", async (req, res) => {});

//Add product to sell
router.post("/addProduct", async (req, res) => {});

//Remove product to sell
router.delete("/removeProduct", async (req, res) => {});

//Send Invite
router.post("/invite", async (req, res) => {});

//Accept Invite
router.post("/invite/accept", async (req, res) => {});

//Receive Invite
router.get("/invite", async (req, res) => {});

module.exports = router;
