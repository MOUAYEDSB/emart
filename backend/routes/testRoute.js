const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/testAuth", auth, (req, res) => {
  res.send({ message: "Authenticated successfully", user: req.user });
});

module.exports = router;
