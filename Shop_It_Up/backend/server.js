const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const UserManager = require("./Managers/UserManager.js");
const userRoutes = require("./routes/userRoutes.js");
const passport = require("passport");
const cartRoutes = require("./routes/cart_route.js");

const PORT = 3010;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID =
  "1005337001636-7bpm9ohobj26vvvm3bg57tlftqf7nmln.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

require("dotenv").config();
const uri = `mongodb+srv://Joshua_Beed:${process.env.DB_PASSWORD}@cs180shopitupcluster.l7nsxfh.mongodb.net/?retryWrites=true&w=majority`;

//cors to allow server access on localhost
const cors = require("cors");
app.use(cors());
//middleware for routes
app.use(bodyParser.json()); // Get req.body

// adding cookieParser middleware
app.use(cookieParser()); //makes parsing cookies easier

//Routes
app.use("/api/authorize", authRoutes);
app.use("/api/products", productRoutes); // Break up routes for seperate files.
app.use("/api/user", userRoutes); // Break up routes for seperate files.
app.use("/api/cart", cartRoutes);

//middleware for passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: true })); // TODO
app.use(passport.initialize());
app.use(passport.session());

//middleware for passport
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`, // TODO
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/protected", async (req, res) => {
  const userId = await UserManager.createUser(req.user.id);
  res.cookie("auth", req.user.id, { httpOnly: false });
  if (userId !== null) {
    res.json({ redirect: true, message: "login succesfull" });
  } else {
    res.json({ redirect: true, message: "new user created." });
  }
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error("Error occured when logging out...");
    res.clearCookie("connect.sid");
    res.clearCookie("auth");
    req.session.destroy();
    res.send("Goodbye!");
  });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.listen(PORT, () => {
  connectToDB()
    .then(() => console.log("connected to Database..."))
    .catch((e) => console.log("error occured:", e));
});

async function connectToDB() {
  // Connect the client to the server	(optional starting in v4.7)
  mongoose
    .connect(uri, {
      dbName: "Shop_it_up_database",
    })
    .catch((err) => console.error(err));
}

async function authorize(userId) {
  const authenticated = user.find(userId); // Hmm
  if (authenticated === null) {
    console.error("user not authenticated");
  } else {
    return userId;
  }
}

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// run().catch(console.dir);
