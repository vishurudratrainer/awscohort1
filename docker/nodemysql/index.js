const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Database connection configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'test_db'
};

async function initDB() {
  let connection;
  // Simple retry logic because MySQL takes a few seconds to initialize on first boot
  for (let i = 0; i < 10; i++) {
    try {
      connection = await mysql.createConnection(dbConfig);
      console.log('Successfully connected to MySQL database!');
      
      // Create a dummy table for demonstration
      await connection.query(`
        CREATE TABLE IF NOT EXISTS visits (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      return connection;
    } catch (err) {
      console.log(`Database connection failed (attempt ${i + 1}/10). Retrying in 3 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  console.error('Could not connect to database. Exiting.');
  process.exit(1);
}

// Start app after database is ready
initDB().then((connection) => {
  
  app.get('/', async (req, res) => {
    try {
      // Log a new visit to the database
      await connection.query('INSERT INTO visits () VALUES ()');
      
      // Get total visit count
      const [rows] = await connection.query('SELECT COUNT(*) as count FROM visits');
      
      res.json({
        message: "Hello from Node.js & MySQL in Docker!",
        total_visits: rows[0].count
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Node app listening on port ${port}`);
  });
});