const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "VITYALOH";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extends: false }));

async function start() {
  // server logic
}

start();

app.listen(PORT, () => {
  console.log(`Дарова, йопт... на порту ${PORT}`);
});
