const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const dbquery = require('./dbquery.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/register', (req, res) => {
  dbquery.register(req, res);
});

app.post('/login', (req, res) => {
  dbquery.login(req, res);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});