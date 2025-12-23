const pool = require("../db");
const jwt = require("jsonwebtoken");

async function saveRefreshToken(userId, token, expiresAt) {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id,token,expires_at) VALUES ($1,$2,$3)`,
    [userId, token, expiresAt]
  );
}

async function validateRefreshToken(token) {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [token]
  );

  if (result.rows.length === 0) return null;

  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
}

async function revokeRefreshToken(token) {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
}

module.exports = {
  saveRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
};
