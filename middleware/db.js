const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'rajkubal'
});

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Database connection is successful');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with an error code
    }
}
testConnection();

module.exports = pool;
