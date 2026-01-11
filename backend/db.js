import { Pool } from 'pg';

const pool = new Pool({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'database',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' Database connection error:', err.stack);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

export default pool;
