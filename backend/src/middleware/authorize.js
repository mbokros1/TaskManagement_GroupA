/**
 * Return client roles attached to a user object.
 * @param {object} user - req.user (from verifyToken)
 * @returns {string[]} client role names
 */
export const getClientRoles = (user) =>
  Array.isArray(user?.roles) ? user.roles : [];

/**
 * Check if user has a specific client role.
 * @param {object} user - req.user
 * @param {string} role - role name
 * @returns {boolean}
 */
export const hasRole = (user, role) => getClientRoles(user).includes(role);

/**
 * Check if user has any of the listed roles.
 * @param {object} user - req.user
 * @param {string[]} roles - allowed role names
 * @returns {boolean}
 */
export const hasAnyRole = (user, roles) =>
  Array.isArray(roles) && roles.some((role) => hasRole(user, role));

/**
 * Check if user has all of the listed roles.
 * @param {object} user - req.user
 * @param {string[]} roles - required role names
 * @returns {boolean}
 */
export const hasAllRoles = (user, roles) =>
  Array.isArray(roles) && roles.every((role) => hasRole(user, role));

/**
 * Express middleware requiring a single role.
 * Sends 403 when role is missing.
 * @param {string} role
 */
export const requireRole = (role) => (req, res, next) => {
  if (!hasRole(req.user, role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

/**
 * Express middleware requiring any of the roles.
 * Sends 403 when none are present.
 * @param {string[]} roles
 */
export const requireAnyRole = (roles) => (req, res, next) => {
  if (!hasAnyRole(req.user, roles)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

/**
 * Express middleware requiring all of the roles.
 * Sends 403 when any are missing.
 * @param {string[]} roles
 */
export const requireAllRoles = (roles) => (req, res, next) => {
  if (!hasAllRoles(req.user, roles)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
