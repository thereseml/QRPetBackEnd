const mongoose = require("mongoose");

const PetsSchema = mongoose.Schema({
  name: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String },
  color: { type: String },
  details: { type: String },
  ownerId: { type: String, required: true },
});

const Pets = mongoose.model("Pets", PetsSchema);
module.exports = Pets;
