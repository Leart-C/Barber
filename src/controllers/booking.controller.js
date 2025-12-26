const bookingService = require("../services/booking.service");

async function getMyBookings(req, res, next) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message: "Kerkohet emri i klientit",
      });
    }

    const bookings = await bookingService.getBookingsByClientName(name);

    return res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMyBookings,
};
