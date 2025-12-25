const pool = require("../db");
const bcrypt = require("bcrypt");
const tokenUtils = require("../utils/token");
const refreshTokenService = require("./refreshToken.service");

async function login(email, password) {
  const result = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const accessToken = tokenUtils.generateAccessToken({
    userId: user.id,
    role: user.role,
  });

  const refreshToken = tokenUtils.generateRefreshToken({
    userId: user.id,
  });

  await refreshTokenService.saveRefreshToken(
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = { login };
