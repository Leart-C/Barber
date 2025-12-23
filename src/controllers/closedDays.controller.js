const { isDayClosed, closeDay } = require("../services/closedDays.service");

async function markDayAsClosed(req, res) {
  try {
    const { date, reason } = req.body;

    if (!date) {
      return res.status(400).json({
        error: "Date is required",
        example: { date: "2024-03-15", reason: "Maintenance" },
      });
    }

    const alreadyClosed = await isDayClosed(date);

    if (alreadyClosed) {
      return res.status(200).json({
        message: "Day is already marked as closed",
        date,
      });
    }

    await closeDay(date, reason);

    res.status(201).json({
      success: true,
      message: "Day closed successfully",
      date,
      reason: reason || "No reason provided",
    });
  } catch (error) {
    console.error("Error closing day:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function checkIfClosed(req, res) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        error: "Date is required",
        example: "/api/closed-days/check?date=2024-12-25",
      });
    }

    const isClosed = await isDayClosed(date);

    res.json({
      date,
      closed: isClosed,
      message: isClosed
        ? "Berberi është i mbyllur këtë ditë"
        : "Berberi është i hapur këtë ditë",
    });
  } catch (error) {
    console.error("Error checking closed day:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
module.exports = {
  markDayAsClosed,
  checkIfClosed,
};
