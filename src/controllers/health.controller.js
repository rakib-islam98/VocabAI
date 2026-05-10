import { getHealthStatus } from "../services/health.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthCheckController = asyncHandler(
  async (req, res) => {
    const data = getHealthStatus();   //function

    res.status(200).json(data);
  }
);

export {
  healthCheckController,
};