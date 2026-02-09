export function validateTicketListQuery(req, res, next) {
  const { status, priority, page, limit, sortBy, sortOrder } = req.query;

  const allowedStatuses = ['open', 'in_progress', 'closed'];
  const allowedPriorities = ['low', 'medium', 'high'];
  const allowedSortBy = ['createdAt', 'updatedAt', 'priority', 'status'];
  const allowedSortOrder = ['asc', 'desc'];

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status filter' });
  }

  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority filter' });
  }

  if (sortBy && !allowedSortBy.includes(sortBy)) {
    return res.status(400).json({ error: 'Invalid sortBy value' });
  }

  if (sortOrder && !allowedSortOrder.includes(sortOrder)) {
    return res.status(400).json({ error: 'Invalid sortOrder value' });
  }

  if (page && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
    return res.status(400).json({ error: 'Invalid page value' });
  }

  if (limit && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    return res.status(400).json({ error: 'Invalid limit value' });
  }

  next();
}
