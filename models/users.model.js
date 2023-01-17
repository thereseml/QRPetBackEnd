const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  useremail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
