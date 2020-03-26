const Mongoose = require("mongoose");

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
  },
  cart: {
    type: [Mongoose.Schema.Types.ObjectId],
    ref: "CartItem"
  },
  role: {
    type: String,
    enum: ["ROLE_MEMBER", "ROLE_ADMIN"],
    default: "ROLE_MEMBER"
  }
});

module.exports = Mongoose.model("User", UserSchema);
