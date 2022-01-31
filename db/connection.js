const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
},
    console.log(`connected to the employees database.`)
);

db.connect(err => {
    if (err) throw err; 
});

module.exports = db;
