const getHealthStatus = () => {     //anonymous func
  return {
    success: true,
    message: "API Healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  };
};

export {
  getHealthStatus,
};