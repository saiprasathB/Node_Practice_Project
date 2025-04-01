const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
<<<<<<< HEAD
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false}
=======
  isVerified: { type: Boolean, default: false },
>>>>>>> 2716b2b3f7cfe92cd98669dd31dd03f753425241
});

const User = mongoose.model("User-node_practice", userSchema);

module.exports = User;
