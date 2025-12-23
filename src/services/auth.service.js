const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(email, password) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rowCount === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIN: "1h" }
  );

  return token;
}

module.exports = { login };
