const Mongoose = require("mongoose");

const ProfileSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: {
    type: String,
    required: true
  },
  ordersList: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

module.exports = Mongoose.model("Profile", ProfileSchema);
