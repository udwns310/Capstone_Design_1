const express = require("express");
const app = express();
const port = 3002; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const dbquery = require("./dbquery.js");
const session = require('express-session');

const mySqlStore = require('express-mysql-session')(session);
var options = {
  host: "dev-ssu.com",
  port: "323",
  user: "dongcar",
  password: "qwer1234",
  database: "DongCar",
}
var sessionStore = new mySqlStore(options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: sessionStore
}))


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  dbquery.register(req, res);
});

app.post("/login", (req, res) => {
  dbquery.login(req, res, (result) => {
    console.log(result.status)
    if (result.status === "success") {
      console.log('adfs');
      req.session.user = { email: req.body.email };
      console.log(result);
      req.session.save(() => {
        console.log("테스트 세션 저장 완료");
      });
    }
    res.json(result);
  });
});

app.post("/setNick", (req, res) => {
  dbquery.nickname(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
