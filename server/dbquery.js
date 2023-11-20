const db = require("../lib/db");

exports.register = function (req, res) {
    const post = req.body;
    db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?)`,
        [post.email, post.password, post.name, post.gender, post.phoneNum, post.stdId],
        function (error, result) {
            if (error)
                throw error;
            console.log("good!");
        }
    )
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


