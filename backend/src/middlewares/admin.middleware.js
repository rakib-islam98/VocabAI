import ApiError from "../utils/ApiError.js";

const adminMiddleware = (req, res, next) => {
  const adminSecret = req.headers["x-admin-secret"];

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    throw new ApiError(403, "Unauthorized admin access");
  }

  next();
};

export default adminMiddleware;
