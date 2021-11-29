/**
 * Created with feederModuleGateway
 * Author: ChrisChiu
 * Date: 2021/8/24
 * Desc:
 */

const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(path.join(__dirname, "./httpsCert/server.key"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "./httpsCert/server.crt"), "utf8");
const credentials = {key: privateKey, cert: certificate};

const {port, timeout} = require("./config/config");

const https = require("https").Server(credentials, app);
https.timeout =timeout;

const bodyParser = require("body-parser");
const compression = require("compression");

// 压缩
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const routes = require("./router/index");
routes(app);

//创建https服务器
https.listen(port, function () {
    console.info(`Please open Internet explorer to access ：https://localhost:${port}/`);
});

process.on("unhandledRejection", function (err) {
    console.error("catch exception:", err.stack);
});

process.on("uncaughtException", function (err) {
    console.error("catch exception:", err.stack);
});
