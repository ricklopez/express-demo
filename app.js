const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

const app = express();
const apiV1 = require("./routes/api1.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/v1", apiV1);


app.get("/", function(req, res) {
  res.send("you just sent a GET request, friend");
});

app.post("/", function(req, res) {
  res.send("a POST request? nice");
});

app.put("/", function(req, res) {
  res.send("i don't see a lot of PUT requests anymore");
});

app.delete("/", function(req, res) {
  res.send("oh my, a DELETE??");
});

app.listen(3000, function() {
  console.log("App is listening on port 3000");
});