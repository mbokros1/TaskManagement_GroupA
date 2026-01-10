const express = require("express");
const pool = require("./db");
const app = express();
const port = 5000;

app.get("/api/", (req, res) => {
  res.send({ test: "Hello World" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
