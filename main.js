'use strict'
require('colors');
var cp = require('child_process'),
  fs = require('fs'),
  config = null,
  utils = require('./lib/utils.js'),
  mode = process.env.NODE_ENV || "DEV";

var Main = function () {
  config = utils.getConfigFile();

  var args = {
    port: config.serverHttp.port,
    mongodb: config.mongodb,
    env_dev: utils.isDevMode(),
  };
  // inicia p script e envia as configuracores
  var child2 = cp.fork('./lib/server.js');
  child2.send({ "serverdata": args });

};

new Main();

module.exports = Main;