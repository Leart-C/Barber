const { getBookingsByUserId } = require("../services/booking.service");

async function getMyBookings(req, res) {
  try {
    const userId = req.user.userId;

    const bookings = await getBookingsByUserId(userId);

    res.json({
      success: true,
      userId,
      count: bookings.length,
      bookings: bookings.map((booking) => ({
        id: booking.id,
        date: booking.date,
        time: booking.slot_time.slice(0, 5), // "09:00:00" → "09:00"
        clientName: booking.client_name,
        status: booking.status,
        createdAt: booking.created_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching my bookings:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Nuk arritëm të marrim rezervimet tuaja",
    });
  }
}

module.exports = {
  getMyBookings,
};
