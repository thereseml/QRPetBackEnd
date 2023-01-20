const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = mongoose.Schema({
  useremail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
