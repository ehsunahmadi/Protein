const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Ghasedak = require("ghasedak");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

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
      let ghasedak = new Ghasedak(
        "654699d2085f5ecf920401d8a4bd8e3123f417aa778b20a00e226e3a7b6fac96"
      );
      ghasedak.send({
        message: "تست ارسال وب سرویس قاصدک",
        receptor: phone
      });

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

router.post(
  "/login",
  [
    check("phone", "لطفا یک شماره واقعی وارد کنید").isMobilePhone(),
    check("password", "لطفا رمز عبور خود را وارد کنید")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
      let user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "مشخصات ورود نادرست است." }]
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token,
              user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                role: user.role
              }
            });
          }
        );
      } else {
        return res.status(404).json({
          success: false,
          error: "مشخصات ورود نادرست است."
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
