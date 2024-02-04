const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Shop it Up main page");
});

app.listen(3010, () => console.log("connected on localhost:3010"));
