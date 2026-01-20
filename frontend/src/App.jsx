import './App.css';
import { Button } from '@mui/material';

function App() {
  fetch('/api')
    .then((res) => res.json())
    .then((res) => console.log(res));

  return (
    <div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;
