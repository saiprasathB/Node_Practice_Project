const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User-node_practice", userSchema);

module.exports = User;
