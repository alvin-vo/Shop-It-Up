const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

require("dotenv").config();
const uri = `mongodb+srv://Joshua_Beed:${process.env.DB_PASSWORD}@cs180shopitupcluster.l7nsxfh.mongodb.net/?retryWrites=true&w=majority`;

//middleware for routes
app.use(bodyParser.json()); // Get req.body

app.use("/api/products", productRoutes); // Break up routes for seperate files.
app.use("/api/user", userRoutes); // Break up routes for seperate files.

app.listen(3010, () => {
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
// run().catch(console.dir);
