const mongoose = require("mongoose");

const LoginUserSchema = mongoose.Schema({
  useremail: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const LoginUser = mongoose.model("LoginUser", LoginUserSchema);
module.exports = LoginUser;
