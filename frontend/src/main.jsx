import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootLayout from './layouts/RootLayout.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import Board from './pages/Board.jsx';
import './index.css';
import App from './App.jsx';
import keycloak from './keycloak.js';
import './api/axios.js';
import AuthProvider from './auth/AuthProvider.jsx';

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
    checkLoginIframe: true,
    checkLoginIframeInterval: 30,
  })
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<App />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="board" element={<Board />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error('Keycloak init failed: ', err);
  });
