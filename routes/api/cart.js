const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const CartItem = require("../../models/CartItem");
const User = require("../../models/User");
const Item = require("../../models/Item");

router.post("/", auth, async (req, res) => {
  // const { user, item, quantity } = req.body;
  try {
    // const user = await User.findById(req.user.id).select("-password");
    const item = await Item.findById(req.body.item);
    const newCartItem = new CartItem({
      item,
      quantity: req.body.quantity
    });
    const cartItem = await newCartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
