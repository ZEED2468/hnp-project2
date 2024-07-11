const express = require("express");
const router = express.Router();
const {
  getUserDetails,
} = require("../controller/userController");
const { authenticate } = require("../Middleware/auth");

router.get("/users/:id", authenticate, getUserDetails);

module.exports = router;


