/*THis is a middleware function.
 It is only used to authorize a user if it exists.
 This is used to protect the routes*/

const User = require("../models/UserModel.js");
const UserDAO = require("../AccessObjects/UserDAO.js");
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const id = req.cookies.auth;

    let data = await jwt.verify(id, process.env.HASH);

    console.log(data);

    const doesUserExists = await UserDAO.checkUserExistence(data.id);
    console.log(doesUserExists);

    if (doesUserExists) {
      next();
    } else {
      res
        .status(404)
        .json({ authenticated: false, message: "User is not authenticated." });
    }
  } catch (e) {
    res
      .status(404)
      .json({ authenticated: false, message: "User is not authenticated." });
  }
};

module.exports = {
  authorize,
};
