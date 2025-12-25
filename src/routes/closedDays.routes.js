const express = require("express");
const router = express.Router();
const {
  closeDayController,
  checkIfClosed,
} = require("../controllers/closedDays.controller");
const requireAuth = require("../middlewares/requireAuth");
const requireBarber = require("../middlewares/requireBarber");

router.post("/", requireAuth, requireBarber, closeDayController);
router.get("/check", checkIfClosed);

module.exports = router;
