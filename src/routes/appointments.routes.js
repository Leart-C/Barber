const express = require("express");
const router = express.Router();
const {
  availableSlots,
  bookAppointment,
} = require("../controllers/appointments.controller");

router.get("/available", availableSlots);

router.post("/book", bookAppointment);

module.exports = router;
