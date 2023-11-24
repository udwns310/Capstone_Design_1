const express = require("express");
const app = express();
const port = 3002; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const dbquery = require("./dbquery.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  dbquery.register(req, res);
});

app.post("/login", (req, res) => {
  dbquery.login(req, res);
});

app.get('/logout', (req, res) => {
  if(req.session){
      req.session.destroy(()=>{
          console.log("삭제완료");
      });
  }
  else {
    console.log("제거할 세션 없음");
    res.send('제거할 세션이 없습니다.');
  }
})

app.get('/confirm', (req, res) => {
  if(req.session.user){
      console.log(req.session);
      res.send('세션 o');
  }
  else {
      console.log('no session');
      res.send('세션 x');
  }
})

app.post("/setNick", (req, res) => {
  console.log(req.body.nickname);
  dbquery.nickname(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
