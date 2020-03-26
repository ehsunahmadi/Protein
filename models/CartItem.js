const Mongoose = require("mongoose");

const CartItemSchema = new Mongoose.Schema({
  item: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  quantity: Number,
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Mongoose.model("CartItem", CartItemSchema);
