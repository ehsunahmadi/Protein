const express = require("express");
const router = express.Router();

// POST & PUT api/:userId & users
// Test router
// Private

router.get("/", (req, res) => res.send("auth Route"));

module.exports = router;
