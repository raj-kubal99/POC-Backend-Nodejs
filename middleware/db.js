const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'raj_kubal',
    password: 'Test123456',
    database: 'rajkubal'
});

connection.connect(error => {
    if (error){
        console.error("Error Connecting to debugger: ", error);
        return;
    }
    console.log("Database Connected Successfully");
});

module.exports = connection;
