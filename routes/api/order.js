const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const Order = require("../../models/Order");
const User = require("../../models/User");
const Item = require("../../models/Item");

router.post("/", auth, async (req, res) => {
  try {
    const user = await (
      await User.findById(req.user.id).select("-password")
    ).populate("name phone");
    const itemsName = req.body.orderedItems.map(
      (eachItem) => eachItem.item.name
    );
    const items = await Item.find({ name: itemsName });

    await console.log(items);
    const newOrder = {
      orderedItems: [],
      user,
    };

    for (let i = 0; i < req.body.orderedItems.length; i++) {
      const orderedItem = req.body.orderedItems[i];
      console.log(orderedItem);
      newOrder.orderedItems.push({
        item: items.find((q) => q.name == orderedItem.item.name),
        quantity: orderedItem.quantity,
      });
    }

    const theOrder = new Order(newOrder);

    await theOrder.save();

    res.json(theOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
