const db = require("../lib/db");

exports.login = function (req, res) {
  const post = req.body;
  db.query('SELECT * FROM profile where email = ? AND password = ?',
    [post.email, post.password],
    function (error, result) {
      if (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      if (result.length > 0) {
        res.json({ status: 'success', message: 'Login successful' });
      } else {
        res.json({ status: 'error', message: 'Login failed' });
      }
    }
  )
}

exports.register = function (req, res) {
  const post = req.body;
  const hasEmptyValue = Object.values(post).some(value => value.trim() === '');
  if (hasEmptyValue) {
    res.json({ status: 'error', message: 'Register failed' })
  }
  else {
    db.query(`SELECT * FROM profile where email = ?`, // email이 중복되는지 검사
      [post.email], function (Eerr, Erows) {
        if (Eerr) throw Eerr;
        if (Erows.length == 0) { // email이 중복되지 않는다면
          db.query(`SELECT * FROM profile where stdId = ?`, // stdId가 중복되는지 검사
            [post.stdId], function (Serr, Srows) {
              if (Serr) throw Serr;
              if (Srows.length == 0) { // stdId가 중복되지 않는다면
                db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?, NULL)`, // DB에 데이터 삽입
                  [post.email, post.password, post.name, post.gender, post.phoneNum, post.stdId],
                  function (error, result) {
                    if (error) {
                      res.status(500).json({ message: 'Internal Server Error' });
                      throw error;
                    }
                    res.json({ status: 'success', message: 'Register successful' }) // 회원가입 성공
                  }
                )
              }
              else {
                res.json({ status: 'stdIdDuplicate', message: 'Register failed' }) // 학번 중복
              }
            })
        }
        else {
          res.json({ status: 'emailDuplicate', message: 'Register failed' }) // 이메일 중복
        }
      })
  }
}

exports.nickname = function (req, res) {
  const post = req.body;
  const hasEmptyValue = Object.values(post).some(value => value.trim() === '');
  if (hasEmptyValue) {
    res.json({ status: 'error', message: 'Nickname failed' })
  }
  else {
    db.query(`SELECT * FROM profile where nickname = ?`,
      [post.nickame], function (err, rows) {
        if (err) throw err;
        if (rows.length == 0) {
          db.query(`UPDATE profile SET nickname = ?`,
            [post.nickName],
            function (error, result) {
              if (error) 
                throw error;
             
              console.log("Nick good!");
              res.json({ status: 'success', message: 'Nickname successful' })
            }
          )
        }
        else {
          res.json({ status: 'error', message: 'Duplicated Nickname' })
          console.log('Nick not good');
        }
      })
  }
}


