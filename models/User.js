const Mongoose = require("mongoose");

// User Schema
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model("User", UserSchema);
