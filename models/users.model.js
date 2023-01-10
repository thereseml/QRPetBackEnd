const mongoose = require("mongoose");
const Pets = require("./pets.model");

const usersSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  pets: [Pets.schema],
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
