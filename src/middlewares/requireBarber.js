function requireBarber(req, res, next) {
  if (req.user.role !== "BARBER") {
    return res
      .status(403)
      .json({ message: "Access denied. Barber role required." });
  }
  next();
}

module.exports = requireBarber;
