import { User } from '../models/models.js';

/**
 * Extract a reasonable user profile from req.user (Keycloak token claims)
 *
 * @param {*} tokenUser
 * @returns sub, firstName, lastName, email, roles
 */
function normalizeTokenUser(tokenUser) {
  const sub = tokenUser?.sub;
  const username = tokenUser?.preferred_username || 'User';
  const firstName = tokenUser?.name?.split?.(' ')?.[0] || username;
  const lastName = tokenUser?.name?.split?.(' ')?.slice?.(1)?.join?.(' ') || '';

  const email = tokenUser?.email || null;
  const roles = tokenUser?.roles || [];

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
    const existing = await User.findByPk(req.user.sub);
    // Only sync once every 5 minutes per user
    const SYNC_TTL_MS = 5 * 60 * 1000;
    const lastSyncedMs = existing?.lastSyncedAt
      ? existing.lastSyncedAt.getTime()
      : 0;
    if (existing && Date.now() - lastSyncedMs < SYNC_TTL_MS) {
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
    return next();
  } catch (err) {
    console.error('syncUser failed:', err);
    return next(err);
  }
}
