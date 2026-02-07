import './App.css';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import useAuth from './auth/useAuth.js';
import BoardPage from './pages/BoardPage.jsx';

function App() {
  const { user, isAuthenticated, login, logout, isLoading, roles } = useAuth();

  //Shows a spinner while AuthProvider is fetching the user profile
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <Box>
          <Typography variant="body1">
            Welcome, <strong>{user?.name || 'User'}</strong>!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Roles: {roles.length > 0 ? roles.join(', ') : 'No roles assigned'}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" gutterBottom>
            Please log in to continue.
          </Typography>
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </Box>
      )}
      <BoardPage />
    </div>
  );
}

export default App;
