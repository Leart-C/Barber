const express = require("express");
const logger = require("./middlewares/logger");
const rateLimit = require("./middlewares/rateLimit");

const appointmentsRoutes = require("./routes/appointments.routes");
const closedDayRoutes = require("./routes/closedDays.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

//Routes

app.use(express.json());
app.use(logger);
app.use(rateLimit);

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/closed-days", closedDayRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
  });
});

module.exports = app;
