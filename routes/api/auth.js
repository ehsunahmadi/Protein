const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Ghasedak = require("ghasedak");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
// GET & PUT api/auth
// Test router
// Private
router.post(
  "/register",
  [
    check("name", "نام و نام خانوادگی الزامی است")
      .not()
      .isEmpty(),
    check("phone", "لطفا یک شماره واقعی وارد کنید").isMobilePhone(),
    check("password", "پسورد باید حداقل شامل شش کارکتر  باشد").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, password } = req.body;

    try {
      let user = await User.findOne({ phone });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "یک حساب کاربری دیگر با این شماره وجود دارد." }]
        });
      }
      // let ghasedak = new Ghasedak("");
      // ghasedak.send({
      //   message: "تست ارسال وب سرویس قاصدک",
      //   receptor: phone,
      //   lineNumber: "10008566"
      // });

      user = new User({
        name,
        phone,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("user registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
