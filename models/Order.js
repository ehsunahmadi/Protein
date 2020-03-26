const Mongoose = require("mongoose");

const OrderSchema = new Mongoose.Schema({
  stage: {
    type: String,
    enum: ["waiting", "paid", "shipping", "final"],
    default: "waiting"
  },
  items: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model("Order", OrderSchema);
