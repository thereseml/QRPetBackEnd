const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const reqNumberUniq = {
  type: Number,
  required: true,
  unique: true,
};

const PetsSchema = mongoose.Schema({
  name: reqString,
  petType: reqString,
  breed: reqString,
  color: reqString,
  image: String,
  chipNr: reqNumberUniq,
  details: reqString,
  ownerId: reqString,
});

const Pets = mongoose.model("Pets", PetsSchema);
module.exports = Pets;
