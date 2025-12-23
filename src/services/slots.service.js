const generateSlots = require("../utils/slotGenerator");
const { isDayClosed } = require("./closedDays.service");
const pool = require("../db");

async function getAvailableSlots(date) {
  const allSlots = generateSlots(9, 17, 30);
  const closed = await isDayClosed(date);

  if (closed) {
    return {
      closed: true,
      message: "Berberi nuk punon sot",
      slots: [],
    };
  }

  const result = await pool.query(
    "SELECT slot_time FROM appointments WHERE date = $1",
    [date]
  );

  const bookedSlots = result.rows.map((r) => r.time.slice(0, 5));

  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return {
    closed: false,
    slots: availableSlots,
  };
}

module.exports = { getAvailableSlots };
