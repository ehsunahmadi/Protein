const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
// GET & PUT api/list & /add
// Test router
// Public

router.get("/", auth, (req, res) => res.send("profile Route"));

module.exports = router;
