const authService = require("../services/auth.service");

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing credentials",
      });
    }

    const token = await authService.login(email, password);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}

async function refreshTokenController(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  const tokens = await authService.refresh(refreshToken);
  res.json(tokens);
}

module.exports = { loginController, refreshToken };
