var express = require('express');
var expressServer = express();

var http = require('http');
var httpSERVER = http.createServer(expressServer);
var io = require('socket.io')(httpSERVER);

var bodyParser = require("body-parser");

var fs = require("fs");

var session = require("express-session");
var sessionMiddleware = session({
    secret: "#@$@#%$^&"
});

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodejs_project");

var authRouter = require("./controllers/auth");

fs.readdirSync(__dirname + "/models").forEach(function (file) {
    require("./models/" + file);
});

io.on("connection", function (socketClient) {
});

expressServer.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

expressServer.use(bodyParser.urlencoded({extended: false}));
expressServer.use(sessionMiddleware);

expressServer.use(express.static('public'));
expressServer.use("/auth", authRouter);

httpSERVER.listen(8090);