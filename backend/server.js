import express from 'express';
import pool from './db.js';

const app = express();
const port = 5000;

console.log(pool);

app.get('/api/', (_req, res) => {
  res.send({ test: 'Hello World' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
