const Mongoose = require("mongoose");

const ItemSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = Mongoose.model("Item", ItemSchema);
