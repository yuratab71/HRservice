const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, require: true },
  position: { type: String, require: true },
  phoneNumber: { type: String },
  instagram: { type: String },
  linkedIn: { type: String },
});

module.exports = model("Admin", schema);
