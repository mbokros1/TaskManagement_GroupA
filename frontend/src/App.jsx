import './App.css';
import keycloak from './keycloak';
import { Button } from '@mui/material';
import api from './api/axios.js';

function App() {
  api.get('/me').then((res) => console.log(res.data));

  const login = () => keycloak.login();
  const logout = () =>
    keycloak.logout({ redirectUri: `${import.meta.env.VITE_FRONTEND_URL}` });
  return (
    <div>
      {!keycloak.authenticated ? (
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      )}
      <Button onClick={login} variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
