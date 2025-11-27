export function getPaginationParams(req) {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 20;

  if (page < 1) page = 1;
  if (limit < 1) limit = 20;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationObject(page, limit, total) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
}
