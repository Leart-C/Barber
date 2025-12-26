const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/auth");
const { getMyBookings } = require("../controllers/booking.controller");

router.get("/my", requireAuth, getMyBookings);

module.exports = router;
