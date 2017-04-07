var express = require('express');
var expressServer = express();

var config = require('./config');

var http = require('http');
var httpSERVER = http.createServer(expressServer);
var io = require('socket.io')(httpSERVER);

var bodyParser = require("body-parser");

var fs = require("fs");

var expressJwt = require('express-jwt');

var mongoose = require("mongoose");
//mongoose.connect("mongodb://iti:iti_os_37@ds155160.mlab.com:55160/iti_orders");
mongoose.connect("mongodb://localhost:27017/nodejs_project");

var authRouter = require("./controllers/auth");
var usersRouter = require("./controllers/users");
var followRouter = require("./controllers/follow");
var groupsRouter = require("./controllers/groups");
var uploadRouter = require("./controllers/upload");

fs.readdirSync(__dirname + "/models").forEach(function (file) {
    require("./models/" + file);
});

io.on("connection", function (socketClient) {
});

expressServer.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,content-type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

expressServer.use(express.static('public'));

// expressServer.use(expressJwt({secret: config.APP_SECRET}).unless({
//     path: [
//         '/auth/login',
//         '/auth/register',
//         '/upload/photo',
//         /\/follow\/\w*/ig
//     ]
// }));

expressServer.use(bodyParser.urlencoded({extended: false}));
expressServer.use(bodyParser.json());

expressServer.use("/auth", authRouter);
expressServer.use("/users", usersRouter);
expressServer.use("/follow", followRouter);
expressServer.use("/groups", groupsRouter);

expressServer.use("/upload", uploadRouter);

httpSERVER.listen(8090);
