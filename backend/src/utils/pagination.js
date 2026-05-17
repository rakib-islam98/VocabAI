export const getPagination = (query) => {
  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

  // Prevent invalid page values
  if (page < 1) {
    page = 1;
  }

  // Prevent invalid limit values
  if (limit < 1) {
    limit = 10;
  }

  // Hard maximum limit
  if (limit > 100) {
    limit = 100;
  }

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};