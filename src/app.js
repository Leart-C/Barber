const express = require("express");
const appointmentsRoutes = require("./routes/appointments.routes");
const logger = require("./middlewares/logger");
const rateLimit = require("./middlewares/rateLimit");
const generateSlots = require("./utils/slotGenerator");
const authRoutes = require("./routes/auth.routes");

const app = express();

//Routes
const appointmentRoutes = require("./routes/appointments.routes");
const closedDayRoutes = require("./routes/closedDays.routes");

app.use(express.json());
app.use("/appointments", appointmentsRoutes);
app.use(logger);
app.use(rateLimit);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/closed-days", closedDayRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
});

module.exports = app;
