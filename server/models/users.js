const { Schema, model } = require("mongoose");

const schema = new Schema({
  phoneNumber: { type: String },
  connectionDate: { type: String }, // Date.toTimeString
  firstName: { type: String },
  secondName: { type: String },
  fatherName: { type: String },
  age: { type: Number },
  isInUkraine: { type: Boolean },
  visaType: { type: String },
  isWantToOpenVisa: { type: Boolean },
  isDocumentForming: { type: Boolean },
  whenYouPlanTrip: { type: Boolean },
  typeOfVacation: { type: Boolean },
  isSertificated: { type: Boolean },
  sertificateType: { type: Boolean },
  paidPreferences: { type: Boolean },
});

module.exports = model("User", schema);
