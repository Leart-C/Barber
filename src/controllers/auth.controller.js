const { login } = require("../services/auth.service");

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

module.exports = { loginController };
