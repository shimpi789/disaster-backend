// db/db.js
// db/db.js
import pg from 'pg'; // Import the default export
const { Pool } = pg; // Destructure Pool from the default export

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
pool.query('SELECT NOW()')
  .then(res => console.log('Database connected at:', res.rows[0].now))
  .catch(err => console.error('Database connection failed:', err));
export default pool;
