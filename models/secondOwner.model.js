const mongoose = require("mongoose");

const string = {
  type: String,
};
const number = {
  type: Number,
};

const secondOwnerSchema = mongoose.Schema({
  firstname: string,
  lastname: string,
  phone: number,
  address: string,
  city: string,
  zip: number,
  ownerId: string,
});

const secondOwner = mongoose.model("SecondOwner", secondOwnerSchema);
module.exports = secondOwner;
