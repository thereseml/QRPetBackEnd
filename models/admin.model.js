const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminemail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
