const express = require("express");
const router = express.Router();
const { loginController,refreshToken } = require("../controllers/auth.controller");


router.post("/login", loginController);
router.post("/refresh", refreshToken);

module.exports = router;
