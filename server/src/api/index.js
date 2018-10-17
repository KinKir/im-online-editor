const express = require("express");
const YSql = require("../sql/index.js");
const SQL_CONSTANT = require("../utils/constant.js").SQL;
const router = express.Router();

// init sql
let sql = new YSql();
const TABLE_NAME = SQL_CONSTANT.tables[0].name;

router.post("/register", function (req, res) {
    let d = '';
    req.on('data', function (chunk) {
        d += chunk;
    });
    req.on('end', function () {
        let body = JSON.parse(d);
        // query sql
        sql.query(`SELECT * FROM ${TABLE_NAME} WHERE binary user_name='${body.name}'`)
            .then(data => {
                if (data.length !== 0) return Promise.reject('用户名已存在');
                return sql.query(`INSERT INTO ${TABLE_NAME}(user_name,user_pw) VALUES('${body.name}','${body.password}')`)
            })
            .then(data => {
                if (data.length === 0) return Promise.reject('插入失败');
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: err,
                });
            });
    });
});
router.post("/login", function (req, res, ) {
    let d = '';
    req.on('data', function (chunk) {
        d += chunk;
    });
    req.on('end', function () {
        let body = JSON.parse(d);
        // query sql
        sql.query(`SELECT * FROM ${TABLE_NAME} WHERE binary user_name='${body.name}'`)
            .then(data => {
                if (data.length === 0) return Promise.reject('用户名不存在');
                return sql.query(`SELECT * FROM ${TABLE_NAME} WHERE user_pw='${body.password}'`)
            })
            .then(data => {
                if (data.length === 0) return Promise.reject('密码错误');
                // set cookie
                res.cookie('token', Date.now(), {
                    domain: req.hostname,
                    path: '/',
                    expires: new Date(Date.now() + 86400e3),
                    httpOnly: true,
                });
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: err,
                });
            });
    });
});
router.post("/update", function (req, res) {
    let d = '';
    req.on('data', function (chunk) {
        d += chunk;
    });
    req.on('end', function () {
        let body = JSON.parse(d);
        // query sql
        sql.query(`SELECT * FROM ${TABLE_NAME} WHERE binary user_name='${body.name}'`)
            .then(data => {
                if (data.length === 0) return Promise.reject('用户名不存在');
                let old = data[0];
                if (old.user_pw === body.password + "") return Promise.reject('请使用新密码修改');
                // TODO
                return sql.query(`UPDATE ${TABLE_NAME} SET user_pw='${body.password}' WHERE id=${old.id}`);
            })
            .then(data => {
                if (data.length === 0) return Promise.reject('修改失败');
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    message: err,
                });
            });
    });
});
router.get("/userlist", function (req, res) {
    let q = req.query;
    if (q.name === undefined) return res.json({
        success: false,
        message: '缺少参数 "name"'
    });
    let name = q.name.trim();
    sql.query(`SELECT user_name,id FROM ${TABLE_NAME} WHERE binary user_name LIKE '%${name}%'`)
        .then(data => {
            res.json({
                success: true,
                data: data.map(item => {
                    item.name = item.user_name;
                    delete item.user_name;
                    return item;
                }),
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: err,
            });
        });
});

module.exports = router;


