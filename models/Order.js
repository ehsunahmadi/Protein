const Mongoose = require("mongoose");

const OrderSchema = new Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    stage: {
      type: String,
      enum: ["waiting", "paid", "shipping", "final"],
      default: "waiting"
    },
    orderedItems: [
      {
        item: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: "Item"
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model("Order", OrderSchema);
