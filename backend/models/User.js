const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], required: true }, // Role-based access
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = mongoose.model("User", userSchema);
