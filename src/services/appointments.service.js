const pool = require("../db");
const { isDayClosed } = require("./closedDays.service");

async function createAppointment({ date, slot, clientName, userId }) {
  const closed = await isDayClosed(date);

  if (closed) {
    throw new Error("DAY_CLOSED");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
        INSERT INTO appointments (date,slot_time,client_name,userId,status)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,date,slot_time,client_name,userId,status,created_at
        `,
      [date, slot, clientName, userId, "pending"]
    );

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") {
      throw new Error("SLOT_TAKEN");
    }

    throw error;
  } finally {
    client.release();
  }
}

module.exports = { createAppointment };
