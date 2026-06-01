import crypto from "crypto";

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 15
  ); // 15 minutes

  return {
    resetToken,
    hashedToken,
    expiresAt,
  };
};