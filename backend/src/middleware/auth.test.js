import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyToken } from './auth.js';

vi.mock('jose');
vi.mock('../config/keycloak.js');

describe('verifyToken Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  it('should return 401 if no authorization header is present', async () => {
    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        error: 'Missing or invalid authorization header',
      })
    );
  });
});
