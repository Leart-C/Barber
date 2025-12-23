const express = require("express");
const { closeDay } = require("../services/closedDays.service");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const requireBarber = require("../middlewares/requireBarber");

router.post("/close-day", requireAuth, requireBarber, closeDay);
