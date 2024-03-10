/*THis is a middleware function.
 It is only used to authorize a user if it exists.
 This is used to protect the routes*/

const userDAO = require("../AccessObjects/user_dao.js");

const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  console.log("calling authorize middleware");
  try {
    const id = req.cookies.auth;

    //console.log(id);

    let data = await jwt.verify(id, process.env.HASH);

    console.log("data: ", data);

    const doesUserExists = await userDAO.checkUserExistence(data.id);

    console.log("user exsistence", doesUserExists);

    if (doesUserExists) {
      //decrypted user Id returned (This is used to get the google Id we encrypted).
      req.userId = data.id;
      req.userEmail = data.email;
      console.log("User id auth: ", req.userId);
      next();
    } else {
      // res
      //   .status(404)
      //   .json({ authenticated: false, message: "User is not authenticated." });
      /* CHANGE REDIRECT TO LOGIN PAGE URL */
      res.redirect("/api/authorize/auth/google");
    }
  } catch (e) {
    // res
    //   .status(404)
    //   .json({ authenticated: false, message: "User is not authenticated." });
    /* CHANGE REDIRECT TO LOGIN PAGE URL */
    res.redirect("/api/authorize/auth/google");
  }
};

module.exports = {
  authorize,
};
