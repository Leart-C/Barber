const express = require("express");
const router = express.Router();
const { getMyBookings } = require("../controllers/booking.controller");

router.get("/my", getMyBookings);

module.exports = router;
