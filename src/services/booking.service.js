const pool = require("../db");

async function getBookingsByClientName(clientName) {
  const result = await pool.query(
    `
    SELECT id,date,slot_time,client_name,created_at FROM appointments WHERE LOWER(client_name)=LOWER($1) ORDER BY date DESC, slot_time ASC 
    `,
    [clientName]
  );
  return result.rows;
}

module.exports = {
  getBookingsByClientName,
};
