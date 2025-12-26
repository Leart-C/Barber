const pool = require("../db");

async function getBookingsByUserId(userId) {
  const result = await pool.query(
    `SELECT 
      id, 
      date, 
      slot_time, 
      client_name, 
      status,
      created_at
    FROM appointments 
    WHERE user_id = $1 
    ORDER BY date DESC, slot_time ASC`,
    [userId]
  );

  return result.rows;
}

async function getBookingsByClientName(clientName) {
  const result = await pool.query(
    `SELECT 
      id, 
      date, 
      slot_time, 
      client_name, 
      status,
      created_at
    FROM appointments 
    WHERE client_name = $1 
    ORDER BY date DESC, slot_time ASC`,
    [clientName]
  );

  return result.rows;
}

module.exports = {
  getBookingsByClientName,
  getBookingsByUserId,
};
