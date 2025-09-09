// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  contact: String,
});

module.exports = mongoose.model("user", userSchema);