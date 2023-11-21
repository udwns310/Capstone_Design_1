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
    db.query(`SELECT * FROM profile where email = ? OR stdId = ?`,
      [post.email, post.stdId], function (err, rows) {
        if (err) throw err;
        if (rows.length == 0) {
          db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?, NULL)`,
            [post.email, post.password, post.name, post.gender, post.phoneNum, post.stdId],
            function (error, result) {
              if (error) {
                res.status(500).json({ message: 'Internal Server Error' });
                throw error;
              }
              console.log("good!");
              res.json({ status: 'success', message: 'Register successful' })
            }
          )
        }
        else {
          res.json({ status: 'duplicate', message: 'Register failed' })
          console.log('not good');
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
    db.query(`SELECT * FROM profile where nickName = ?`,
      [post.nickName], function (err, rows) {
        if (err) throw err;
        if (rows.length == 0) {
          db.query(`INSERT INTO profile (nickName) VALUES (?)`,
            [post.nickName],
            function (error, result) {
              if (error) {
                res.status(500).json({ message: 'Internal Server Error' });
                throw error;
              }
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


