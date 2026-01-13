import express from 'express';

// eslint-disable-next-line no-unused-vars
import sequelize from './db.js';

const app = express();
const port = 5000;

app.get('/api/', (_req, res) => {
  res.send({ test: 'Hello World' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
