import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import keycloak from './keycloak.js';
import './api/axios.js';

setInterval(() => {
  if (keycloak.authenticated) {
    keycloak.updateToken(30).catch(() => {
      keycloak.logout();
    });
  }
}, 10000);

keycloak
  .init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri:
      window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error('Keycloak init failed: ', err);
  });
