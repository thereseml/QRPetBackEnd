const mongoose = require("mongoose");

const PetsSchema = mongoose.Schema({
  name: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String },
  chipNr: { type: Number, required: true, unique: true },
  details: { type: String, required: true },
  ownerId: { type: String, required: true },
});

const Pets = mongoose.model("Pets", PetsSchema);
module.exports = Pets;
