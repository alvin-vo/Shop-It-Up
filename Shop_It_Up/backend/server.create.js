const express = require("express");
const session = require("express-session");

// ROUTES
const authRoutes = require("./Routes/auth_routes.js");
const productRoutes = require("./Routes/product_routes.js");
const userRoutes = require("./Routes/user_routes.js");
const cartRoutes = require("./Routes/cart_routes.js");

// PARSERS
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//AUTHORIZATION
const passport = require("passport");

const cors = require("cors");

const createServer = () => {
  // APP INITIALIZER
  const app = express();

  //cors to allow server access on localhost
  app.use(cors());

  //middleware for routes
  app.use(bodyParser.json()); // Get req.body

  // adding cookieParser middleware
  app.use(cookieParser()); //makes parsing cookies easier

  //Routes
  app.use("/api/authorize", authRoutes);
  app.use("/api/products", productRoutes); // Break up routes for seperate files.
  app.use("/api/users", userRoutes); // Break up routes for seperate files.
  app.use("/api/carts", cartRoutes);

  //middleware for passport
  app.use(session({ secret: "cats", resave: false, saveUninitialized: true })); // TODO
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};

module.exports = { createServer };
