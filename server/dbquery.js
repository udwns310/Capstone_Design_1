const db = require("../lib/db");

exports.register = function(req, res) {
    const post = req.body.data;
    db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?)`,
            [post[0], post[1], post[2], post[3], post[4], post[5]],
            function(error, result) {
                if(error)
                    throw error;
                console.log("good!");
            }
    )
}


