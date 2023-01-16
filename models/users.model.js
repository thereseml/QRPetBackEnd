const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const usersSchema = mongoose.Schema({
  firstname: reqString,
  lastname: reqString,
  useremail: { type: String, required: true, unique: true },
  password: reqString,
  phone: { type: Number, required: true },
  address: reqString,
  city: reqString,
  zip: { type: Number, required: true },
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
