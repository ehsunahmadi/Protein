const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Item = require("../../models/Item");

const router = express.Router();

// GET & PUT api/list & /add
// Test router
// Public

router.post(
  "/",
  [
    check("name", "نام محصول الزامی است.")
      .not()
      .isEmpty(),
    check("price", "قیمت الزامی است.")
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, slug, image, description, quantity, price } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (user.role === "ROLE_ADMIN") {
        let item = await Item.findOne({ name });
        item
          ? (item = await Item.findOneAndUpdate(
              { id: req.params.id },
              req.body
            ))
          : (item = new Item({
              name,
              slug,
              image,
              description,
              quantity,
              price
            }));
        await item.save();

        res.send("محصول اضافه شد");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
