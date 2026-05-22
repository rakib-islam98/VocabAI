export const getErrorMessage = (
  error
) => {
  if (!error.response) {
    return "Server unavailable";
  }

  return (
    error.response?.data?.message ||
    "Something went wrong"
  );
};