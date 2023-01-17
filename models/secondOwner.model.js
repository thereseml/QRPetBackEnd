const mongoose = require("mongoose");

const secondOwnerSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  ownerId: { type: String, required: true },
});

const secondOwner = mongoose.model("SecondOwner", secondOwnerSchema);
module.exports = secondOwner;
