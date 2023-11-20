const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

const db = require("../lib/db");
const bodyParser = require("body-parser");
<<<<<<< HEAD
=======

app.use("/api/info_check", function (req, res, next) {
  console.log(req); // 받아온 데이터를 콘솔창에 표시합니다. 이 내용은 npm run dev를 입력한 콘솔에 표시됩니다.
  res.json({ code: "200", message: "success!" }); // React에 응답으로서 데이터를 보냅니다. 데이터는 단순 응답 코드, json 등 다양한 형식을 사용할 수 있습니다.
});
>>>>>>> 0743dcfd6280f3bcab83cce56c95178432216bcf
