import asyncHandler from "../../utils/asyncHandler.js";

import { getInsightsService } from "./insights.service.js";

export const getInsightsOverview = asyncHandler(async (req, res) => {
  const data = await getInsightsService(req.user.id);

  res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    data,
  });
});