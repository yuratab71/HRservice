const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("./constants");
const { emailValidator, passwordValidator } = require("./utils/index");
const User = require("./models/user");

const jwtSecret = "VITYALOH";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extends: false }));

async function start() {
  // server logic
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.peiyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    // ------------------- REGISTER ----------------------------------- //
    app.post("/api/v1/register", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!emailValidator(email)) {
          return res.status(400).json({
            message: "Invalid email",
          });
        }

        if (!passwordValidator(password)) {
          return res.status(400).json({
            message: "Invalid password",
          });
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
          return res.status(409).json({ message: "User already exist" });
        }

        const cryptedPass = await bcrypt.hash(password, 10);

        const user = new User({ email: email, password: cryptedPass });

        await user.save();

        res.status(200).json({
          message: "User created successfuly",
        });
      } catch (e) {
        res.status(500).json(constants.serverError);
      }
    });

    // ----------------- LOGIN ----------------------------------- //
    app.post("/api/v1/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!passwordValidator(password) || !emailValidator(email)) {
          return res.status(400).json({
            message: "Invalid email of parameters",
          });
        }

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({ message: "User didnt found" });
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
          return res.status(403).json({
            message: "Incorrect password",
          });
        }

        const token = jwt.sign(
          {
            userId: user.id,
            userEmail: user.email,
          },
          jwtSecret,
          {
            expiresIn: "24h",
          }
        );

        res.json({ token, userId: user.id });
      } catch (e) {
        console.log(e.message);
        res.status(500).json(constants.serverError);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

start();

app.listen(PORT, () => {
  console.log(`Дарова, йопт... на порту ${PORT}`);
});
