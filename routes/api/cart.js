const express = require("express");
const router = express.Router();

// GET & PUT api/list & /add
// Test router
// Private

router.get("/", (req, res) => res.send("cart Route"));

module.exports = router;
