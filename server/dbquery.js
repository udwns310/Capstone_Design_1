const db = require("../lib/db");

exports.register = function (req, res) {
    const post = req.body;
    db.query(`SELECT * FROM profile where email = ? OR stdId = ?`,
        [post.email, post.stdId], function(err, rows) {
            if(err) throw err;
            if(rows.length == 0) {
                db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?)`,
                    [post.email, post.password, post.name, post.gender, post.phoneNum, post.stdId],
                    function (error, result) {
                        if (error)
                            throw error;
                        console.log("good!");
                    }
                )
            }
            else {
                console.log('not good');
            }
        })
}

exports.login = function (req, res) {
    const post = req.body;
    db.query('SELECT * FROM profile where email = ? AND password = ?',
        [post.email, post.password],
        function(error, result){
            if(error) throw error;
            if(result.length > 0){
                console.log("nice");
            }
            else console.log('bad');
        }
    )
}


