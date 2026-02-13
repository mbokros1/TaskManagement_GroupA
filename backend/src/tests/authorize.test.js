import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getRoles,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  requireRole,
  requireAnyRole,
  requireAllRoles,
} from '../middleware/authorize.js';

describe('authorize helpers', () => {
  let user;

  beforeEach(() => {
    user = { roles: ['admin', 'developer'] };
  });

  it('getRoles returns roles array or empty', () => {
    expect(getRoles(user)).toEqual(['admin', 'developer']);
    expect(getRoles({})).toEqual([]);
  });

  it('hasRole checks for a single role', () => {
    expect(hasRole(user, 'admin')).toBe(true);
    expect(hasRole(user, 'clinician')).toBe(false);
  });

  it('hasAnyRole checks OR logic', () => {
    expect(hasAnyRole(user, ['clinician', 'admin'])).toBe(true);
    expect(hasAnyRole(user, ['clinician'])).toBe(false);
  });

  it('hasAllRoles checks AND logic', () => {
    expect(hasAllRoles(user, ['admin', 'developer'])).toBe(true);
    expect(hasAllRoles(user, ['admin', 'clinician'])).toBe(false);
  });
});

describe('authorize middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { roles: ['admin', 'developer'] } };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it('requireRole allows when role present', () => {
    requireRole('admin')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('requireRole blocks when role missing', () => {
    requireRole('clinician')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('requireAnyRole allows when any role present', () => {
    requireAnyRole(['clinician', 'admin'])(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('requireAllRoles blocks when any role missing', () => {
    requireAllRoles(['admin', 'clinician'])(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
