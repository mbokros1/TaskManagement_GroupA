import { Box, Button } from '@mui/material';
import './App.css';

import { Link as RouterLink } from 'react-router';

function App() {
  return (
    <Box sx={{ margin: 'auto', display: 'flex' }}>
      <Button variant="outlined" component={RouterLink} to="/board">
        Board
      </Button>
    </Box>
  );
}

export default App;
