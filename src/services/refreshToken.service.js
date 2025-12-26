const { generateRefreshToken } = require("../utils/token");

async function refresh(token) {
  const payload = await validateRefreshToken(token);
  if (!payload) throw new Error("INVALID_REFRESH_TOKEN");

  await revokeRefreshToken(token);

  const newAccessToken = generateAccessToken({ userId: payload.userId });
  const newRefreshToken = generateRefreshToken({ userId: payload.userId });

  await saveRefreshToken(
    payload.userId,
    newRefreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = {
  refresh,
};
