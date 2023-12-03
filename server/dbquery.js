const db = require('../lib/db');
const util = require('util');
const crypto = require('crypto');

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 10496, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

const verifyPassword = async (password, userSalt, userPassword) => { // password 검증
    const key = await pbkdf2Promise(password, userSalt, 10496, 64, 'sha512');
    const hashedPassword = key.toString('base64');

    if (hashedPassword === userPassword) return true;
    return false;
};

exports.login = function (req, res, callback) {
    const post = req.body;
    db.query(`SELECT password, salt FROM profile WHERE email = ?`,
        [post.email],
        async function (error, result) {
            if (error) {
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
            if (result.length > 0) {
                const verified = await verifyPassword(post.password, result[0].salt, result[0].password); // password 검증
                if (verified) {
                    db.query(`SELECT nickname FROM profile WHERE email = ?`,
                    [post.email], function(err, isNull) {
                        if (err) {
                            res.status(500).json({ message: 'Internal Server Error' });
                            return;
                        }
                        if(isNull[0].nickname === null) { // nickname이 설정되지 않았다면
                            callback({ status: 'nickNull', message: 'Login successful' });
                        } else {
                            callback({ status: 'success', message: 'Login successful' });
                        }
                    })
                } else {
                    callback({ status: 'error', message: 'Login failed' });
                }
            } else {
                callback({ status: 'error', message: 'Login failed' });
            }
        }
    )
}

exports.register = function (req, res) {
    const post = req.body;
    const hasEmptyValue = Object.values(post).some(value => value.trim() === '');
    if (hasEmptyValue) {
        res.json({ status: 'error', message: 'Register failed' })
    } else {
        db.query(`SELECT * FROM profile WHERE email = ?`, // email이 중복되는지 검사
        [post.email], function (Eerr, Erows) {
            if (Eerr) throw Eerr;
            if (Erows.length == 0) { // email이 중복되지 않는다면
                db.query(`SELECT * FROM profile WHERE stdId = ?`, // stdId가 중복되는지 검사
                    [post.stdId], async function (Serr, Srows) {
                    if (Serr) throw Serr;
                    if (Srows.length == 0) { // stdId가 중복되지 않는다면
                        const { password, salt } = await createHashedPassword(post.password); // password 암호화
                        db.query(`INSERT INTO profile VALUES (?, ?, ?, ?, ?, ?, NULL, ?)`, // DB에 데이터 삽입
                        [post.email, password, post.name, post.gender, post.phoneNum, post.stdId, salt],
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
    const email = req.session.user.email;
    const post = req.body;
    const hasEmptyValue = Object.values(post).some((value) => value.trim() === '');
    if (hasEmptyValue) {
        res.json({ status: 'error', message: 'Nickname failed' });
    } else {
        db.query(`SELECT * FROM profile WHERE nickname = ?`, [post.nickname], function (err, rows) { // nickname이  중복되는지 검사
            if (err) throw err;
            if (rows.length == 0) {
                db.query(`UPDATE profile SET nickname = ? WHERE email = ?`, [post.nickname, email], function (error, result) {
                    if (error) throw error;

                    res.json({ status: 'success', message: 'Nickname successful' });
                });
            } else {
                res.json({ status: 'nickDuplicate', message: 'Duplicated Nickname' }); // nickname 중복
            }
        });
    }
};

exports.chatlist = function (req, res, callback) {
    db.query(`SELECT *, date_format(date, '%m/%d %H:%i') as formatDate FROM chatlist ORDER BY emergency DESC, date`, function(err, result) {
        callback({ data: result });
    })
}

exports.management = function (req, res, callback) {
    const email = req.session.user.email;
    db.query(`SELECT email, name, phoneNum, stdId, nickname FROM profile WHERE email = ?`, [email], function(err, result) {
        callback({ data: result });
    })
}