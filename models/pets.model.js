const mongoose = require("mongoose");

const petsSchema = mongoose.Schema({
  useremail: { type: String },
  name: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  chipNr: { type: Number, required: true, unique: true },
  details: { type: String, required: true },
});

const Pets = mongoose.model("Pets", petsSchema);
module.exports = Pets;
