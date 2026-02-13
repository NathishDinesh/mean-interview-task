const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Natty@2031',
  database: 'interviewdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;
