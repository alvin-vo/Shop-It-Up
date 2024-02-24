/*THis is a middleware function.
 It is only used to authorize a user if it exists.
 This is used to protect the routes*/

const User = require("../Models/user_model.js");
const UserDAO = require("../AccessObjects/user_dao.js");

const authorize = async (req, res, next) => {
  try {
    const id = req.cookies.auth;

    const doesUserExists = await UserDAO.checkUserExistence(id);
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
