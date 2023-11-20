var mysql = require("mysql2");
var db = mysql.createConnection({
<<<<<<< Updated upstream
  host: "dev-ssu.com",
  port: "323",
  user: "dongcar",
  password: "qwer1234",
  database: "DongCar",
=======
    host : 'localhost',
    user : 'root',
    password : 'tmdwns0223!',
    database : 'DongCar'
>>>>>>> Stashed changes
});
db.connect();
module.exports = db;
