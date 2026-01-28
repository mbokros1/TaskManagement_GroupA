import * as jose from 'jose';
import { getJWKS } from '../config/keycloak.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwks = getJWKS();

    const { payload } = await jose.jwtVerify(token, jwks, {});

    if (payload.exp && payload.exp < Date.now() / 1000) {
      return res.status(401).json({ error: 'Token expired' });
    }

    const realmRoles = payload.realm_access?.roles || [];
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
    const clientRoles =
      clientId && payload.resource_access?.[clientId]?.roles
        ? payload.resource_access[clientId].roles
        : [];
    const roles = [...new Set([...realmRoles, ...clientRoles])];

    req.user = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      preferred_username: payload.preferred_username,
      roles,
    };
    next();
  } catch (err) {
    console.error('Token verification error: ', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
