var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "dev-ssu.com",
  port: "323",
  user: "dongcar",
  password: "qwer1234",
  database: "DongCar",
});
db.connect();
module.exports = db;
