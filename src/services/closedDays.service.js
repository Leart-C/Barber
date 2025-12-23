const pool = require("../db");

async function isDayClosed(date) {
  const result = await pool.query("SELECT 1 FROM closed_days WHERE date = $1", [
    date,
  ]);
  //nese gjendet 1 atehere eshte e mbyllur
  return result.rowCount > 0;
}

async function closeDay(date, reason) {
  await pool.query(
    `
        INSER INTO closed_days (date,reason)
        VALUES ($1,$2)
        ON CONFLICT (date) DO NOTHING
        `,
    [date, reason || null]
  );
}

module.exports = { isDayClosed, closeDay };
