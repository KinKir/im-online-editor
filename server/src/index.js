const express = require("express");
const path = require("path");
const router = require("./api/index.js");
const config = require("../../web.config.json");
const app = express();

const PORT = config.server.port;
const ROOT_PATH = __dirname;
const CLIENT_PATH = path.resolve(ROOT_PATH, '../../');

// Route index
// app.get("/", function (req, res) {
//     res.sendFile(path.resolve(CLIENT_PATH, './public/index.html'));
// });

// CORS
// app.use(function (req, res) {
//     res.set({
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
//         'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
//     });
// });
// Api
app.use("/api", router);

// 404
app.use("*",function (req,res) {
    console.log(req.path);
    res.status(404).end();
})

app.listen(PORT);
console.log(`http://localhost:${PORT}`);