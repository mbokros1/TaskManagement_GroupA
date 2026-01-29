export const getRoles = (user) =>
  Array.isArray(user?.roles) ? user.roles : [];

export const hasRole = (user, role) => getRoles(user).includes(role);

export const hasAnyRole = (user, roles) =>
  Array.isArray(roles) && roles.some((r) => hasRole(user, r));

export const hasAllRoles = (user, roles) =>
  Array.isArray(roles) && roles.every((r) => hasRole(user, r));
