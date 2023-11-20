var mysql = require('mysql2');
var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'tmdwns0223!',
    database : 'DongCar'
});
db.connect();
module.exports = db;
