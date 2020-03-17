const express = require("express");
const router = express.Router();

// GET & PUT api/list & /add
// Test router
// Public

router.get("/", (req, res) => res.send("category Route"));

module.exports = router;
