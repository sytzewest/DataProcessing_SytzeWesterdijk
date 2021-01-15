var mysql = require('mysql');

// connection configurations for the database
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api',
    port: 8889
});

// Connect to the database described above
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = dbConn;