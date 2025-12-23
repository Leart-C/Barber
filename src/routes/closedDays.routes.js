const express = require("express");
const router = express.Router();
const {
  markDayAsClosed,
  checkIfClosed,
} = require("../controllers/closedDays.controller");

router.post("/", markDayAsClosed);

router.get("/check", checkIfClosed);

module.exports = router;
