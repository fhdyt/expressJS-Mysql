var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fikri",
    database: "WEDDING",
    //socketPath: "/opt/lampp/var/mysql/mysql.sock"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected...");
});
module.exports = db;
