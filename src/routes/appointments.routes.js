const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/auth");
const {
  availableSlots,
  bookAppointment,
} = require("../controllers/appointments.controller");

router.get("/available", availableSlots);

router.post("/book", requireAuth, bookAppointment);

module.exports = router;
