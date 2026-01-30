/**
 * Extract role names from a user object.
 *
 * Assumes roles are already normalized and attached to `user.roles`
 * by the backend (/api/me).
 *
 * @param {object|null} user - User object returned from the backend
 * @returns {string[]} Array of role names
 */
export const getRoles = (user) =>
  Array.isArray(user?.roles) ? user.roles : [];

/**
 * Check whether a user has a specific role.
 *
 * @param {object|null} user - User object
 * @param {*} role - Role name to check
 * @returns {boolean} True if the user has the role
 */
export const hasRole = (user, role) => getRoles(user).includes(role);

/**
 * Check whether a user has at least one of the provided roles.
 *
 * @param {object|null} user - User object
 * @param {string[]} roles - List of acceptable role names
 * @returns {boolean} True if the user has any of the roles
 */
export const hasAnyRole = (user, roles) =>
  Array.isArray(roles) && roles.some((r) => hasRole(user, r));

/**
 * Check whether a user has all of the provided roles.
 *
 * @param {object|null} user - User object
 * @param {string[]} roles - List of required role names
 * @returns {boolean} True if the user has all roles
 */
export const hasAllRoles = (user, roles) =>
  Array.isArray(roles) && roles.every((r) => hasRole(user, r));
