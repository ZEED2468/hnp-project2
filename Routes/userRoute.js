const express = require("express");
const router = express.Router();
const { register, login, getUserDetails}= require("../controller/userController");
const { authenticate } = require("../Middleware/auth")

router.post("/register", register);
router.post("/login", login);
router.get("/users/:id", authenticate, getUserDetails);

module.exports = router;
