import './App.css';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import useAuth from './auth/useAuth.js';
import { Routes, Route } from 'react-router-dom';
import TicketDetail from './pages/TicketDetail.jsx';

function App() {
  const { user, isAuthenticated, login, logout, isLoading, roles } = useAuth();

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

          <Routes>
            <Route path="/tickets/:id" element={<TicketDetail />} />
          </Routes>
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
    </div>
  );
}

export default App;
