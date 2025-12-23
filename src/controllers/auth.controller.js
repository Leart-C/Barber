const { login } = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const {
  validateRefreshToken,
  revokeRefreshToken,
  saveRefreshToken,
} = require("../services/refreshToken.service");
const { generateAccesToken, generateRefreshToken } = require("../utils/token");

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing credentials",
    });
  }

  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  const payload = await validateRefreshToken(refreshToken);
  if (!payload) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  await revokeRefreshToken(refreshToken);

  const newAccessToken = generateAccesToken({
    userId: payload.userId,
  });

  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
  });

  const decoded = jwt.decode(newRefreshToken);

  await saveRefreshToken(
    payload.userId,
    newRefreshToken,
    new Date(decoded.exp * 1000)
  );

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

module.exports = { loginController };
