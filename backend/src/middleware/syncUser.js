import { User } from '../models/models.js';

/**
 * Extract a reasonable user profile from req.user (Keycloak token claims)
 *
 * @param {*} tokenUser
 * @returns sub, firstName, lastName, email, roles
 */
function normalizeTokenUser(tokenUser) {
  const sub = tokenUser?.sub;

  const firstName = tokenUser?.name?.split?.(' ')?.[0] || 'Unknown';
  const lastName =
    tokenUser?.name?.split?.(' ')?.slice?.(1)?.join?.(' ') || 'User';

  const email = tokenUser?.email || null;
  const roles = tokenUser?.realm_access.roles || [];

  return { sub, firstName, lastName, email, roles };
}

/**
 * Choose a single role.
 *
 * @param {*} roles
 * @returns
 */
function pickPrimaryRole(roles = []) {
  const priority = ['admin', 'developer', 'clinician'];
  for (const r of priority) {
    if (roles.includes(r)) return r;
  }
  return 'developer'; // default fallback
}

/**
 * Determine timezone.
 *
 * @param {*} req
 * @param {*} existingTz
 * @returns
 */
function resolveTimezone(req, existingTz) {
  const headerTz = req.header('X-User-Timezone');
  return headerTz || existingTz || 'UTC';
}

/**
 * Middleware: upsert current user into DB on any authenticated request.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function syncUser(req, res, next) {
  try {
    if (!req.user?.sub) return next();
    // Checks if we've already synced this specific token session
    const tokenIssuedAt = req.user.iat;
    const existing = await User.findByPk(req.user.sub);
    const lastSyncedTs = existing?.lastSyncedAt
      ? Math.floor(existing.lastSyncedAt.getTime() / 1000)
      : 0;

    if (existing && tokenIssuedAt <= lastSyncedTs) {
      req.dbUser = existing.toJSON();
      return next();
    }

    // Performs Sync (only if data is stale or missing)
    const { sub, firstName, lastName, email, roles } = normalizeTokenUser(
      req.user
    );
    const role = pickPrimaryRole(roles);
    const timezone = resolveTimezone(req, existing?.timezone);

    const payload = {
      id: sub,
      firstName,
      lastName,
      email,
      role,
      timezone,
      lastSyncedAt: new Date(),
    };

    await User.upsert(payload);
    req.dbUser = payload;
    next();
  } catch (err) {
    console.error('syncUser failed:', err);
    next();
  }
}
