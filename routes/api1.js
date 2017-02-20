const express = require("express");
const api = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const guid = require("guid");

const DATA_FILE = path.join(__dirname, './../Data/data.json');

api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

api.get("/", (req, res) => {
  res.send("Sample response for version one of this demo api");
});

api.get("/api", (req, res) => {
  res.send("Sample response for version one of this demo api");
});

api.get("/demos", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    console.log(data);
    res.json(JSON.parse(data));
  });
});


api.post('/demos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const demos = JSON.parse(data);
    const newDemo = {
      title: req.body.name,
      body: req.body.body,
      id: guid.create()
    };
    demos.push(newDemo);
    fs.writeFile(DATA_FILE, JSON.stringify(demos, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(demos);
    });
  });
});

module.exports = api;