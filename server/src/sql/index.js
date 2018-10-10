const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const SQL_CONSTANT = require("../utils/constant.js").SQL;

const ROOT_PATH = __dirname;
const DB_NAME = SQL_CONSTANT.name;

module.exports = class {
    constructor() {
        this.handler = null;
        this.init();
    }
    init() {
        // connect
        this.connect()
            .then(() => {
                // query
                let SQL = fs.readFileSync(path.resolve(ROOT_PATH, './init.sql'), 'UTF-8');
                // init database
                this.handler.query(SQL, function (err, res, fields) {
                    if (err) {
                        throw new Error(err.message);
                    } else {
                        console.log('init success');
                    }
                });
                // end
                this.end();
            });
    }
    connect() {
        return new Promise((resolve, reject) => {
            // connect
            let con = mysql.createConnection({
                host: SQL_CONSTANT.host,
                user: SQL_CONSTANT.user,
                password: SQL_CONSTANT.password,
                multipleStatements: true,
            });
            // connect
            con.connect((err) => {
                if (err) {
                    this.handler = null;
                    reject(err.message);
                } else {
                    this.handler = con;
                    resolve();
                    console.log("connection success");
                }
            });
        });
    }
    end() {
        // end
        if (!this.handler) return;
        this.handler.end((err) => {
            if (err) {
                throw new Error(err.message);
            }
            this.handler = null;
            console.log('Close the database connection.');
        });
    }
    use(dbname) {
        let SQL = `USE ${dbname}`;
        return new Promise((resolve, reject) => {
            this.connect()
                .then(() => {
                    this.handler.query(SQL, function (err, res, fields) {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(res);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    query(SQL) {
        return new Promise((resolve, reject) => {
            this.use(DB_NAME)
                .then(() => {
                    this.handler.query(SQL, (err, res, fields) => {
                        this.end();
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(res);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};