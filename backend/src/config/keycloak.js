import * as jose from 'jose';
let jwks;
export async function initKeycloak() {
  const jwksUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`;
  jwks = jose.createRemoteJWKSet(new URL(jwksUrl));
  console.log('Keycloak configuration initialized');
}

export function getJWKS() {
  if (!jwks) {
    throw new Error('Keycloak JWKS not initialized. Call initKeycloak() first');
  }
  return jwks;
}
