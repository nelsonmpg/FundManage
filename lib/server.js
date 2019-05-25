'use strict'
require('colors'); //bold, italic, underline, inverse, yellow, cyan, white, magenta, green, red, grey, blue, rainbow
var express = require('express'),
  https = require('https'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cookie = require('cookie-parser'),
  fs = require('fs'),
  utils = require('./utils.js'),
  passport = require('./passport/passport.js'),
  routes = require('./routes/routes.js'),
  connectDB = require('./db/connectDB.js'),
  populateDB = require('./populateDB.js'),
  fundsLib = require('./libFunds.js');

/**
 * TODO: Criação do servidor
 * @param {object} config - Variavel que contem as configurações básicas para o inicio do servidor.
 */
var Server = function (config) {
  let self = this,
    sslPath = './config/ssl-' + utils.getMode(),
    ssloptions = {
      key: fs.readFileSync(sslPath + '/server-key.pem'),
      cert: fs.readFileSync(sslPath + '/server-crt.pem'),
      ca: fs.readFileSync(sslPath + '/ca-crt.pem')
    };
  this.port = config.port;
  this.env_dev = config.env_dev;
  this.mongodb = config.mongodb;
  this.app = express();
  this.server = https.Server(ssloptions, this.app);
  connectDB.connectDB(this.mongodb, function () {
    populateDB.insertSeeds();
    self.start();
  });
};
/**
 * TODO: Metodo para iniciar o servidor
 */
Server.prototype.start = function () {
  this.server.listen(this.port);

  /**
   * TODO: Definição dos parametros do body-parser do express
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date');
    next();
  };

  // Configura o servidor
  this.app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
  }));
  this.app.use(bodyParser.json({
    limit: '10mb'
  }));
  this.app.use(allowCrossDomain);

  // Fornece a pagina default ao cliente neste caso o 'index.html'
  this.app.use(express.static(__dirname + './../public/dist'));

  this.app.use(cookie());
  this.app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 6000000
    }
  }));
  passport(this.app);

  // call the routes
  this.app.use(routes);

  // call middleware after all routes
  this.app.use(function (req, res) {
    res.send({
      status: false,
      data: "Oops Nothing found"
    });
  });

  // error handler middleware
  this.app.use(function (err, req, res, next) {
    res.send({
      status: false,
      data: "Error Occured : " + err
    });
  });

  console.log('Server HTTPS Wait %d'.green, this.port);
}

/**
 * TODO: recebe por parametro no proceso as definições configuradas para o funcionamento do servidor
 */
process.on("message", function (data) {
  var srv = new Server(data.serverdata);
});

module.exports = Server;