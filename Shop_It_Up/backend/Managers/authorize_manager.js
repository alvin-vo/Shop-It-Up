/*THis is a middleware function.
 It is only used to authorize a user if it exists.
 This is used to protect the routes*/

const userDAO = require("../AccessObjects/user_dao.js");

const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const id = req.cookies.auth;

    console.log(id);

    let data = await jwt.verify(id, process.env.HASH);

    console.log("data: ", data);

    const doesUserExists = await userDAO.checkUserExistence(data.id);

    console.log("user exsistence", doesUserExists);
    if (doesUserExists) {
      //decrypted user Id returned (This is used to get the google Id we encrypted).
      req.userId = data.id;
      req.userEmail = data.email;
      next();
    } else {
      // res
      //   .status(404)
      //   .json({ authenticated: false, message: "User is not authenticated." });
      const otherServerUrl = "http://localhost:3000/login";
      res.redirect(otherServerUrl);
    }
  } catch (e) {
    // res
    //   .status(404)
    //   .json({ authenticated: false, message: "User is not authenticated." });
      const otherServerUrl = "http://localhost:3000/login";
      res.redirect(otherServerUrl);
  }
};

module.exports = {
  authorize,
};
